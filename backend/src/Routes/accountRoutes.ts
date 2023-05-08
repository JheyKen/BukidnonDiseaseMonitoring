import express from "express";
import accountController from "../Controller/accountController";

const accountRoutes = express.Router();

accountRoutes.get('/verified', accountController.getAllVerifiedAccounts);
accountRoutes.get('/pending', accountController.getAllPendingAccounts);
accountRoutes.get('/:username', accountController.getAccountByUsername);

accountRoutes.post('/createAccount', accountController.createAccount);

accountRoutes.put('/editAccount', accountController.editAccount);

accountRoutes.delete('/deleteAccount/:username', accountController.deleteAccount);

export default accountRoutes