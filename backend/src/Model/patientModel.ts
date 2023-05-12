import db from "../../db";

const patientModel = {
  getAllPatients: async () => {
    return await db.table("patient_record");
  },
  getPatientById: async (id: string) => {
    return await db.table("patient_record").filter({ id });
  },
  addPatient: async (patientData: object) => {
    return await db.table("patient_record").insert({
      ...patientData,
      //@ts-ignore
      date_diagnosed: db.ISO8601(new Date(patientData.date_diagnosed).toISOString())
    })
  },
  editPatient: async (id: string, patientData: object) => {
    return await db.table("patient_record").filter({ id }).update({
      ...patientData,
      //@ts-ignore
      date_diagnosed: db.ISO8601(new Date(patientData.date_diagnosed).toISOString())
    });
  },
  deletePatient: async (id: string) => {
    return await db.table("patient_record").filter({ id }).delete()
  }
}

export default patientModel