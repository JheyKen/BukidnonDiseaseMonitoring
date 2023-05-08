import {
  Button,
  Paper,
  TextField,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from "@mui/material";
import { Search, Visibility, Edit, Delete } from "@mui/icons-material"
import "../App.css";
import { useEffect, useState } from "react";
import { AddPatientRecord, DeletePatientRecord, EditPatientRecord, ViewPatientRecord } from "../Modals";
import { AxiosResponse } from "axios";
import Service from "../Service/Service";

function PatientRecord() {
  const rows: number = 4;

  const [allPatients, setAllPatients] = useState([])
  const [searchedRows, setSearchedRows] = useState([])
  const [page, setPage] = useState(0);
  const [openAddPatientModal, setOpenAddPatientModal] = useState(false);
  const [openViewPatientModal, setOpenViewPatientModal] = useState(false);
  const [openEditPatientModal, setOpenEditPatientModal] = useState(false);
  const [openDeletePatientModal, setOpenDeletePatientModal] = useState(false);

  useEffect(() => {
    handleAllPatients();
  }, [])

  const handleAllPatients = async () => {
    try {
      const result: AxiosResponse = await Service.getAllPatients()
      const {data} = result
      setAllPatients(data)
      setSearchedRows(data)
    } catch (error) {
      alert("Error fetching patients.")
    }
  }

  const searchRow = (event: any) => {
    const {value} = event.target

    if (!value || value === '') {
      setSearchedRows(allPatients)
    }
    else {
      const filterRow = allPatients.filter((row: any) => {
        return row.first_name.toLowerCase().includes(value.toLowerCase()) || 
                    row.middle_name.toLowerCase().includes(value.toLowerCase()) ||
                    row.last_name.toLowerCase().includes(value.toLowerCase())
      })
      setSearchedRows(filterRow)
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleOpenAddPatientModal = () => {
    setOpenAddPatientModal(true);
  }

  const handleCloseAddPatientModal = () => {
    setOpenAddPatientModal(false);
  }

  const handleOpenViewPatientModal = () => {
    setOpenViewPatientModal(true);
  }

  const handleCloseViewPatientModal = () => {
    setOpenViewPatientModal(false);
  }

  const handleOpenEditPatientModal = () => {
    setOpenEditPatientModal(true);
  }

  const handleCloseEditPatientModal = () => {
    setOpenEditPatientModal(false);
  }

  const handleOpenDeletePatientModal = () => {
    setOpenDeletePatientModal(true);
  }

  const handleCloseDeletePatientModal = () => {
    setOpenDeletePatientModal(false);
  }

  return (
    <div style={{paddingLeft: '15px'}}>
      <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
        <span style={{ fontSize: '30px', fontWeight: 'bold' }}>Patient Record</span>
      </div>

      <div className='row'>
        <div style={{ verticalAlign: 'middle', paddingTop: '10px' }}>
          <Button
            className="upper-btn"
            color="primary"
            variant="contained"
            onClick={handleOpenAddPatientModal}
          >
            Add Patient Record
          </Button>
        </div>
        <div>
          <Paper elevation={5} className='search-bar-paper'>
            <TextField
              id='search-bar'
              placeholder="Search Patient"
              onChange={searchRow}
              InputProps={{ endAdornment: <InputAdornment position="end"><Search /></InputAdornment> }} />
          </Paper>
        </div>
      </div>

      <Paper elevation={10}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#115293' }}>
                <TableCell width={"5%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}></TableCell>
                <TableCell width={"35%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell width={"10%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Age</TableCell>
                <TableCell width={"15%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Gender</TableCell>
                <TableCell width={"15%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Diagnosis</TableCell>
                <TableCell width={"20%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
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
                        <TableCell align='center'>
                          <Button className='table-btn' onClick={handleOpenViewPatientModal}>
                            <Visibility color='primary' />
                          </Button>
                        </TableCell>
                        <TableCell align="center">{`${row.first_name} ${row.middle_name} ${row.last_name}`}</TableCell>
                        <TableCell align="center">{row.age}</TableCell>
                        <TableCell align="center">{row.gender}</TableCell>
                        <TableCell align="center">{row.diagnosis}</TableCell>
                        <TableCell align='center'>
                          <Button color='primary' variant='contained' className='table-btn' onClick={handleOpenEditPatientModal}>
                            <Edit style={{ color: 'white' }} />
                          </Button>
                          &emsp;
                          <Button color='error' variant='contained' onClick={handleOpenDeletePatientModal}>
                            <Delete style={{ color: 'white' }} />
                          </Button>
                        </TableCell>
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
      </Paper>

      <AddPatientRecord
        open={openAddPatientModal}
        handleClose={handleCloseAddPatientModal}
      />

      <ViewPatientRecord
        open={openViewPatientModal}
        handleClose={handleCloseViewPatientModal}
      />

      <EditPatientRecord
        open={openEditPatientModal}
        handleClose={handleCloseEditPatientModal}
      />

      <DeletePatientRecord
        open={openDeletePatientModal}
        handleClose={handleCloseDeletePatientModal}
      />
    </div>
  )
}

export default PatientRecord;