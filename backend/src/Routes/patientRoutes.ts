import express from "express";
import patientController from "../Controller/patientController";

const patientRoutes = express.Router();

patientRoutes.get('/', patientController.getAllPatients);

export default patientRoutes