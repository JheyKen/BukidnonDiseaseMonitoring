import { useState, ChangeEvent } from "react";
import '../App.css';
import { Grid, Button, Paper, TextField, Select, MenuItem, InputLabel } from "@mui/material";

const paperStyle = { padding: '30px 20px 20px 20px', height: 300, width: 800, margin: "20px auto" }

function GenerateReport() {
  const [disease, setDisease] = useState("Dengue");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleDateFrom = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setDateFrom(value);
  }

  const handleDateTo = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setDateTo(value);
  }

  const handleChangeDisease = (event: any) => {
    const { value } = event.target
    setDisease(value)
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
                      labelId="disease"
                      id="disease"
                      value={disease}
                      label="Year"
                      onChange={handleChangeDisease}
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
                    <TextField className="date-field" name="dateFrom" type="date" value={dateFrom} onChange={(event: ChangeEvent<HTMLInputElement>) => handleDateFrom(event)} fullWidth required />
                  </td>
                </tr>
                <tr>
                  <td>Date To:</td>
                  <td>
                    <TextField className="date-field" name="dateTo" type="date" value={dateTo} onChange={(event: ChangeEvent<HTMLInputElement>) => handleDateTo(event)} fullWidth required />
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <Button variant="contained" className="upper-btn" style={{ marginRight: '50px' }} onClick={() => { }} fullWidth >Download Report</Button>
              <Button variant="contained" className="upper-btn" onClick={() => { }} fullWidth >Print Report</Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}

export default GenerateReport;