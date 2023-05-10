import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { DialogContent, DialogActions, Button, TextField, Select, MenuItem } from "@mui/material";
import "../App.css";

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
      id="add_patient"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <span style={{ fontWeight: 'bold' }}>Add Patient Record</span>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <table>
          <tr>
            <td>Enter Last Name:</td>
            <td>
              <TextField type="text" placeholder="Last Name" name="last-name" />
            </td>
            <td>Enter First Name:</td>
            <td>
              <TextField type="text" placeholder="First Name" name="first-name" />
            </td>
            <td>Enter Middle Name:</td>
            <td>
              <TextField type="text" placeholder="Middle Name" name="middle-name" />
            </td>
          </tr>
          <tr>
            <td>Enter Gender:</td>
            <td>
              <Select
                labelId="gender"
                id="gender"
                name="gender"
                value={''}
                label="Gender"
                onChange={() => { }}
              >
                <MenuItem value={"Male"}>{"Male"}</MenuItem>
                <MenuItem value={"Female"}>{"Female"}</MenuItem>
              </Select>
            </td>
            <td>Enter Date of Birth:</td>
            <td>
              <TextField type="date" placeholder="Date of Birth" name="date_of_birth" />
            </td>
            <td>Enter Civil Status:</td>
            <td>
              <Select
                labelId="civil_status"
                id="civil_status"
                value={''}
                label="Civil Status"
                onChange={() => { }}
              >
                <MenuItem value={"Dengue"}>{"Dengue"}</MenuItem>
                <MenuItem value={"Influenza"}>{"Influenza"}</MenuItem>
                <MenuItem value={"Typhoid"}>{"Typhoid"}</MenuItem>
              </Select>
            </td>
          </tr>
          <tr>
            <td>Enter Municipality Address:</td>
            <td>
              <Select
                labelId="municipality"
                id="municipality"
                name="municipality"
                value={''}
                label="Municipality"
                onChange={() => { }}
              >
                <MenuItem value={"Dengue"}>{"Dengue"}</MenuItem>
                <MenuItem value={"Influenza"}>{"Influenza"}</MenuItem>
                <MenuItem value={"Typhoid"}>{"Typhoid"}</MenuItem>
              </Select>
            </td>
            <td>Enter Barangay Address:</td>
            <td>
              <Select
                labelId="barangay"
                id="barangay"
                name="barangay"
                value={''}
                label="Barangay"
                onChange={() => { }}
              >
                <MenuItem value={"Dengue"}>{"Dengue"}</MenuItem>
                <MenuItem value={"Influenza"}>{"Influenza"}</MenuItem>
                <MenuItem value={"Typhoid"}>{"Typhoid"}</MenuItem>
              </Select>
            </td>
          </tr>
          <tr>
            <td>Enter Diagnosis:</td>
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
            <td>Enter Date Diagnosed:</td>
            <td><TextField type="date" placeholder="Date Diagnosed" name="date_diagnosed" /></td>
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