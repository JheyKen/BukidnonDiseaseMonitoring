import db from "../../db";

const patientModel = {
  getAllPatients: async () => {
    return await db.table("patient_record");
  }
}

export default patientModel