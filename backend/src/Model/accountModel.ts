import db from "../../db";

const accountModel = {
  getAllVerifiedAccounts: async () => {
    return await db.table("accounts").filter({ status: "verified" });
  },
  getAllPendingAccounts: async () => {
    return await db.table("accounts").filter({ status: "pending" });
  },
  getAccountByUsername: async (username: string) => {
    return await db.table('accounts').filter({ username });
  },
  createAccount: async (account: object) => {
    return await db.table('accounts').insert(account);
  },
  editAccount: async (username: string, editParam: object) => {
    return await db.table('accounts').filter({ username }).update(editParam);
  },
  deleteAccount: async (username: string) => {
    return await db.table('accounts').filter({ username }).delete()
  }
}

export default accountModel