import express from "express";
import organizationController from "../Controller/organizationController";

const organizationRoutes = express.Router();

organizationRoutes.get('/', organizationController.getAllPatients);
organizationRoutes.get('/getById/:id', organizationController.getOrganizationById);

organizationRoutes.post('/add', organizationController.addOrganization);

organizationRoutes.put('/edit', organizationController.editOrganization);

organizationRoutes.delete('/delete/:id', organizationController.deleteOrganization);

export default organizationRoutes