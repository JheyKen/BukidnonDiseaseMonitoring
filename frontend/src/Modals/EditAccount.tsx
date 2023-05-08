import { useState } from "react";
import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { DialogContent, DialogActions, Button, TextField, Select, MenuItem } from "@mui/material";

interface Props {
  open: boolean,
  handleClose: () => void,
  selectedAccountData: any
  handleEditAccount: (username: string, editParam: object) => void
}

function EditAccount(props: Props) {
  const { open, handleClose, selectedAccountData, handleEditAccount } = props
  const { first_name, middle_name, last_name, org_name, position} = selectedAccountData

  console.log(selectedAccountData)

  const [editData, setEditData] = useState(selectedAccountData)

  const handleInputs = (event: any) => {
    const { name, value } = event.target

    setEditData({ ...editData, [name]: value })
    console.log(editData)
  }

  return (
    <BootstrapDialog
      onClose={handleClose}
      open={open}
      id="edit_account"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <span style={{ fontWeight: 'bold' }}>Edit Account</span>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <table width={'100%'}>
          <tr>
            <td width={'30%'}>First Name:</td>
            <td width={'70%'}>
              <TextField className="edit_inputs" placeholder="Enter First Name" name="first_name" value={editData.first_name} onChange={handleInputs} />
            </td>
          </tr>
          <tr>
            <td>Middle Name:</td>
            <td>
              <TextField className="edit_inputs" placeholder="Enter Middle Name" name="middle_name" value={editData.middle_name} onChange={handleInputs} />
            </td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>
              <TextField className="edit_inputs" placeholder="Enter Last Name" name="last_name" value={editData.last_name} onChange={handleInputs} />
            </td>
          </tr>
          <tr>
            <td>Position:</td>
            <td>
              <TextField className="edit_inputs" placeholder="Enter Position" name="position" value={editData.position} onChange={handleInputs} />
            </td>
          </tr>
          <tr>
            <td>Organization:</td>
            <td>
              <Select
                labelId="org_name"
                id="org_name"
                className="edit_inputs"
                value={editData.org_name}
                label="Organization Name"
                onChange={handleInputs}
              >
                <MenuItem value={"Malaybalay Polymedic General Hospital"}>{"Malaybalay Polymedic General Hospital"}</MenuItem>
                <MenuItem value={"Barangay 9 Health Center"}>{"Barangay 9 Health Center"}</MenuItem>
                <MenuItem value={"PHO"}>{"PHO"}</MenuItem>
              </Select>
            </td>
          </tr>
        </table>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={() => {}}>Save</Button>
        <Button color="error" variant="contained">Cancel</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default EditAccount;