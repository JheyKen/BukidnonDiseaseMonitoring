import { Request, Response } from 'express'
import victimModel from "../Model/victimModel"

const victimController = {
  getOverallCaseCount: async (req: Request, res: Response) => {
    try {
      const { diagnosis } = req.params

      const data: any = await victimModel.getOverallCaseCount(diagnosis);

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
  getCaseCountCustomDate: async (req: Request, res: Response) => {
    try {
      const { diagnosis, date_from, date_to } = req.params

      const dateFrom = new Date(Number(date_from)).toISOString();
      const dateTo = new Date(Number(date_to)).toISOString();

      const data: any = await victimModel.getCaseCountCustomDate(diagnosis, dateFrom, dateTo);

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
  //all cases
  getAllGenderCountPerCase: async (req: Request, res: Response) => {
    try {
      const { diagnosis } = req.params

      const male: any = await victimModel.getAllGenderCountPerCase(diagnosis, "Male");
      const female: any = await victimModel.getAllGenderCountPerCase(diagnosis, "Female");

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
  getAllAgePerCase: async (req: Request, res: Response) => {
    try {
      const { diagnosis } = req.params

      const pedia: any = await victimModel.getAllPediaVictims(diagnosis)
      const young: any = await victimModel.getAllYoungVictim(diagnosis)
      const middle: any = await victimModel.getAllMiddleVictim(diagnosis)
      const elderly: any = await victimModel.getAllElderlyVictim(diagnosis)

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
  },
  getAllVictimsCountPerMunicipality: async (req: Request, res: Response) => {
    try {
      const { diagnosis, municipality } = req.params

      const data: any = await victimModel.getAllVictimsCountPerMunicipality(diagnosis, municipality);

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
  getAllDeathCountPerMunicipality: async (req: Request, res: Response) => {
    try {
      const { diagnosis, municipality } = req.params

      const data: any = await victimModel.getAllDeathCountPerMunicipality(diagnosis, municipality);

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
  getAllPositiveCountPerMunicipality: async (req: Request, res: Response) => {
    try {
      const { diagnosis, municipality } = req.params

      const data: any = await victimModel.getAllPositiveCountPerMunicipality(diagnosis, municipality);

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
  //specific dates
  getVictimsCountPerMunicipality: async (req: Request, res: Response) => {
    try {
      const { diagnosis, municipality, date_from, date_to } = req.params

      const dateFrom = new Date(Number(date_from)).toISOString();
      const dateTo = new Date(Number(date_to)).toISOString();

      const data: any = await victimModel.getVictimsCountPerMunicipality(diagnosis, municipality, dateFrom, dateTo);

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
  getDeathCountPerMunicipality: async (req: Request, res: Response) => {
    try {
      const { diagnosis, municipality, date_from, date_to } = req.params

      const dateFrom = new Date(Number(date_from)).toISOString();
      const dateTo = new Date(Number(date_to)).toISOString();

      const data: any = await victimModel.getDeathCountPerMunicipality(diagnosis, municipality, dateFrom, dateTo);

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
      const { diagnosis, date_from, date_to } = req.params

      const dateFrom = new Date(Number(date_from)).toISOString();
      const dateTo = new Date(Number(date_to)).toISOString();

      const male: any = await victimModel.getVictimsGenderCount(diagnosis, "Male", dateFrom, dateTo);
      const female: any = await victimModel.getVictimsGenderCount(diagnosis, "Female", dateFrom, dateTo);

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
      const { diagnosis, date_from, date_to } = req.params

      const dateFrom = new Date(Number(date_from)).toISOString();
      const dateTo = new Date(Number(date_to)).toISOString();

      const pedia: any = await victimModel.getPediaVictims(diagnosis, dateFrom, dateTo)
      const young: any = await victimModel.getYoungVictim(diagnosis, dateFrom, dateTo)
      const middle: any = await victimModel.getMiddleVictim(diagnosis, dateFrom, dateTo)
      const elderly: any = await victimModel.getElderlyVictim(diagnosis, dateFrom, dateTo)

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
  },
  getVictimsPerDiagnosisPerMonth: async (req: Request, res: Response) => {
    try {
      const { diagnosis, year, month } = req.params

      const data = await victimModel.getVictimsPerDiagnosisPerMonth(diagnosis, Number(year), Number(month))

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

}

export default victimController