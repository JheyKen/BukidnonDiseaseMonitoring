import { Request, Response } from 'express'
import organizationModel from '../Model/organizationModel';

const organizationController = {
    getAllPatients: async (req: Request, res: Response) => {
        try {
            const data: any = await organizationModel.getAllOrganizations();

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
                    message: 'Unable to retrieve all organizations.'
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
    getOrganizationById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const data: any = await organizationModel.getOrganizationById(id);

            if (data.length) {
                res.status(200).send({
                    error: 0,
                    data: data[0],
                    message: 'Success'
                })
            } else {
                res.status(200).send({
                    error: 0,
                    data: data,
                    message: 'Unable to retrieve organization.'
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
    addOrganization: async (req: Request, res: Response) => {
        try {
            const { orgData } = req.body

            const orgExist = await organizationModel.getOrganizationByName(orgData.org_name)

            if (orgExist.length) {
                res.status(200).send({
                    error: 0,
                    data: null,
                    message: "Organization already exist."
                })
            } else {
                const data = await organizationModel.addOrganization(orgData)

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
    editOrganization: async (req: Request, res: Response) => {
        try {
            const { orgData, id } = req.body

            const orgExist = await organizationModel.getOrganizationById(id)

            if (!orgExist.length) {
                res.status(200).send({
                    error: 0,
                    data: null,
                    message: "Organization does exist."
                })
            } else {
                const data = await organizationModel.editOrganization(id, orgData)

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
    deleteOrganization: async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const orgExist: any = await organizationModel.getOrganizationById(id);

            if (orgExist.length) {
                const data: any = await organizationModel.deleteOrganization(id);

                res.status(200).send({
                    error: 0,
                    data: data,
                    message: 'Success'
                })
            } else {
                res.status(400).send({
                    error: 0,
                    data: null,
                    message: 'Organization not found.'
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

export default organizationController