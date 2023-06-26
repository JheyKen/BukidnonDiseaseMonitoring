import express from "express";
import victimController from "../Controller/victimController";

const victimRoutes = express.Router();

victimRoutes.get('/overallCaseCount/:diagnosis', victimController.getOverallCaseCount);
victimRoutes.get('/caseCountCustomDate/:diagnosis/:date_from/:date_to', victimController.getCaseCountCustomDate);

//all cases
victimRoutes.get('/genderCountAll/:diagnosis', victimController.getAllGenderCountPerCase);
victimRoutes.get('/ageCountAll/:diagnosis', victimController.getAllAgePerCase);
victimRoutes.get('/victimsCountAllPerMunicipality/:diagnosis/:municipality', victimController.getAllVictimsCountPerMunicipality);
victimRoutes.get('/deathCountAllPerMunicipality/:diagnosis/:municipality', victimController.getAllDeathCountPerMunicipality);
victimRoutes.get('/positiveCountAllPerMunicipality/:diagnosis/:municipality', victimController.getAllPositiveCountPerMunicipality);

//specific dates
victimRoutes.get('/victimsCountPerMunicipality/:diagnosis/:municipality/:date_from/:date_to', victimController.getVictimsCountPerMunicipality);
victimRoutes.get('/deathCounts/:diagnosis/:municipality/:date_from/:date_to', victimController.getDeathCountPerMunicipality);
victimRoutes.get('/gender/:diagnosis/:date_from/:date_to', victimController.getVictimsGenderCount);
victimRoutes.get('/age/:diagnosis/:date_from/:date_to', victimController.getVictimsAgeCount);
victimRoutes.get('/victimsPerDiagnosisPerMonth/:diagnosis/:year/:month', victimController.getVictimsPerDiagnosisPerMonth);


export default victimRoutes