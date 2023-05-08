import { useState } from 'react';
import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import {
  DialogContent,
  DialogActions,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from "@mui/material";
import { CheckCircle, Cancel } from '@mui/icons-material';

interface Props {
  open: boolean,
  handleClose: () => void,
  allPendingAccounts: any
  handleEditAccount: (username: string, editParam: object) => void
}

function VerifyAccount(props: Props) {
  const { open, handleClose, allPendingAccounts, handleEditAccount } = props
  const rows: number = 4;

  const [page, setPage] = useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      open={open}
      id="verify_account"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <span style={{ fontWeight: 'bold' }}>Verify Account</span>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#115293' }}>
                <TableCell align="center" style={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell align="center" style={{ color: 'white', fontWeight: 'bold' }}>Organization</TableCell>
                <TableCell align="center" style={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {
                allPendingAccounts.slice(page * rows, page * rows + rows).map((row: any) => {
                  return (
                    <TableRow hover key={row.id}>
                      <TableCell align="center">{`${row.first_name} ${row.middle_name} ${row.last_name}`}</TableCell>
                      <TableCell align="center">{row.org_name}</TableCell>
                      <TableCell align='center'>
                        <Button color='primary' variant='contained' className='table-btn' onClick={() => {handleEditAccount(row.username, {status: "verified"})}}>
                          <CheckCircle style={{ color: 'white' }} />
                        </Button>
                        &emsp;
                        <Button color='error' variant='contained' onClick={() => {handleEditAccount(row.username, {status: "declined"})}}>
                          <Cancel style={{ color: 'white' }} />
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
          count={allPendingAccounts.length}
          rowsPerPage={rows}
          page={page}
          onPageChange={handleChangePage}
        />
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default VerifyAccount;