import { useEffect, useState } from "react";
import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { DialogContent, DialogActions, Button, TextField, TextareaAutosize } from "@mui/material";
import { AxiosResponse } from "axios";
import Service from "../Service/Service";

interface Props {
  open: boolean,
  handleClose: () => void,
  handleEditPatient: (patientData: any) => void,
  selectedPatientData: any
}

const initialData = {
  last_name: "",
  first_name: "",
  middle_name: "",
  gender: "",
  date_of_birth: "",
  civil_status: "",
  municipality: "",
  barangay: "",
  diagnosis: "",
  date_diagnosed: ""
}

function PersonDead(props: Props) {
  const { open, handleClose, handleEditPatient, selectedPatientData } = props;

  const [data, setData] = useState(initialData)

  useEffect(() => {
    handleData()
  }, [selectedPatientData])

  const handleData = async () => {
    try {
      const result: AxiosResponse = await Service.getPatientById(selectedPatientData)
      const { data } = result
      setData(data)
    } catch (error) {
      throw error
    }
  }

  const handleDeadPatient = () => {
    handleEditPatient({
      ...data,
      dead: 1
    })
  }

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      id="delete"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <span style={{ fontWeight: 'bold' }}>Mark as Dead</span>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <div>
          <label htmlFor="medicine-description">
            Marking <b>{`${data.first_name} ${data.last_name}`}</b> as dead. You cannot undo the changes you've made. Are you sure you want to continue?
          </label>
        </div>
      </DialogContent>
      <DialogActions>
        <Button className="cancel-btn-modal" color='error' variant='contained' onClick={handleDeadPatient}>Yes</Button>
        &nbsp;
        <Button className="save-btn-modal" color="success" variant="contained" onClick={handleClose}>No</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default PersonDead;