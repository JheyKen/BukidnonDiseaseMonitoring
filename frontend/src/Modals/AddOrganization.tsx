import { useState } from "react";
import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { DialogContent, DialogActions, Button, TextField, Select, MenuItem } from "@mui/material";
import { Municipality } from "../Data/municipality";

interface Props {
  open: boolean,
  handleClose: () => void,
  handleAddOrganization: (orgData: object) => void
}

const initialData = {
  org_name: "",
  org_type: "",
  municipality: ""
}

function AddOrganization(props: Props) {
  const { open, handleClose, handleAddOrganization } = props

  const [data, setData] = useState(initialData)

  const handleInputs = (event: any) => {
    const { name, value } = event.target

    setData({ ...data, [name]: value })
  }

  const handleResetData = () => {
    setData(initialData)
  }

  return (
    <BootstrapDialog
      onClose={handleClose}
      open={open}
      id="change-password"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <span style={{ fontWeight: 'bold' }}>Add Organization</span>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <table>
          <tr>
            <td>Organization Name:</td>
            <td>
              <TextField
                className="edit_inputs"
                placeholder="Organization Name"
                name="org_name"
                id="org_name"
                onChange={handleInputs}
                value={data.org_name}
              />
            </td>
          </tr>
          <tr>
            <td>Organization Type:</td>
            <td>
              <Select
                labelId="type"
                id="org_type"
                name="org_type"
                value={data.org_type}
                label="Type"
                className="edit_inputs"
                onChange={handleInputs}
              >
                <MenuItem value={"Private Hospital"}>{"Private Hospital"}</MenuItem>
                <MenuItem value={"Public Hospital"}>{"Public Hospital"}</MenuItem>
                <MenuItem value={"Barangay Health Center"}>{"Barangay Health Center"}</MenuItem>
              </Select>
            </td>
          </tr>
          <tr>
            <td>Municipality:</td>
            <td>
              <Select
                labelId="municipality"
                id="municipality"
                name="municipality"
                value={data.municipality}
                label="Municipality"
                className="edit_inputs"
                onChange={handleInputs}
              >
                {
                  Municipality.map((row: any) => {
                    return (
                      <MenuItem key={row.id} value={row.name}>{row.name}</MenuItem>
                    )
                  })
                }
              </Select>
            </td>
          </tr>
        </table>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={() => { handleAddOrganization(data); handleResetData(); }}>Save</Button>
        <Button color="error" variant="contained" onClick={() => { handleResetData(); handleClose(); }}>Cancel</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
export default AddOrganization;