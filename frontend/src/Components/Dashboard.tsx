import { Grid, Paper, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { VerticalBarChart } from 'amazing-react-charts';

const paperStyle = { padding: '30px 20px 20px 20px', height: 430, width: 300, margin: "20px auto" }

const year = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

const graphContent = [
  { label: 'JAN', result: 1 },
  { label: 'FEB', result: 5 },
  { label: 'MAR', result: 2 },
  { label: 'APR', result: 5 },
  { label: 'MAY', result: 0 },
  { label: 'JUNE', result: 2 },
  { label: 'JULY', result: 1 },
  { label: 'AUG', result: 0 },
  { label: 'SEPT', result: 3 },
  { label: 'OCT', result: 0 },
  { label: 'NOV', result: 5 },
  { label: 'DEC', result: 5 },
]

function Dashboard() {
  const [dengueYear, setDengueYear] = useState(new Date().getFullYear());
  const [influenzaYear, setInfluenzaYear] = useState(new Date().getFullYear());
  const [typhoidYear, setTyphoidYear] = useState(new Date().getFullYear());

  const handleChangeDengueYear = (event: any) => {
    const { value } = event.target
    setDengueYear(value)
  }

  const handleChangeInfluenzaYear = (event: any) => {
    const { value } = event.target
    setInfluenzaYear(value)
  }

  const handleChangeTyphoidYear = (event: any) => {
    const { value } = event.target
    setTyphoidYear(value)
  }

  return (
    <div style={{ display: 'flex' }}>
      <div className="box-dashboard">
        <Paper elevation={10} style={paperStyle}>
          <Grid>
            <h2>Dengue</h2>
            <div style={{ paddingLeft: '10px', transform: 'translate(0px, -20px)' }}>
              <VerticalBarChart
                showBarLabel
                rotateLabel={90}
                xType="value"
                color="blue"
                data={graphContent}
              />
            </div>
            <span>
              Select Year: &emsp;
              <Select
                labelId="dengueYear"
                id="dengueYear"
                value={dengueYear}
                label="Year"
                onChange={handleChangeDengueYear}
              >
                {year.map((value, index) =>
                  <MenuItem key={index} value={value}>{value}</MenuItem>
                )}
              </Select>
            </span>
          </Grid>
        </Paper>
      </div>

      <div className="box-dashboard">
        <Paper elevation={10} style={paperStyle}>
          <Grid>
            <h2>Influenza</h2>
            <div style={{ paddingLeft: '10px', transform: 'translate(0px, -20px)' }}>
              <VerticalBarChart
                showBarLabel
                rotateLabel={90}
                xType="value"
                color="blue"
                data={graphContent}
              />
            </div>
            <span>
              Select Year: &emsp;
              <Select
                labelId="influenzaYear"
                id="influenzaYear"
                value={influenzaYear}
                label="Year"
                onChange={handleChangeInfluenzaYear}
              >
                {year.map((value, index) =>
                  <MenuItem key={index} value={value}>{value}</MenuItem>
                )}
              </Select>
            </span>
          </Grid>
        </Paper>
      </div>

      <div className="box-dashboard">
        <Paper elevation={10} style={paperStyle}>
          <Grid>
            <h2>Typhoid</h2>
            <div style={{ paddingLeft: '10px', transform: 'translate(0px, -20px)' }}>
              <VerticalBarChart
                showBarLabel
                rotateLabel={90}
                xType="value"
                color="blue"
                data={graphContent}
              />
            </div>
            <span>
              Select Year: &emsp;
              <Select
                labelId="typhoidYear"
                id="typhoidYear"
                value={typhoidYear}
                label="Year"
                onChange={handleChangeTyphoidYear}
              >
                {year.map((value, index) =>
                  <MenuItem key={index} value={value}>{value}</MenuItem>
                )}
              </Select>
            </span>
          </Grid>
        </Paper>
      </div>
    </div>
  )
}

export default Dashboard;