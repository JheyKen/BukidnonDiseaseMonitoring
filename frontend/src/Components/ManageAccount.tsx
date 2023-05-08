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
import { DeleteAccount, EditAccount, VerifyAccount, ViewAccount } from "../Modals";
import { AxiosResponse } from "axios";
import Service from "../Service/Service";
import { localStorageValues } from "../App";

function ManageAccount() {
  const rows: number = 4;

  const [allVerifiedAccounts, setAllVerifiedAccounts] = useState([]) //holds all verified accounts
  const [allPendingAccounts, setAllPendingAccounts] = useState([]) //holds all accounts with pending status
  const [selectedAccountData, setSelectedAccountData] = useState({}) //holds the data of the account to be edited/view/deleted
  const [editAccount, setEditAccount] = useState([]) // holds the return data when editing
  const [deleteAccount, setDeleteAccount] = useState([]) // holds the return data when deleting
  const [searchedRows, setSearchedRows] = useState([])
  const [page, setPage] = useState(0);
  const [openVerifyAccountModal, setOpenVerifyAccountModal] = useState(false)
  const [openViewAccountModal, setOpenViewAccountModal] = useState(false)
  const [openEditAccountModal, setOpenEditAccountModal] = useState(false)
  const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false)

  useEffect(() => {
    handleAllVerifiedAccounts();
    handleAllPendingAccounts();
  }, [editAccount, deleteAccount])

  const handleAllVerifiedAccounts = async () => {
    try {
      const result: AxiosResponse = await Service.getAllVerifiedAccounts()
      const { data } = result
      setAllVerifiedAccounts(data)
      setSearchedRows(data)
    } catch (error) {
      alert("Error fetching accounts.")
    }
  }

  const handleAllPendingAccounts = async () => {
    try {
      const result: AxiosResponse = await Service.getAllPendingAccounts()
      const { data } = result
      setAllPendingAccounts(data)
    } catch (error) {
      alert("Error fetching accounts.")
    }
  }

  const handleAccountData = async (dataSelected: any) => {
    setSelectedAccountData(dataSelected)
  }

  const handleEditAccount = async (username: string, editParam: object) => {
    try {
      const result: AxiosResponse = await Service.editAccount(username, editParam);
      const { data } = result
      setEditAccount(data)
      setSelectedAccountData([])
      setOpenEditAccountModal(false);
    } catch (error) {
      alert("Error editing account.")
    }
  }

  const handleDeleteAccount = async (username: string) => {
    try {
      const result: AxiosResponse = await Service.deleteAccount(username);
      const { data } = result
      setOpenDeleteAccountModal(false);
      setDeleteAccount(data)
      setSelectedAccountData([])
    } catch (error) {
      alert("Error deleting account.")
    }
  }

  const searchRow = (event: any) => {
    const { value } = event.target;

    if (!value || value === '') {
      setSearchedRows(allVerifiedAccounts)
    }
    else {
      const filterRow = allVerifiedAccounts.filter((row: any) => {
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

  const handleOpenVerifyAccountModal = () => {
    setOpenVerifyAccountModal(true);
  }

  const handleCloseVerifyAccountModal = () => {
    setOpenVerifyAccountModal(false);
  }

  const handleOpenViewAccountModal = () => {
    setOpenViewAccountModal(true);
  }

  const handleCloseViewAccountModal = () => {
    setOpenViewAccountModal(false);
  }

  const handleOpenEditAccountModal = () => {
    setOpenEditAccountModal(true);
  }

  const handleCloseEditAccountModal = () => {
    setSelectedAccountData([])
    setOpenEditAccountModal(false);
  }

  const handleOpenDeleteAccountModal = () => {
    setSelectedAccountData([])
    setOpenDeleteAccountModal(true);
  }

  const handleCloseDeleteAccountModal = () => {
    setOpenDeleteAccountModal(false);
  }

  return (
    <div style={{ paddingLeft: '15px' }}>
      <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
        <span style={{ fontSize: '30px', fontWeight: 'bold' }}>Manage Account</span>
      </div>

      <div className='row'>
        <div style={{ verticalAlign: 'middle', paddingTop: '10px' }}>
          <Button
            className="upper-btn"
            color="primary"
            variant="contained"
            onClick={handleOpenVerifyAccountModal}
          >
            Verify Account
          </Button>
        </div>
        <div>
          <Paper elevation={5} className='search-bar-paper'>
            <TextField
              id='search-bar'
              placeholder="Search Name"
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
                <TableCell width={"25%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell width={"20%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Position</TableCell>
                <TableCell width={"20%"} align="center" style={{ color: 'white', fontWeight: 'bold' }}>Organization</TableCell>
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
                          <Button className='table-btn' onClick={handleOpenViewAccountModal}>
                            <Visibility color='primary' />
                          </Button>
                        </TableCell>
                        <TableCell align="center">{`${row.first_name} ${row.middle_name} ${row.last_name}`}</TableCell>
                        <TableCell align="center">{row.position}</TableCell>
                        <TableCell align="center">{row.org_name}</TableCell>
                        <TableCell align='center'>
                          <Button color='primary' variant='contained' className='table-btn' onClick={() => { handleAccountData(row.username); handleOpenEditAccountModal() }}>
                            <Edit style={{ color: 'white' }} />
                          </Button>
                          {
                            localStorageValues('username') === row.username ? '' :
                              <>
                                &emsp;
                                <Button color='error' variant='contained' onClick={() => { handleAccountData(row); handleOpenDeleteAccountModal() }}>
                                  <Delete style={{ color: 'white' }} />
                                </Button>
                              </>
                          }
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

      <VerifyAccount
        open={openVerifyAccountModal}
        handleClose={handleCloseVerifyAccountModal}
        allPendingAccounts={allPendingAccounts}
        handleEditAccount={handleEditAccount}
      />

      <ViewAccount
        open={openViewAccountModal}
        handleClose={handleCloseViewAccountModal}
      />

      <EditAccount
        open={openEditAccountModal}
        handleClose={handleCloseEditAccountModal}
        selectedAccountData={selectedAccountData}
        handleEditAccount={handleEditAccount}
      />

      <DeleteAccount
        open={openDeleteAccountModal}
        handleClose={handleCloseDeleteAccountModal}
        selectedAccountData={selectedAccountData}
        handleDeleteAccount={handleDeleteAccount}
      />
    </div>
  );
}

export default ManageAccount;