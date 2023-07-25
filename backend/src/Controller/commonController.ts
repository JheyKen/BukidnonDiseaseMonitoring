import { Request, Response } from 'express'
import commonModel from "../Model/commonModel"
import bcrypt from 'bcrypt'
import puppeteer from 'puppeteer'
import fs from 'fs'
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
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const diseaseForReport = 'Influenza'
      const { body } = req;
      await page.evaluateOnNewDocument(
        params => {
          localStorage.clear();
          localStorage.setItem('diseaseForReport', params.diseaseForReport);
          localStorage.setItem('dateToForReport', params.dateToForReport);
          localStorage.setItem('dateFromForReport', params.dateFromForReport);
        }, body);
      await page.goto('http://localhost:3000/report', { waitUntil: 'networkidle0' });
      await page.emulateMediaType('screen');
      const pdf = await page.pdf({
        printBackground: true,
        format: 'A4',
        path: './report.pdf'
      });
      await browser.close();
      const readStream = fs.createReadStream('./report.pdf');
      res.setHeader('Content-Type', 'application/pdf');
      readStream.pipe(res);
      return res.send(pdf);
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