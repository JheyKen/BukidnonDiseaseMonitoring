import { Request, Response } from 'express'
import victimModel from "../Model/victimModel"
import bcrypt from 'bcrypt'

const victimController = {
  getVictimsCountPerMunicipality: async (req: Request, res: Response) => {
    try {
      const { diagnosis, municipality } = req.params

      const data: any = await victimModel.getVictimsCountPerMunicipality(diagnosis, municipality);

      res.status(200).send({
        error: 0,
        data: data,
        message: 'Success'
      })
    } catch (error: any) {
      res.status(400).send({
        error: 1,
        data: null,
        message: error.message
      })
    }
  },
  getVictimsGenderCount: async (req: Request, res: Response) => {
    try {
      const { diagnosis } = req.params

      const male: any = await victimModel.getVictimsGenderCount(diagnosis, "Male");
      const female: any = await victimModel.getVictimsGenderCount(diagnosis, "Female");

      const data = [
        { name: "Male", value: male },
        { name: "Female", value: female }
      ]

      res.status(200).send({
        error: 0,
        data: data,
        message: 'Success'
      })
    } catch (error: any) {
      res.status(400).send({
        error: 1,
        data: null,
        message: error.message
      })
    }
  },
  getVictimsAgeCount: async (req: Request, res: Response) => {
    try {
      const { diagnosis } = req.params
      // 14 below
      // 15 - 47
      // 48 - 63
      // 64 above

      const pedia: any = await victimModel.getPediaVictims(diagnosis)
      const young: any = await victimModel.getYoungVictim(diagnosis)
      const middle: any = await victimModel.getMiddleVictim(diagnosis)
      const elderly: any = await victimModel.getElderlyVictim(diagnosis)

      const data = [
        { name: "Below 14", value: pedia },
        { name: "15 - 47", value: young },
        { name: "48 - 63", value: middle },
        { name: "Above 64", value: elderly },
      ]

      res.status(200).send({
        error: 0,
        data: data,
        message: 'Success'
      })
    } catch (error: any) {
      res.status(400).send({
        error: 1,
        data: null,
        message: error.message
      })
    }
  }
}

export default victimController