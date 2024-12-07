import { Account, Avatars, Client, Databases, Query, Storage, ID } from 'react-native-appwrite';
import apiConfig from '../api-data.json';
// remember to get dependencies from react-native appwrite

// Configuration
export const config = {
  endpoint: apiConfig.endpoint,
  projectId: apiConfig.projectId,
  platform: apiConfig.platform,
  usersCollectionId: apiConfig.usersCollectionId,
  videosCollectionId: apiConfig.videosCollectionId,
  databaseId: apiConfig.databaseId,
  storageId: apiConfig.storageId
};

// Initialize Appwrite Client
const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

// Initialize Services
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Create User
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password);

    // Generate avatar
    const avatar = avatars.getInitials(username);

    // Log in user after creation
    await login(email, password);

    // Create user document in the database
    const newUser = await databases.createDocument(
      config.databaseId,
      config.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        avatar,
        username,
        email
      }
    );

    return newUser;
  } catch (error) {
    console.error("Sign up error:", error.message);
    throw error; // Retain original error stack trace
  }
};

// Login User
export const login = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Login error:", error.message);
    throw new Error(error); // Retain original error stack trace
  }
};

export const signOut = async () => {
  try {
    const response = await account.deleteSession('current');
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser || currentUser.documents.length === 0) throw Error;

    return currentUser.documents[0];

  } catch (error) {
    throw new Error(error);
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId
    )

    if (!posts) return;
    return posts;
  } catch (error) {
    throw new Error(error);
  }
}

export const getTrendingVideos = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(6)]
    )

    if (!posts) return;
    return posts;
  } catch (error) {
    throw error;
  }
}

export const searchPosts = async (query) => {
  try {
    const matchedPosts = databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.search('title', query)]
    )
    
    return matchedPosts;
  } catch (error) {
    throw error;
  }
}

export const getUserVideos = async (id) => {
  try {
    const userVideos = databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.equal('creator', id)]
    )
    return userVideos;
  } catch (error) {
    throw error;
  }
}

// get file storage path/url
const getFile = (fileId, type) => {
  let fileUri;
  try {
    if (type === 'video') {
      fileUri = storage.getFileView(config.storageId, fileId);
    } else if (type === 'image') {
      fileUri = storage.getFilePreview(
        config.storageId, fileId, 2000, 2000, 'top', 100
      )
    } else {
      throw new Error("Invalid file type")
    }

    return fileUri;
  } catch (error) {
    throw new Error(error);
  }
}

// upload file
const uploadFile = async (file, type) => {
  if (!file) return;

  const asset = {
    name: file.fileName,
    type: file.type,
    size: file.fileSize,
    uri: file.uri
  }

  try {
    
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    )
    
    const fileStorageUrl = getFile(uploadedFile.$id, type);
    return fileStorageUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// create video
export const createVideo = async (form) => {
  try {
    const [thumbnailUri, videoUri] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video')
    ])

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videosCollectionId,
      ID.unique(), {
        title: form.title,
        video: videoUri,
        thumbnail: thumbnailUri,
        prompt: form.prompt,
        creator: form.userId
      }
    )

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}