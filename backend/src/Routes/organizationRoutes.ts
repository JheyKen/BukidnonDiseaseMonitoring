import express from "express";
import organizationController from "../Controller/organizationController";

const organizationRoutes = express.Router();

organizationRoutes.get('/', organizationController.getAllPatients);

export default organizationRoutes