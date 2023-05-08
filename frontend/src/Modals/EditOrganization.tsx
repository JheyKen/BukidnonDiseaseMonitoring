import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { DialogContent, DialogActions, Button, TextField, Select, MenuItem } from "@mui/material";

interface Props {
  open: boolean,
  handleClose: () => void,
}

function EditOrganization(props: Props) {
  const { open, handleClose } = props
  return (
    <BootstrapDialog
      onClose={handleClose}
      open={open}
      id="change-password"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <span style={{ fontWeight: 'bold' }}>Edit Organization</span>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <table>
          <tr>
            <td>Organization Name:</td>
            <td>
              <TextField placeholder="Organization Name" name="name" />
            </td>
          </tr>
          <tr>
            <td>Organization Type:</td>
            <td>
              <Select
                labelId="type"
                id="type"
                value={''}
                label="Type"
                onChange={() => { }}
              >
                <MenuItem value={"Private Hospital"}>{"Private Hospital"}</MenuItem>
                <MenuItem value={"Public Hospital"}>{"Public Hospital"}</MenuItem>
              </Select>
            </td>
          </tr>
          <tr>
            <td>Municipality:</td>
            <td>
              <Select
                labelId="municipality"
                id="municipality"
                value={''}
                label="Municipality"
                onChange={() => { }}
              >
                <MenuItem value={"Valencia"}>{"Valencia"}</MenuItem>
                <MenuItem value={"Malaybalay"}>{"Barangay 2"}</MenuItem>
              </Select>
            </td>
          </tr>
          <tr>
            <td>Barangay:</td>
            <td>
              <Select
                labelId="barangay"
                id="barangay"
                value={''}
                label="Barangay"
                onChange={() => { }}
              >
                <MenuItem value={"Barangay 1"}>{"Barangay 1"}</MenuItem>
                <MenuItem value={"Barangay 2"}>{"Barangay 2"}</MenuItem>
              </Select>
            </td>
          </tr>
          <tr>
            <td>Complete Address:</td>
            <td>
              <TextField placeholder="Complete Address" name="complete-address" />
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
export default EditOrganization;