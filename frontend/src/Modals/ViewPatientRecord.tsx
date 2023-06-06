import { useEffect, useState } from "react";
import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { DialogContent, DialogActions, Button } from "@mui/material";
import { AxiosResponse } from "axios";
import Service from "../Service/Service";

interface Props {
  open: boolean,
  handleClose: () => void,
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
  date_diagnosed: "",
  dead: 0,
  facility: ""
}

function ViewPatientRecord(props: Props) {
  const { open, handleClose, selectedPatientData } = props

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

  return (
    <BootstrapDialog
      onClose={handleClose}
      open={open}
      id="view_patient"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <span style={{ fontWeight: 'bold' }}>
          {`${data.first_name} ${data.middle_name} ${data.last_name}`}
          &emsp;&emsp;
          {!data.dead ? '' :
            <span>Dead</span>
          }
        </span>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <table width={'100%'}>
          <tr>
            <td style={{ width: '7pc', fontWeight: 'bold' }}>Last Name:</td>
            <td style={{ width: '7pc' }}>{data.last_name}</td>
            <td style={{ width: '10pc', paddingLeft: '10px', fontWeight: 'bold' }}>First Name:</td>
            <td style={{ width: '7pc' }}>{data.first_name} </td>
            <td style={{ width: '10pc', paddingLeft: '10px', fontWeight: 'bold' }}>Middle Name:</td>
            <td style={{ width: '9pc' }}>{data.middle_name}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold', paddingTop: '20px' }}>Gender:</td>
            <td style={{ paddingTop: '20px' }}>{data.gender}</td>
            <td style={{ paddingLeft: '10px', fontWeight: 'bold', paddingTop: '20px' }}>Date of Birth:</td>
            <td style={{ paddingTop: '20px' }}>{`${new Date(data.date_of_birth).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}`}</td>
            <td style={{ paddingLeft: '10px', fontWeight: 'bold', paddingTop: '20px' }}>Civil Status:</td>
            <td style={{ paddingTop: '20px' }}>{data.civil_status}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold', paddingTop: '20px' }}>Municipality Address:</td>
            <td style={{ paddingTop: '20px' }}>{data.municipality}</td>
            <td style={{ paddingLeft: '10px', fontWeight: 'bold', paddingTop: '20px' }}>Barangay Address:</td>
            <td style={{ paddingTop: '20px' }}>{data.barangay}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold', paddingTop: '20px' }}>Diagnosis:</td>
            <td style={{ paddingTop: '20px' }}>{data.diagnosis}</td>
            <td style={{ paddingLeft: '10px', fontWeight: 'bold', paddingTop: '20px' }}>Date Diagnosed:</td>
            <td style={{ paddingTop: '20px' }}>{`${new Date(data.date_diagnosed).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}`}</td>
            <td style={{ paddingLeft: '10px', fontWeight: 'bold', paddingTop: '20px' }}>Name of Facility:</td>
            <td style={{ paddingTop: '20px' }}>{data.facility}</td>
          </tr>
        </table>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained">Close</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default ViewPatientRecord;