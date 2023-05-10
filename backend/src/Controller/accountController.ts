import { Request, Response } from 'express'
import accountModel from '../Model/accountModel';
import bcrypt from 'bcrypt'

const accountController = {
  getAllVerifiedAccounts: async (req: Request, res: Response) => {
    try {
      const data: any = await accountModel.getAllVerifiedAccounts();

      if (data.length) {
        res.status(200).send({
          error: 0,
          data: data,
          message: 'Success'
        })
      } else {
        res.status(200).send({
          error: 0,
          data: data,
          message: 'Unable to retrieve all accounts.'
        })
      }
    } catch (error: any) {
      res.status(400).send({
        error: 1,
        data: null,
        message: error.message
      })
    }
  },
  getAllPendingAccounts: async (req: Request, res: Response) => {
    try {
      const data: any = await accountModel.getAllPendingAccounts();

      if (data.length) {
        res.status(200).send({
          error: 0,
          data: data,
          message: 'Success'
        })
      } else {
        res.status(200).send({
          error: 0,
          data: data,
          message: 'Unable to retrieve all accounts.'
        })
      }
    } catch (error: any) {
      res.status(400).send({
        error: 1,
        data: null,
        message: error.message
      })
    }
  },
  getAccountByUsername: async (req: Request, res: Response) => {
    try {
      const { username } = req.params

      const data: any = await accountModel.getAccountByUsername(username);

      if (data.length) {
        res.status(200).send({
          error: 0,
          data: data[0],
          message: 'Success'
        })
      } else {
        res.status(400).send({
          error: 0,
          data: null,
          message: 'User not found.'
        })
      }
    } catch (error: any) {
      res.status(400).send({
        error: 1,
        data: null,
        message: error.message
      })
    }
  },
  createAccount: async (req: Request, res: Response) => {
    try {
      const { createData } = req.body

      const checkIfUsernameExist = await accountModel.getAccountByUsername(createData.username)

      if (!checkIfUsernameExist) {
        res.status(200).send({
          error: 0,
          data: [],
          message: 'Username already exist.'
        })
      } else {
        const saltRounds: number = 10
        const hashedPassword: string = bcrypt.hashSync(createData.password, saltRounds)

        const account = {
          first_name: createData.first_name,
          middle_name: createData.middle_name,
          last_name: createData.last_name,
          position: createData.position,
          org_name: createData.org_name,
          username: createData.username,
          password: hashedPassword,
          status: "pending"
        }

        const data: any = await accountModel.createAccount(account)

        res.status(200).send({
          error: 0,
          data: data,
          message: 'Success'
        })
      }

    } catch (error: any) {
      res.status(400).send({
        error: 1,
        data: null,
        message: error.message
      })
    }
  },
  editAccount: async (req: Request, res: Response) => {
    try {
      const { username, editParam } = req.body

      const userExist: any = await accountModel.getAccountByUsername(username)

      if (!userExist) {
        res.status(200).send({
          error: 0,
          data: null,
          message: "Account not found."
        })
      } else {
        const data: any = await accountModel.editAccount(username, editParam)

        res.status(200).send({
          error: 0,
          data: data,
          message: 'Account successfully updated.'
        })
      }
    } catch (error: any) {
      res.status(400).send({
        error: 1,
        data: null,
        message: error.message
      })
    }
  },
  deleteAccount: async (req: Request, res: Response) => {
    try {
      const { username } = req.params

      const data: any = await accountModel.deleteAccount(username)
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

export default accountController