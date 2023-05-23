import db from "../../db";

const commonModel = {
  getAccountByUsername: async (username: string) => {
    return await db.table('accounts').filter({ username })
  },
  getBarangayByMunicipality: async (municipality: string) => {
    return await db.table("barangay").filter({ municipality })
  }
}

export default commonModel