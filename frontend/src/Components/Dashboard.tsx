import { Grid, Paper, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { VerticalBarChart } from 'amazing-react-charts';
import { AxiosResponse } from "axios";
import Service from "../Service/Service";

const paperStyle = { padding: '30px 20px 20px 20px', height: 400, width: 300, margin: "20px auto" }

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
  const [dengueYear, setDengueYear] = useState(new Date().getFullYear().toString());
  const [influenzaYear, setInfluenzaYear] = useState(new Date().getFullYear().toString());
  const [typhoidYear, setTyphoidYear] = useState(new Date().getFullYear().toString());
  const [dengueData, setDengueData] = useState([])
  const [influenzaData, setInfluenzaData] = useState([])
  const [typhoidData, setTyphoidData] = useState([])
  const [dengueLoading, setDengueLoading] = useState(true)
  const [influenzaLoading, setInfluenzaLoading] = useState(true)
  const [typhoidLoading, setTyphoidLoading] = useState(true)

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    handleGetDengueVictimsPerYear();
    handleGetInfluenzaVictimsPerYear();
    handleGetTyphoidVictimsPerYear();
  }, [dengueYear, influenzaYear, typhoidYear])

  const handleGetDengueVictimsPerYear = async () => {
    try {
      setDengueLoading(true)
      let month = 1;
      const year = Number(dengueYear)
      const returnData = []
      while (month < 13) {
        const result: AxiosResponse = await Service.getVictimsPerDiagnosisPerMonth("dengue", year, month);
        const { data } = result
        returnData.push({ label: monthNames[month - 1], result: data })
        month++;
      }

      //@ts-ignore
      setDengueData(returnData)
      setDengueLoading(false)
    } catch (error) {
      alert("Error fetching record.")
    }
  }

  const handleGetInfluenzaVictimsPerYear = async () => {
    try {
      setInfluenzaLoading(true)
      let month = 1;
      const year = Number(influenzaYear)
      const returnData = []
      while (month < 13) {
        const result: AxiosResponse = await Service.getVictimsPerDiagnosisPerMonth("influenza", year, month);
        const { data } = result
        returnData.push({ label: monthNames[month - 1], result: data })
        month++;
      }

      //@ts-ignore
      setInfluenzaData(returnData)
      setInfluenzaLoading(false)
    } catch (error) {
      alert("Error fetching record.")
    }
  }

  const handleGetTyphoidVictimsPerYear = async () => {
    try {
      setTyphoidLoading(true)
      let month = 1;
      const year = Number(typhoidYear)
      const returnData = []
      while (month < 13) {
        const result: AxiosResponse = await Service.getVictimsPerDiagnosisPerMonth("typhoid", year, month);
        const { data } = result
        returnData.push({ label: monthNames[month - 1], result: data })
        month++;
      }

      //@ts-ignore
      setTyphoidData(returnData)
      setTyphoidLoading(false)
    } catch (error) {
      alert("Error fetching record.")
    }
  }

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
            <div style={{ paddingLeft: '10px', transform: 'translate(0px, -20px)' }}>
              {
                dengueLoading ?
                  <div style={{ paddingTop: '30px', fontWeight: 'bold' }}>Loading Chart...</div>
                  :
                  <VerticalBarChart
                    showBarLabel
                    rotateLabel={90}
                    xType="value"
                    color="blue"
                    data={dengueData}
                  />
              }
            </div>
          </Grid>
        </Paper>
      </div>

      <div className="box-dashboard">
        <Paper elevation={10} style={paperStyle}>
          <Grid>
            <h2>Influenza</h2>
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
            <div style={{ paddingLeft: '10px', transform: 'translate(0px, -20px)' }}>
              {
                influenzaLoading ?
                  <div style={{ paddingTop: '30px', fontWeight: 'bold' }}>Loading Chart...</div>
                  :
                  <VerticalBarChart
                    showBarLabel
                    rotateLabel={90}
                    xType="value"
                    color="blue"
                    data={influenzaData}
                  />
              }
            </div>
          </Grid>
        </Paper>
      </div>

      <div className="box-dashboard">
        <Paper elevation={10} style={paperStyle}>
          <Grid>
            <h2>Typhoid</h2>
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
            <div style={{ paddingLeft: '10px', transform: 'translate(0px, -20px)' }}>
              {
                typhoidLoading ?
                  <div style={{ paddingTop: '30px', fontWeight: 'bold' }}>Loading Chart...</div>
                  :
                  <VerticalBarChart
                    showBarLabel
                    rotateLabel={90}
                    xType="value"
                    color="blue"
                    data={typhoidData}
                  />
              }
            </div>
          </Grid>
        </Paper>
      </div>
    </div>
  )
}

export default Dashboard;