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
    return await db.table(diagnosis).insert(data)
  },
}

export default victimModel