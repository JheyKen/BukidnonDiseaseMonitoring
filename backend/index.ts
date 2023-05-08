import "dotenv/config";
import express from 'express'

import accountRoutes from "./src/Routes/accountRoutes";
import commonRoutes from "./src/Routes/commonRoutes";
import patientRoutes from "./src/Routes/patientRoutes";
import organizationRoutes from "./src/Routes/organizationRoutes";

const app = express()
const { SERVER_PORT } = process.env

app.use(express.json())
app.use('/common', commonRoutes);
app.use('/account', accountRoutes);
app.use('/patient', patientRoutes);
app.use('/organization', organizationRoutes);


app.listen(SERVER_PORT, () => console.log("Listening to port " + SERVER_PORT));