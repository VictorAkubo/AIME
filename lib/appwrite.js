import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
export const appwriteConfig = {
    endpoint: "https://cloud.apprwrite.io/v1",
    platform: 'com.watch.AIME',
    projectId: "67355163001181a158ae",
    databaseId: "6735e70e0030cfe3b435",
    userCollectionId: "6735e75800114d057b5b",
    videoCollectionId: "6735e841001cda396f87",
    storageId: "6735ecad001a36a6e4db"
}


const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,
} = appwriteConfig
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
// Register User
export const createUser = async (
    email,
    password,
    username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username)
            .then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error);
            });
        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username)
        await signIn(email, password)
        const newUser = await databases.createDocument(
            databaseId,
            userCollectionId,
            ID.unique(),
            {
                aaccountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )
    } catch (error) {
        console.log(error)
        throw new error
    }
}

export async function signIn(
    email,
    password,
) {
    try {
        const session = await account.createEmailPasswordSession({ email, password })
        return session;
    } catch (error) {
        console.log(error)
        throw new error
    }
}
export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if (!currentUser) throw Error;
        return currentUser.documents[0]
    } catch (error) {
        console.log(error);
    }
}
export async function getAllPost() {
    try {
        const post = await databases.listDocuments(
            databaseId,
            videoCollectionId,
        )
        return post.documents;
    } catch (error) {
        throw new error
        
    }
}
export async function getLatestPost() {
    try {
        const post = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        return post.documents;
    } catch (error) {
        throw new error
    }
}
export async function searchPost(query) {
    try {
        const post = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query)]
        )
        return post.documents;
    } catch (error) {
        throw new error
    }
}
