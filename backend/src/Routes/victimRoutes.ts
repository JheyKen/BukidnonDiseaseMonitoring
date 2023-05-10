import express from "express";
import victimController from "../Controller/victimController";

const victimRoutes = express.Router();

victimRoutes.get('/victimsCountPerMunicipality/:diagnosis/:municipality', victimController.getVictimsCountPerMunicipality);
victimRoutes.get('/gender/:diagnosis', victimController.getVictimsGenderCount);
victimRoutes.get('/age/:diagnosis', victimController.getVictimsAgeCount);

export default victimRoutes