import { BootstrapDialog } from "./BootstrapDialog";
import { DialogContent, DialogActions, Button } from "@mui/material";

interface Props {
  open: boolean,
  handleClose: () => void,
  selectedOrganization: any,
  handleDeleteOrganization: (id: string) => void
}

function DeleteOrganization(props: Props) {
  const { open, handleClose, selectedOrganization, handleDeleteOrganization } = props;

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      id="delete"
    >

      <DialogContent dividers>
        <div>
          <label htmlFor="medicine-description">Are you sure you want to delete <b>{selectedOrganization.org_name}</b>?</label>
        </div>
      </DialogContent>
      <DialogActions>
        <Button className="cancel-btn-modal" color='error' variant='contained' onClick={() => { handleDeleteOrganization(selectedOrganization.id) }}>Delete</Button>
        &nbsp;
        <Button className="save-btn-modal" color="success" variant="contained" onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default DeleteOrganization;