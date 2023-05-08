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

const paperStyle = { padding: '10px 20px 40px 20px', height: 370, width: 400, margin: "10px auto" }
const secondPaperStyle = { padding: '20px 20px 30px 20px', height: 370, width: 530, margin: "10px auto" }
const pieGraph = [
  { name: "Male", value: 5 },
  { name: "Female", value: 10 }
]

function Influenza() {
  const rows: number = 5;

  const tableData: any = [
    { "city": "Don Carlos", "victims": 1 },
    { "city": "Kadingilan", "victims": 2 },
    { "city": "Kibawe", "victims": 3 },
    { "city": "Kitaotao", "victims": 4 },
    { "city": "Malaybalay City", "victims": 5 },
    { "city": "Maramag", "victims": 6 },
    { "city": "Pangantucan", "victims": 7 },
    { "city": "Quezon", "victims": 8 },
    { "city": "San Fernando", "victims": 9 },
    { "city": "Valencia City", "victims": 10 }
  ]

  const [allPatients, setAllPatients] = useState(tableData)
  const [searchedRows, setSearchedRows] = useState(tableData)
  const [dataPeriod, setDataPeriod] = useState("Daily")
  const [page, setPage] = useState(0);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    handleAllPatients();
  }, [])

  const handleAllPatients = () => {
    setAllPatients(tableData)
  }

  const handleDateFrom = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setDateFrom(value);
  }

  const handleDateTo = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setDateTo(value);
  }

  const searchRow = (value: string) => {
    // if (!value || value === '') {
    //   setSearchedRows(allPatients)
    // }
    // else {
    //   const filterRow = tableData.filter((row: any) => {
    //     return row.name.toLowerCase().includes(value.toLowerCase())
    //   })
    //   setSearchedRows(filterRow)
    // }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div style={{paddingLeft: '15px'}}>
      <div className='row'>
        <div style={{ verticalAlign: 'middle', paddingTop: '10px' }}>
          <span style={{ fontSize: '30px', fontWeight: 'bold' }}>Influenza Reports</span>
        </div>
        <div>
          <Paper elevation={5} className='report-influenza-bar-paper'>
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
                      !searchedRows.length ?
                        <TableRow>
                          <TableCell colSpan={6} style={{ textAlign: 'center' }}>No Records Found</TableCell>
                        </TableRow>
                        :
                        searchedRows.slice(page * rows, page * rows + rows).map((row: any) => {
                          return (
                            <TableRow hover key={row.id}>
                              <TableCell align="center">{row.city}</TableCell>
                              <TableCell align="center">{row.victims}</TableCell>
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
                count={searchedRows.length}
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
                  colors={['green', 'blue']}
                  legendPosition="inside"
                  labelFontColor="black"
                  radius="75%"
                  center={['50%', '50%']}
                  data={pieGraph}
                />
              </div>
              <div style={{ width: '50%' }}>
                <span style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '20px' }}>Age</span>
                <br></br>
                <PieChart
                  colors={['green', 'blue']}
                  legendPosition="inside"
                  labelFontColor="black"
                  radius="75%"
                  center={['50%', '50%']}
                  data={pieGraph}
                />
              </div>
            </Grid>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default Influenza;