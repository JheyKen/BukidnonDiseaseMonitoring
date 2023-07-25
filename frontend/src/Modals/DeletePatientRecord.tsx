import { BootstrapDialog } from "./BootstrapDialog";
import { DialogContent, DialogActions, Button } from "@mui/material";

interface Props {
  open: boolean,
  handleClose: () => void,
  handleDeleteAccount: (id: string) => void,
  selectedPatientData: any
}

function DeletePatientRecord(props: Props) {
  const { open, handleClose, handleDeleteAccount, selectedPatientData } = props;
  const { first_name, last_name, id } = selectedPatientData

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      id="delete"
    >
      <DialogContent dividers>
        <div>
          <label htmlFor="medicine-description">Are you sure you want to delete <b>{`${first_name} ${last_name}`}</b>?</label>
        </div>
      </DialogContent>
      <DialogActions>
        <Button className="cancel-btn-modal" color='error' variant='contained' onClick={() => { handleDeleteAccount(id) }}>Delete</Button>
        &nbsp;
        <Button className="save-btn-modal" color="success" variant="contained" onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default DeletePatientRecord;