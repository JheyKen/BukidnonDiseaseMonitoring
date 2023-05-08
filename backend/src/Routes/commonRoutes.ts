import express from "express";
import commonController from "../Controller/commonController";

const commonRoutes = express.Router();

commonRoutes.post('/login', commonController.login);

export default commonRoutes