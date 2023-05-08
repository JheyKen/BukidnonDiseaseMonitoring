import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { DialogContent, DialogActions, Button, TextField, Select, MenuItem } from "@mui/material";

interface Props {
  open: boolean,
  handleClose: () => void,
}

function AddPatientRecord(props: Props) {
  const { open, handleClose } = props

  return (
    <BootstrapDialog
      onClose={handleClose}
      open={open}
      id="change-password"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <span style={{ fontWeight: 'bold' }}>Add Patient Record</span>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <table>
          <tr>
            <td>Enter Full Name:</td>
            <td>
              <TextField type="text" placeholder="Full Name" name="full-name" />
            </td>
          </tr>
          <tr>
            <td>Enter Age:</td>
            <td>
              <TextField type="number" placeholder="Age" name="age" />
            </td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>
              <Select
                labelId="gender"
                id="gender"
                value={''}
                label="Gender"
                onChange={() => { }}
              >
                <MenuItem value={"Male"}>{"Male"}</MenuItem>
                <MenuItem value={"Female"}>{"Female"}</MenuItem>
              </Select>
            </td>
          </tr>
          <tr>
            <td>Diagnosis:</td>
            <td>
              <Select
                labelId="diagnosis"
                id="diagnosis"
                value={''}
                label="Diagnosis"
                onChange={() => { }}
              >
                <MenuItem value={"Dengue"}>{"Dengue"}</MenuItem>
                <MenuItem value={"Influenza"}>{"Influenza"}</MenuItem>
                <MenuItem value={"Typhoid"}>{"Typhoid"}</MenuItem>
              </Select>
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

export default AddPatientRecord;