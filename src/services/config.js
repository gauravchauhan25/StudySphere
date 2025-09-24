const config = {
  appwriteUrl: String(import.meta.env.VITE_REACT_APPWRITE_URL),
  appwriteProjectID: String(import.meta.env.VITE_REACT_APPWRITE_PROJECT_ID),
  appwriteDatabaseID: String(import.meta.env.VITE_REACT_APPWRITE_DATABASE_ID),
  appwriteUsersCollectionID: String(
    import.meta.env.VITE_REACT_APPWRITE_USERS_COLLECTION_ID
  ),
};

export default config;
