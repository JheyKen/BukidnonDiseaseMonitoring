import { Request, Response } from 'express'
import patientModel from '../Model/patientModel';

const patientController = { 
    getAllPatients: async (req: Request, res: Response) => {
        try {
            const data: any = await patientModel.getAllPatients();

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
    }
}

export default patientController