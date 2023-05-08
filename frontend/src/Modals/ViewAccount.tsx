import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { DialogContent, DialogActions, Button } from "@mui/material";

interface Props {
  open: boolean,
  handleClose: () => void,
}

function ViewAccount(props: Props) {
  const { open, handleClose } = props

  return (
    <BootstrapDialog
      onClose={handleClose}
      open={open}
      id="change-password"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <span style={{ fontWeight: 'bold' }}>View Account</span>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <table>
          <tr>
            <td>Full Name:</td>
            <td>
              Full Name Here
            </td>
          </tr>
          <tr>
            <td>Position:</td>
            <td>
              Position Here
            </td>
          </tr>
          <tr>
            <td>Organization:</td>
            <td>Organization Here</td>
          </tr>
        </table>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained">Close</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default ViewAccount;