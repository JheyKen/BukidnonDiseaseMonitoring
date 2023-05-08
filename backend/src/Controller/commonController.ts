import { Request, Response } from 'express'
import commonModel from "../Model/commonModel"

const commonController = {
  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body

      const userData: any = await commonModel.getAccountByUsername(username)

      if (userData.length) {
        const { password: userPassword } = userData[0]

        if (userPassword == password) {
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
  }
}

export default commonController