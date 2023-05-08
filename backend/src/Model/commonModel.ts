import db from "../../db";

const commonModel = {
  getAccountByUsername: async (username: string) => {
    return await db.table('accounts').filter({username})
  }
}

export default commonModel