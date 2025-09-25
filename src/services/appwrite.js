import { Client, Databases, Account, ID, Storage, Query } from "appwrite";
import config from "./config";

export class Services {
  client = new Client();
  account;
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectID);

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  //================CREATES A ACCOUNT FOR USER=================
  async createAccount({ email, password, name, phoneNumber }) {
    try {
      const newAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (!newAccount) {
        return null;
      }
      const userId = newAccount.$id;
      const newUser = await this.addUser(
        userId,
        name,
        email,
        phoneNumber
      );

      return newUser;
    } catch (error) {
      console.log("Account creation failed: ", error);
      return null;
    }
  }

  //===========ADD USER TO DB=============
  async addUser(userId, name, email, phoneNumber) {
    try {
      const response = await this.databases.createDocument(
        config.appwriteDatabaseID,
        config.appwriteUsersCollectionID,
        ID.unique(),
        {
          name,
          email,
          phoneNumber,
          userId: userId,
        }
      );

      console.log("Added to DB successfully!");
      return response;
    } catch (error) {
      console.error("Error :: adding user: !", error);
      return null;
    }
  }

  //==================LOGIN FOR USER=====================
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Error :: Logging In", error);
    }
  }

  //=============FOR GOOGLE OAUTH LOGIN====================
  async loginWithGoogle() {
    try {
      this.account.createOAuth2Session(
        "google",
        "https://m723x5-5173.csb.app/",
        "https://m723x5-5173.csb.app/sign-in"
      );
    } catch (error) {
      console.error("Error :: Google Login:", error);
    }
  }

  //=========LOGIN WITH GITHUB=============
  async loginWithGithub() {
    try {
      this.account.createOAuth2Session("github", 'https://m723x5-5173.csb.app/', 'https://m723x5-5173.csb.app/sign-in')
    } catch (error) {
      console.log("Error logging in github: ", error);
      
    }
  }


  //===========LOGOUTS THE USER===============
  async logout() {
    try {
      return await this.account.deleteSessions("current");
    } catch (error) {
      console.log("Error :: logout", error);
    }
  }

  //=======GETS THE CURRENT ACCOUNT SESSION IF PRESENT==========
  async getAccount() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Error fetching account:", error);
      return null;
    }
    return null;
  }
}

const api = new Services();
export default api;
export const { account, database, storage } = api;
