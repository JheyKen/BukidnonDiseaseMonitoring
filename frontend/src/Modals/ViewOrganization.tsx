import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { DialogContent, DialogActions, Button } from "@mui/material";

interface Props {
  open: boolean,
  handleClose: () => void,
}

function ViewOrganization(props: Props) {
  const { open, handleClose } = props

  return (
    <BootstrapDialog
      onClose={handleClose}
      open={open}
      id="change-password"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <span style={{ fontWeight: 'bold' }}>View Organization</span>
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
            <td>Type:</td>
            <td>
              Type Here
            </td>
          </tr>
          <tr>
            <td>Address:</td>
            <td>Address Here</td>
          </tr>
        </table>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained">Close</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default ViewOrganization;