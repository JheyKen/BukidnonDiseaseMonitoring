import db from "../../db";

const accountModel = {
  getAllVerifiedAccounts: async () => {
    return await db.table("accounts").filter({status: "verified"});
  },
  getAllPendingAccounts: async () => {
    return await db.table("accounts").filter({status: "pending"});
  },
  getAccountByUsername: async (username: string) => {
    return await db.table('accounts').filter({username});
  },
  editAccount: async (username: string, editParam: object) => {
    return await db.table('accounts').filter({username}).update(editParam);
  }
}

export default accountModel