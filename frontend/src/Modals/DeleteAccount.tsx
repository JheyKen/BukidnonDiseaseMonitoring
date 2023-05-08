import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { DialogContent, DialogActions, Button, TextField, TextareaAutosize } from "@mui/material";

interface Props {
  open: boolean,
  handleClose: () => void
}

function DeleteAccount(props: Props) {
  const { open, handleClose } = props;

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      id="delete"
    >

      <DialogContent dividers>
        <div>
          <label htmlFor="medicine-description">Are you sure you want to delete *name*?</label><br></br>
        </div>
      </DialogContent>
      <DialogActions>
        <Button className="cancel-btn-modal" color='error' variant='contained' onClick={() => { }}>Delete</Button>
        &nbsp;
        <Button className="save-btn-modal" color="success" variant="contained" onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default DeleteAccount;