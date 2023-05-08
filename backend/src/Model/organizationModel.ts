import db from "../../db";

const organizationModel = {
  getAllOrganizations: async () => {
    return await db.table("organization");
  }
}

export default organizationModel