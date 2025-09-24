import { Client, Databases, Account, ID, Storage } from "appwrite";

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
    this.avatars = new Avatars(this.client);
    this.functions = new Functions(this.client);
  }

  async createAccount() {}
  async login() {}
  async logout() {}
  async createAccount() {}
}

const api = new Services();
export default api;
export const { account, database, storage } = api;
