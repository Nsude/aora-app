import { ID } from 'appwrite';
import { Account, Avatars, Client, Databases, Query } from 'react-native-appwrite';

// Configuration
export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: '67504c4c001ff5670af8',
  platform: 'com.malik.aora',
  usersCollectionId: '67504d280007fcb5e49e',
  videosCollectionId: '67504d8c0035afe96676',
  databaseId: '67504d18001742e16703',
  storageId: '67504f7a0024b9358c6f'
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