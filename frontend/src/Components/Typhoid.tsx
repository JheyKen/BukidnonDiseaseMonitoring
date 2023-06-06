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
  const dateToday = `${new Date().toLocaleDateString('fr-CA')}`

  const [victimsCount, setVictimsCount] = useState([])
  const [victimsGender, setVictimsGender] = useState([])
  const [victimsAge, setVictimsAge] = useState([])
  const [loadingTable, setLoadingTable] = useState(true);
  const [page, setPage] = useState(0);
  const [dateFrom, setDateFrom] = useState(dateToday);
  const [dateTo, setDateTo] = useState(dateToday);

  useEffect(() => {
    handleVictimsCount();
    handleVictimsGender();
    handleVictimsAge();
  }, [dateFrom, dateTo])

  const handleVictimsCount = async () => {
    try {
      setLoadingTable(true)
      let x = 0;
      const returnData = []
      while (x < Municipality.length) {
        let municipalityData = Municipality[x]
        const date_from = new Date(dateFrom).valueOf();
        const date_to = new Date(dateTo).valueOf();

        const caseResult: AxiosResponse = await Service.getVictimsCountPerMunicipality("typhoid", municipalityData.name, date_from, date_to);
        const { data: cases } = caseResult

        const deathResult: AxiosResponse = await Service.getDeathCountPerMunicipality("typhoid", municipalityData.name, date_from, date_to);
        const { data: deaths } = deathResult

        returnData.push({ city: municipalityData.name, caseCount: cases, deathCount: deaths })
        x++;
      }

      const output = returnData.sort((prev: any, curr: any) => curr.caseCount - prev.caseCount)
      //@ts-ignore
      setVictimsCount(output)
      setLoadingTable(false)
    } catch (error) {
      alert("Error fetching record.")
    }
  }

  const handleVictimsGender = async () => {
    try {
      const date_from = new Date(dateFrom).valueOf();
      const date_to = new Date(dateTo).valueOf();

      const result: AxiosResponse = await Service.getVictimsCountPerGender("typhoid", date_from, date_to)
      const { data } = result
      setVictimsGender(data)
    } catch (error) {
      alert("Error fetching record.")
    }
  }

  const handleVictimsAge = async () => {
    try {
      const date_from = new Date(dateFrom).valueOf();
      const date_to = new Date(dateTo).valueOf();

      const result: AxiosResponse = await Service.getVictimsCountPerAge("typhoid", date_from, date_to)
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
          <span style={{ fontSize: '30px', fontWeight: 'bold' }}>Typhoid Reports</span>
        </div>
        <div>
          <Paper elevation={5} className='report-typhoid-bar-paper'>
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
                      <TableCell width={"25%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Deaths</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      loadingTable ?
                        <TableRow hover>
                          <TableCell colSpan={3}>Loading Data...</TableCell>
                        </TableRow>
                        :
                        victimsCount.slice(page * rows, page * rows + rows).map((row: any) => {
                          return (
                            <TableRow hover>
                              <TableCell>{row.city}</TableCell>
                              <TableCell>{row.caseCount}</TableCell>
                              <TableCell>{row.deathCount}</TableCell>
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
                {
                  loadingTable ?
                    <span>Loading Chart...</span>
                    :
                    <PieChart
                      colors={['#378AFF', '#F54F52']}
                      legendPosition="inside"
                      labelFontColor="black"
                      radius="75%"
                      center={['50%', '50%']}
                      data={victimsGender}
                    />
                }
              </div>
              <div style={{ width: '50%' }}>
                <span style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '20px' }}>Age</span>
                <br></br>
                {
                  loadingTable ?
                    <span>Loading Chart...</span>
                    :
                    <PieChart
                      colors={['#378AFF', '#F54F52', '#FFA32F', '#93F03B']}
                      legendPosition="inside"
                      labelFontColor="black"
                      radius="75%"
                      center={['50%', '50%']}
                      data={victimsAge}
                    />
                }
              </div>
            </Grid>
          </Paper>
        </div>
      </div>
    </div >
  );
}

export default Typhoid;