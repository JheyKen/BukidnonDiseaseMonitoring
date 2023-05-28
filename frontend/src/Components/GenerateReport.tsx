import { useState } from "react";
import '../App.css';
import { Grid, Button, Paper, TextField, Select, MenuItem } from "@mui/material";
import reportTemplate from "../Data/Report"
import { AxiosResponse } from "axios";
import Service from "../Service/Service";

const paperStyle = { padding: '30px 20px 20px 20px', height: 300, width: 800, margin: "20px auto" }

interface Props {
  handleDataForReport: (data: any) => void;
  diseaseForReport: string,
  dateFromForReport: string,
  dateToForReport: string
}

function GenerateReport(props: Props) {
  const { handleDataForReport, diseaseForReport, dateFromForReport, dateToForReport } = props

  const handleDownloadReport = async () => {
    try {
      const result: AxiosResponse = await Service.generatePDF();
      const { data } = result
      alert(data.message)
    } catch (error) {
      alert("Error generating PDF.");
    }
  }

  return (
    <div className="box">
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <form>
            <div style={{ padding: '25px 20%', textAlign: 'left' }}>
              <table>
                <tr>
                  <td width={"150px"}>Choose Disease:</td>
                  <td>
                    <Select
                      labelId="diseaseForReport"
                      id="diseaseForReport"
                      name="diseaseForReport"
                      value={diseaseForReport}
                      label="Disease"
                      onChange={handleDataForReport}
                      style={{ width: '330px' }}
                    >
                      <MenuItem key="1" value="Dengue">Dengue</MenuItem>
                      <MenuItem key="2" value="Influenza">Influenza</MenuItem>
                      <MenuItem key="3" value="Typhoid">Typhoid</MenuItem>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td>Date From:</td>
                  <td>
                    <TextField className="date-field" name="dateFromForReport" type="date" value={dateFromForReport} onChange={handleDataForReport} fullWidth required />
                  </td>
                </tr>
                <tr>
                  <td>Date To:</td>
                  <td>
                    <TextField className="date-field" name="dateToForReport" type="date" value={dateToForReport} onChange={handleDataForReport} fullWidth required />
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <center>
                <Button variant="contained" className="upper-btn" onClick={handleDownloadReport} fullWidth >Download Report</Button>
              </center>
            </div>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}

export default GenerateReport;