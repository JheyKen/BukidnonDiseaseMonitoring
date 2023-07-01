import { Request, Response } from 'express'
import commonModel from "../Model/commonModel"
import bcrypt from 'bcrypt'
import fs from 'fs'
var pdf = require('html-pdf')

const commonController = {
  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body

      const userData: any = await commonModel.getAccountByUsername(username)

      if (userData.length) {
        const { password: userPassword } = userData[0]

        const isPasswordCorrect: boolean = bcrypt.compareSync(password, userPassword)

        if (isPasswordCorrect) {
          res.status(200).send({
            error: 0,
            data: userData[0],
            message: "Success"
          })
        } else {
          res.status(200).send({
            error: 0,
            data: 0,
            message: "Password incorrect."
          })
        }
      } else {
        res.status(200).send({
          error: 0,
          data: 0,
          message: "No user found."
        })
      }
    } catch (error: any) {
      res.status(500).send({
        error: 1,
        data: 0,
        message: error.message
      })
    }
  },
  getBarangayPerMunicipality: async (req: Request, res: Response) => {
    try {
      const { municipality } = req.params

      const data = await commonModel.getBarangayByMunicipality(municipality)

      if (data.length) {
        res.status(200).send({
          error: 0,
          data: data,
          message: 'Success'
        })
      } else {
        res.status(400).send({
          error: 0,
          data: null,
          message: 'Patient not found.'
        })
      }
    } catch (error: any) {
      res.status(500).send({
        error: 1,
        data: 0,
        message: error.message
      })
    }
  },
  generatePDF: async (req: Request, res: Response) => {
    try {
      const templatePath = "D:/Ken/Capstone/System/BukidnonDiseaseMonitoring/frontend/src/Data/Report.tsx"

      var html = fs.readFileSync(templatePath, 'utf8');
      var options = { format: 'A4' };

      const generatePDF = await pdf.create(html, options).toFile('businesscard.pdf');

      res.status(200).send({
        error: 0,
        data: generatePDF,
        message: 'Success'
      })
    } catch (error: any) {
      res.status(500).send({
        error: 1,
        data: 0,
        message: error.message
      })
    }
  }
}

export default commonController