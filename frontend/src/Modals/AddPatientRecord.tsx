import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { DialogContent, DialogActions, Button, TextField, Select, MenuItem } from "@mui/material";
import "../App.css";
import { Municipality } from "../Data/municipality";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import Service from "../Service/Service";

interface Props {
  open: boolean,
  handleClose: () => void,
  handleAddPatient: (patientData: object) => void
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

function AddPatientRecord(props: Props) {
  const { open, handleClose, handleAddPatient } = props

  const [data, setData] = useState(initialData)
  const [barangay, setBarangay] = useState([])

  useEffect(() => {
    handleBarangay();
  }, [data.municipality])

  const handleInputs = (event: any) => {
    const { name, value } = event.target

    setData({ ...data, [name]: value })
  }

  const handleResetData = () => {
    setData(initialData)
  }

  const handleBarangay = async () => {
    try {
      if (data.municipality) {
        const result: AxiosResponse = await Service.getBarangayPerMunicipality(data.municipality)
        const { data: resultData } = result
        setBarangay(resultData)
      } else {
        //Do nothing
      }
    } catch (error) {
      alert("Error fetching barangay.")
    }
  }

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
            <td style={{ width: '9pc' }}>Enter Last Name:</td>
            <td>
              <TextField type="text" className="patient_inputs" placeholder="Last Name" name="last_name" value={data.last_name} onChange={handleInputs} />
            </td>
            <td style={{ width: '12pc', paddingLeft: '10px' }}>Enter First Name:</td>
            <td>
              <TextField type="text" className="patient_inputs" placeholder="First Name" name="first_name" value={data.first_name} onChange={handleInputs} />
            </td>
            <td style={{ width: '12pc', paddingLeft: '10px' }}>Enter Middle Name:</td>
            <td>
              <TextField type="text" className="patient_inputs" placeholder="Middle Name" name="middle_name" value={data.middle_name} onChange={handleInputs} />
            </td>
          </tr>
          <tr>
            <td>Enter Gender:</td>
            <td>
              <Select
                labelId="gender"
                className="patient_inputs"
                id="gender"
                name="gender"
                value={data.gender}
                label="Gender"
                onChange={handleInputs}
              >
                <MenuItem value={"Male"}>{"Male"}</MenuItem>
                <MenuItem value={"Female"}>{"Female"}</MenuItem>
              </Select>
            </td>
            <td style={{ paddingLeft: '10px' }}>Enter Date of Birth:</td>
            <td>
              <TextField type="date" className="patient_inputs" placeholder="Date of Birth" name="date_of_birth" value={data.date_of_birth} onChange={handleInputs} />
            </td>
            <td style={{ paddingLeft: '10px' }}>Enter Civil Status:</td>
            <td>
              <Select
                labelId="civil_status"
                className="patient_inputs"
                id="civil_status"
                name="civil_status"
                value={data.civil_status}
                label="Civil Status"
                onChange={handleInputs}
              >
                <MenuItem value={"Single"}>{"Single"}</MenuItem>
                <MenuItem value={"Married"}>{"Married"}</MenuItem>
                <MenuItem value={"Divorced"}>{"Divorced"}</MenuItem>
                <MenuItem value={"Widow"}>{"Widow"}</MenuItem>
              </Select>
            </td>
          </tr>
          <tr>
            <td>Enter Municipality Address:</td>
            <td>
              <Select
                labelId="municipality"
                className="patient_inputs"
                id="municipality"
                name="municipality"
                value={data.municipality}
                label="Municipality"
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
            <td style={{ paddingLeft: '10px' }}>Enter Barangay Address:</td>
            <td>
              <Select
                labelId="barangay"
                className="patient_inputs"
                id="barangay"
                name="barangay"
                value={data.barangay}
                label="Barangay"
                onChange={handleInputs}
              >
                {
                  barangay.map((row: any) => {
                    return (
                      <MenuItem key={row.id} value={row.barangay}>{row.barangay}</MenuItem>
                    )
                  })
                }
              </Select>
            </td>
          </tr>
          <tr>
            <td>Enter Diagnosis:</td>
            <td>
              <Select
                labelId="diagnosis"
                className="patient_inputs"
                id="diagnosis"
                name="diagnosis"
                value={data.diagnosis}
                label="Diagnosis"
                onChange={handleInputs}
              >
                <MenuItem value={"Dengue"}>{"Dengue"}</MenuItem>
                <MenuItem value={"Influenza"}>{"Influenza"}</MenuItem>
                <MenuItem value={"Typhoid"}>{"Typhoid"}</MenuItem>
              </Select>
            </td>
            <td style={{ paddingLeft: '10px' }}>Enter Date Diagnosed:</td>
            <td>
              <TextField type="date" className="patient_inputs" placeholder="Date Diagnosed" name="date_diagnosed" value={data.date_diagnosed} onChange={handleInputs} />
            </td>
          </tr>
        </table>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={() => { handleAddPatient(data); handleResetData() }}>Add</Button>
        <Button color="error" variant="contained" onClick={handleClose} >Cancel</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default AddPatientRecord;