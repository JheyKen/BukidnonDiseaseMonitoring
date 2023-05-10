import db from "../../db";

const patientModel = {
  getAllPatients: async () => {
    return await db.table("patient_record");
  },
  getPatientById: async (id: string) => {
    return await db.table("patient_record").filter({ id });
  },
  addPatient: async (patientData: object) => {
    return await db.table("patient_record").insert(patientData)
  },
  editPatient: async (id: string, patientData: object) => {
    return await db.table("patient_record").filter({ id }).update(patientData);
  },
  deletePatient: async (id: string) => {
    return await db.table("patient_record").filter({ id }).delete()
  }
}

export default patientModel