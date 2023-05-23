import db from "../../db";

const organizationModel = {
  getAllOrganizations: async () => {
    return await db.table("organization");
  },
  getOrganizationByName: async (org_name: string) => {
    return await db.table("organization").filter({ org_name });
  },
  getOrganizationById: async (id: string) => {
    return await db.table("organization").filter({ id });
  },
  addOrganization: async (orgData: object) => {
    return await db.table("organization").insert(orgData);
  },
  editOrganization: async (id: string, orgData: object) => {
    return await db.table("organization").filter({ id }).update(orgData);
  },
  deleteOrganization: async (id: string) => {
    return await db.table("organization").filter({ id }).delete();
  }
}

export default organizationModel