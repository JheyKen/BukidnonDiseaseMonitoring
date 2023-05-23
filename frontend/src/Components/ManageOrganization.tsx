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
import { AddOrganization, DeleteOrganization, EditOrganization, ViewOrganization } from "../Modals";
import { AxiosResponse } from "axios";
import Service from "../Service/Service";

function ManageOrganization() {
  const rows: number = 4;

  const [allOrganizations, setAllOrganizations] = useState([])
  const [searchedRows, setSearchedRows] = useState([])
  const [page, setPage] = useState(0);
  const [selectedOrg, setSelectedOrg] = useState({})
  const [addOrganization, setAddOrganization] = useState([])
  const [editOrganization, setEditOrganization] = useState([])
  const [deleteOrganization, setDeleteOrganization] = useState([])
  const [openAddOrganizationModal, setOpenAddOrganizationModal] = useState(false);
  const [openViewOrganizationModal, setOpenViewOrganizationModal] = useState(false);
  const [openEditOrganizationModal, setOpenEditOrganizationModal] = useState(false);
  const [openDeleteOrganizationModal, setOpenDeleteOrganizationModal] = useState(false);

  useEffect(() => {
    handleAllOrganizations();
  }, [addOrganization, editOrganization, deleteOrganization])

  const handleAllOrganizations = async () => {
    try {
      const result: AxiosResponse = await Service.getAllOrganizations()
      const { data } = result
      setAllOrganizations(data)
      setSearchedRows(data)
    } catch (error) {
      alert("Error fetching organizations.")
    }
  }

  const handleAddOrganization = async (orgData: object) => {
    try {
      const result: AxiosResponse = await Service.addOrganization(orgData)
      const { data } = result

      if (!data.error) {
        alert("Successfully created organization.")

        setAddOrganization(data)
        setOpenAddOrganizationModal(false);
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert("Error creating organization.")
    }
  }

  const handleEditOrganization = async (id: string, orgData: object) => {
    try {
      const result: AxiosResponse = await Service.editOrganization(id, orgData)
      const { data } = result
      alert("Successfully edited organization.")

      setEditOrganization(data)
      setOpenEditOrganizationModal(false);
      setSelectedOrg([])
    } catch (error) {
      alert("Error editing record.")
    }
  }

  const handleDeleteOrganization = async (id: string) => {
    try {
      const result: AxiosResponse = await Service.deleteOrganization(id);
      const { data } = result
      alert("Successfully deleted organization.")

      setOpenDeleteOrganizationModal(false);
      setDeleteOrganization(data)
      setSelectedOrg([])
    } catch (error) {
      alert("Error deleting record.")
    }
  }

  const searchRow = (event: any) => {
    const { value } = event.target

    if (!value || value === '') {
      setSearchedRows(allOrganizations)
    }
    else {
      const filterRow = allOrganizations.filter((row: any) => {
        return row.name.toLowerCase().includes(value.toLowerCase())
      })
      setSearchedRows(filterRow)
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleOpenAddOrganizationModal = () => {
    setOpenAddOrganizationModal(true);
  }

  const handleCloseAddOrganizationModal = () => {
    setOpenAddOrganizationModal(false);
  }

  const handleOpenViewOrganizationModal = () => {
    setOpenViewOrganizationModal(true);
  }

  const handleCloseViewOrganizationModal = () => {
    setOpenViewOrganizationModal(false);
  }

  const handleOpenEditOrganizationModal = () => {
    setOpenEditOrganizationModal(true);
  }

  const handleCloseEditOrganizationModal = () => {
    setOpenEditOrganizationModal(false);
  }

  const handleOpenDeleteOrganizationModal = () => {
    setOpenDeleteOrganizationModal(true);
  }

  const handleCloseDeleteOrganizationModal = () => {
    setOpenDeleteOrganizationModal(false);
  }

  return (
    <div style={{ paddingLeft: '15px' }}>
      <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
        <span style={{ fontSize: '30px', fontWeight: 'bold' }}>Manage Organization</span>
      </div>

      <div className='row'>
        <div style={{ verticalAlign: 'middle', paddingTop: '10px' }}>
          <Button
            className="upper-btn"
            color="primary"
            variant="contained"
            onClick={handleOpenAddOrganizationModal}
          >
            Add Organization
          </Button>
        </div>
        <div>
          <Paper elevation={5} className='search-bar-paper'>
            <TextField
              id='search-bar'
              placeholder="Search Organization"
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
                <TableCell width={"30%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell width={"20%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Type</TableCell>
                <TableCell width={"20%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Municipality</TableCell>
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
                        <TableCell align="center">{row.org_name}</TableCell>
                        <TableCell align="center">{row.org_type}</TableCell>
                        <TableCell align="center">{row.municipality}</TableCell>
                        <TableCell align='center'>
                          <Button color='primary' variant='contained' className='table-btn' onClick={() => { setSelectedOrg(row.id); handleOpenEditOrganizationModal(); }}>
                            <Edit style={{ color: 'white' }} />
                          </Button>
                          &emsp;
                          <Button color='error' variant='contained' onClick={() => { setSelectedOrg(row); handleOpenDeleteOrganizationModal(); }}>
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

      <AddOrganization
        open={openAddOrganizationModal}
        handleClose={handleCloseAddOrganizationModal}
        handleAddOrganization={handleAddOrganization}
      />

      <ViewOrganization
        open={openViewOrganizationModal}
        handleClose={handleCloseViewOrganizationModal}
      />

      <EditOrganization
        open={openEditOrganizationModal}
        handleClose={handleCloseEditOrganizationModal}
        selectedOrganization={selectedOrg}
        handleEditOrganization={handleEditOrganization}
      />

      <DeleteOrganization
        open={openDeleteOrganizationModal}
        handleClose={handleCloseDeleteOrganizationModal}
        selectedOrganization={selectedOrg}
        handleDeleteOrganization={handleDeleteOrganization}
      />
    </div>
  );
}

export default ManageOrganization;