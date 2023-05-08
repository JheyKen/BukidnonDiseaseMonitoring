import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { DialogContent, DialogActions, Button, TextField } from "@mui/material";

interface Props {
  open: boolean,
  handleClose: () => void,
}

function ChangePassword(props: Props) {
  const { open, handleClose } = props
  return (
    <BootstrapDialog
      onClose={handleClose}
      open={open}
      id="change-password"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <span style={{ fontWeight: 'bold' }}>Change Password</span>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <table>
          <tr>
            <td>Enter Current Password:</td>
            <td>
              <TextField type="password" placeholder="Current Password" name="current-password" />
            </td>
          </tr>
          <tr>
            <td>Enter New Password:</td>
            <td>
              <TextField type="password" placeholder="New Password" name="new-password" />
            </td>
          </tr>
          <tr>
            <td>Confirm New Password:</td>
            <td>
              <TextField type="password" placeholder="Confirm Password" name="confirm-password" />
            </td>
          </tr>
        </table>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained">Save</Button>
        <Button color="error" variant="contained">Cancel</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default ChangePassword;