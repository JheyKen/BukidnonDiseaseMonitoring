import { useEffect, useState, ChangeEvent } from "react";
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField
} from "@mui/material";
import { PieChart } from 'amazing-react-charts'
import { Municipality } from "../Data/municipality";
import { AxiosResponse } from "axios";
import Service from "../Service/Service";

const paperStyle = { padding: '10px 20px 40px 20px', height: 370, width: 400, margin: "10px auto" }
const secondPaperStyle = { padding: '20px 20px 30px 20px', height: 370, width: 530, margin: "10px auto" }

function Typhoid() {
  const rows: number = 5;

  const [victimsCount, setVictimsCount] = useState([])
  const [victimsGender, setVictimsGender] = useState([])
  const [victimsAge, setVictimsAge] = useState([])
  const [loading, setLoading] = useState(true)
  const [dataPeriod, setDataPeriod] = useState("Daily")
  const [page, setPage] = useState(0);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    handleVictimsCount();
    handleVictimsGender();
    handleVictimsAge();
  }, [])

  const handleVictimsCount = async () => {
    try {
      let x = 0;
      const returnData = []
      while (x < Municipality.length) {
        let municipalityData = Municipality[x]

        const result: AxiosResponse = await Service.getVictimsCountPerMunicipality("typhoid", municipalityData.name);
        const { data } = result
        returnData.push({ city: municipalityData.name, count: data })
        x++;
      }

      //@ts-ignore
      setVictimsCount(returnData)
      setLoading(false)
    } catch (error) {
      alert("Error fetching record.")
    }
  }

  const handleVictimsGender = async () => {
    try {
      const result: AxiosResponse = await Service.getVictimsCountPerGender("typhoid")
      const { data } = result
      setVictimsGender(data)
    } catch (error) {
      alert("Error fetching record.")
    }
  }

  const handleVictimsAge = async () => {
    try {
      const result: AxiosResponse = await Service.getVictimsCountPerAge("typhoid")
      const { data } = result
      setVictimsAge(data)
    } catch (error) {
      alert("Error fetching record.")
    }
  }

  const handleDateFrom = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setDateFrom(value);
  }

  const handleDateTo = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setDateTo(value);
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div style={{ paddingLeft: '15px' }}>
      <div className='row'>
        <div style={{ verticalAlign: 'middle', paddingTop: '10px' }}>
          <span style={{ fontSize: '30px', fontWeight: 'bold' }}>Dengue Reports</span>
        </div>
        <div>
          <Paper elevation={5} className='report-dengue-bar-paper'>
            <table>
              <tr>
                <td>
                  <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Date From:&emsp;</span>
                </td>
                <td>
                  <TextField id="disease-date-field" name="dateFrom" type="date" value={dateFrom} onChange={(event: ChangeEvent<HTMLInputElement>) => handleDateFrom(event)} fullWidth required />
                </td>
                <td>
                  <span style={{ fontWeight: 'bold', fontSize: '20px', paddingLeft: '20px' }}>Date To:&emsp;</span>
                </td>
                <td>
                  <TextField id="disease-date-field" name="dateTo" type="date" value={dateTo} onChange={(event: ChangeEvent<HTMLInputElement>) => handleDateTo(event)} fullWidth required />
                </td>
              </tr>
            </table>
          </Paper>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <div className="box-dashboard">
          <Paper elevation={10} style={paperStyle}>
            <Grid>
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Number of Victims per City</span>

              <TableContainer style={{ paddingTop: '10px' }}>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: '#115293' }}>
                      <TableCell width={"75%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>City</TableCell>
                      <TableCell width={"25%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Cases</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      loading ?
                        <TableRow hover>
                          <TableCell colSpan={2}>Loading Data...</TableCell>
                        </TableRow>
                        :
                        victimsCount.slice(page * rows, page * rows + rows).map((row: any) => {
                          return (
                            <TableRow hover>
                              <TableCell>{row.city}</TableCell>
                              <TableCell>{row.count}</TableCell>
                            </TableRow>
                          )
                        })
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[rows]}
                component="div"
                count={victimsCount.length}
                rowsPerPage={rows}
                page={page}
                onPageChange={handleChangePage}
              />
            </Grid>
          </Paper>
        </div>

        <div className="box-dashboard">
          <Paper elevation={10} style={secondPaperStyle}>
            <Grid style={{ display: 'flex' }}>
              <div style={{ width: '50%' }}>
                <span style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '20px' }}>Gender</span>
                <br></br>
                <PieChart
                  colors={['#378AFF', '#F54F52']}
                  legendPosition="inside"
                  labelFontColor="black"
                  radius="75%"
                  center={['50%', '50%']}
                  data={victimsGender}
                />
              </div>
              <div style={{ width: '50%' }}>
                <span style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '20px' }}>Age</span>
                <br></br>
                <PieChart
                  colors={['#378AFF', '#F54F52', '#FFA32F', '#93F03B']}
                  legendPosition="inside"
                  labelFontColor="black"
                  radius="75%"
                  center={['50%', '50%']}
                  data={victimsAge}
                />
              </div>
            </Grid>
          </Paper>
        </div>
      </div>
    </div >
  );
}

export default Typhoid;