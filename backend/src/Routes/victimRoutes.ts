import express from "express";
import victimController from "../Controller/victimController";

const victimRoutes = express.Router();

victimRoutes.get('/victimsCountPerMunicipality/:diagnosis/:municipality/:date_from/:date_to', victimController.getVictimsCountPerMunicipality);
victimRoutes.get('/gender/:diagnosis/:date_from/:date_to', victimController.getVictimsGenderCount);
victimRoutes.get('/age/:diagnosis/:date_from/:date_to', victimController.getVictimsAgeCount);
victimRoutes.get('/victimsPerDiagnosisPerMonth/:diagnosis/:year/:month', victimController.getVictimsPerDiagnosisPerMonth);
export default victimRoutes