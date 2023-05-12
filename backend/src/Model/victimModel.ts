import db from "../../db";

const victimModel = {
  getVictimsCountPerMunicipality: async (diagnosis: string, municipality: string) => {
    return await db.table(diagnosis).filter({ municipality }).count();
  },
  getVictimsGenderCount: async (diagnosis: string, gender: string) => {
    return await db.table(diagnosis).filter({ gender }).count();
  },
  getPediaVictims: async (diagnosis: string) => {
    return await db.table(diagnosis).filter(db.row('age').le(14)).count();
  },
  getYoungVictim: async (diagnosis: string) => {
    return await db.table(diagnosis).filter(db.row('age').ge(15).and(db.row('age').le(47))).count();
  },
  getMiddleVictim: async (diagnosis: string) => {
    return await db.table(diagnosis).filter(db.row('age').ge(48).and(db.row('age').le(63))).count();
  },
  getElderlyVictim: async (diagnosis: string) => {
    return await db.table(diagnosis).filter(db.row('age').ge(64)).count();
  },
  addPatientRecordToDiagnosis: async (diagnosis: string, data: object) => {
    return await db.table(diagnosis).insert({
      ...data,
      //@ts-ignore
      date_diagnosed: db.ISO8601(data.date_diagnosed)
    });
  },
  editPatientRecordToDiagnosis: async (diagnosis: string, patientID: string, data: object) => {
    return await db.table(diagnosis).filter({ patient_id: patientID }).update({
      ...data,
      //@ts-ignore
      date_diagnosed: db.ISO8601(data.date_diagnosed)
    });
  },
  deletePatientRecordToDiagnosis: async (id: string, diagnosis: string) => {
    return await db.table(diagnosis).filter({ patient_id: id }).delete();
  }
}

export default victimModel