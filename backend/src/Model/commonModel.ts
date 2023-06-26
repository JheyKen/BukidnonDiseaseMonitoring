import db from "../../db";

const commonModel = {
  getAccountByUsername: async (username: string) => {
    return await db.table('accounts').filter({ username, status: 'verified' })
  },
  getBarangayByMunicipality: async (municipality: string) => {
    return await db.table("barangay").filter({ municipality }).orderBy('barangay');
  }
}

export default commonModel