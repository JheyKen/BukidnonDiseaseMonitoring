import { Request, Response } from 'express'
import patientModel from '../Model/patientModel';
import victimModel from '../Model/victimModel';

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
    },
    getPatientById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const data: any = await patientModel.getPatientById(id);

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
                    message: 'Patient not found.'
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
    addPatient: async (req: Request, res: Response) => {
        try {
            const { patientData } = req.body

            var diff_ms = Date.now() - new Date(patientData.date_of_birth).getTime();
            var age_dt = new Date(diff_ms);
            const computedAge = Math.abs(age_dt.getUTCFullYear() - 1970)

            const newData = {
                ...patientData,
                age: computedAge
            }

            const data = await patientModel.addPatient(newData);

            const addToDiagnosis = {
                id: data.id,
                gender: patientData.gender,
                age: computedAge,
                municipality: patientData.municipality
            }

            const diagnosis = patientData.diagnosis.toLowerCase()
            await victimModel.addPatientRecordToDiagnosis(diagnosis, addToDiagnosis)

            res.status(200).send({
                error: 0,
                data: data,
                message: 'Success.'
            })

        } catch (error: any) {
            res.status(400).send({
                error: 1,
                data: null,
                message: error.message
            })
        }
    },
    editPatient: async (req: Request, res: Response) => {
        try {
            const { patientData } = req.body

            const checkPatientIfExist = await patientModel.getPatientById(patientData.id)

            if (!checkPatientIfExist) {
                res.status(200).send({
                    error: 0,
                    data: null,
                    message: "Patient not found."
                })
            } else {
                var diff_ms = Date.now() - new Date(patientData.date_of_birth).getTime();
                var age_dt = new Date(diff_ms);
                const computedAge = Math.abs(age_dt.getUTCFullYear() - 1970)

                const newData = {
                    ...patientData,
                    age: computedAge
                }

                const data = await patientModel.editPatient(patientData.id, newData);

                res.status(200).send({
                    error: 0,
                    data: data,
                    message: 'Success.'
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
    deletePatient: async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const data: any = await patientModel.deletePatient(id)
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

export default patientController