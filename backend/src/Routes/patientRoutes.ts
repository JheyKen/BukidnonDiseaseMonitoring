import express from "express";
import patientController from "../Controller/patientController";

const patientRoutes = express.Router();

patientRoutes.get('/', patientController.getAllPatients);
patientRoutes.get('/getById/:id', patientController.getPatientById);

patientRoutes.post('/addPatient', patientController.addPatient);

patientRoutes.put('/editPatient', patientController.editPatient);

patientRoutes.delete('/deletePatient/:id', patientController.deletePatient);

export default patientRoutes