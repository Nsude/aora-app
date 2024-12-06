import { ID } from 'appwrite';
import { Account, Avatars, Client, Databases, Query } from 'react-native-appwrite';
import apiConfig from '../api-data.json';

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
    throw error; // Retain original error stack trace
  }
};

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
    throw error;
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
    throw error;
  }
}

export const getTrendingVideos = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
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
    throw Error;
  }
}