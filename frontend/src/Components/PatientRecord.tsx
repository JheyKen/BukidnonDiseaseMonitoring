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
  const [selectedPatientData, setSelectedPatientData] = useState({}) //holds the data of the patient to be edited/view/deleted
  const [addPatient, setAddPatient] = useState([])
  const [editPatient, setEditPatient] = useState([])
  const [deletePatient, setDeletePatient] = useState([])

  useEffect(() => {
    handleAllPatients();
  }, [addPatient, editPatient, deletePatient])

  const handleAllPatients = async () => {
    try {
      const result: AxiosResponse = await Service.getAllPatients()
      const { data } = result
      setAllPatients(data)
      setSearchedRows(data)
    } catch (error) {
      alert("Error fetching patients.")
    }
  }

  const handleAddPatient = async (patientData: object) => {
    try {
      const result: AxiosResponse = await Service.addPatient(patientData)
      const { data } = result
      alert("Successfully created record.")

      setAddPatient(data)
      setOpenAddPatientModal(false);
      setSelectedPatientData([])
    } catch (error) {
      alert("Error creating record.")
    }
  }

  const handleEditPatient = async (patientData: object) => {
    try {
      const result: AxiosResponse = await Service.editPatient(patientData)
      const { data } = result
      alert("Successfully edited record.")

      setEditPatient(data)
      setOpenEditPatientModal(false);
      setSelectedPatientData([])
    } catch (error) {
      alert("Error editing record.")
    }
  }

  const handleDeleteAccount = async (id: string) => {
    try {
      const result: AxiosResponse = await Service.deletePatient(id);
      const { data } = result
      alert("Successfully deleted record.")

      setOpenDeletePatientModal(false);
      setDeletePatient(data)
      setSelectedPatientData([])
    } catch (error) {
      alert("Error deleting record.")
    }
  }

  const searchRow = (event: any) => {
    const { value } = event.target

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
    <div style={{ paddingLeft: '15px' }}>
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
                <TableCell width={"30%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell width={"10%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Age</TableCell>
                <TableCell width={"15%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Diagnosis</TableCell>
                <TableCell width={"10%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Dead</TableCell>
                <TableCell width={"10%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Positive</TableCell>
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
                          <Button className='table-btn' onClick={() => { setSelectedPatientData(row.id); handleOpenViewPatientModal() }}>
                            <Visibility color={row.dead ? 'error' : 'primary'} />
                          </Button>
                        </TableCell>
                        <TableCell align="center" style={row.dead ? { color: 'red' } : { color: 'black' }}>{`${row.first_name} ${row.middle_name} ${row.last_name}`}</TableCell>
                        <TableCell align="center" style={row.dead ? { color: 'red' } : { color: 'black' }}>{row.age}</TableCell>
                        <TableCell align="center" style={row.dead ? { color: 'red' } : { color: 'black' }}>{row.diagnosis}</TableCell>
                        <TableCell align="center" style={row.dead ? { color: 'red' } : { color: 'black' }}>{row.dead ? "Yes" : "No"}</TableCell>
                        <TableCell align="center" style={row.dead ? { color: 'red' } : { color: 'black' }}>{row.positive === 1 ? "Yes" : row.positive === 2 ? "Unknown" : "No"}</TableCell>
                        <TableCell align='center'>
                          <Button color='primary' variant='contained' className='table-btn' onClick={() => { setSelectedPatientData(row.id); handleOpenEditPatientModal() }}>
                            <Edit style={{ color: 'white' }} />
                          </Button>
                          &emsp;
                          <Button color='error' variant='contained' onClick={() => { setSelectedPatientData(row); handleOpenDeletePatientModal() }}>
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
        handleAddPatient={handleAddPatient}
      />

      <ViewPatientRecord
        open={openViewPatientModal}
        handleClose={handleCloseViewPatientModal}
        selectedPatientData={selectedPatientData}
      />

      <EditPatientRecord
        open={openEditPatientModal}
        handleClose={handleCloseEditPatientModal}
        handleEditPatient={handleEditPatient}
        selectedPatientData={selectedPatientData}
      />

      <DeletePatientRecord
        open={openDeletePatientModal}
        handleClose={handleCloseDeletePatientModal}
        handleDeleteAccount={handleDeleteAccount}
        selectedPatientData={selectedPatientData}
      />
    </div>
  )
}

export default PatientRecord;