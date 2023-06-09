import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { DialogContent, DialogActions, Button, TextField, Select, MenuItem } from "@mui/material";
import "../App.css";
import { Municipality } from "../Data/municipality";
import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import Service from "../Service/Service";

interface Props {
  open: boolean,
  handleClose: () => void,
  handleEditPatient: (patientData: object) => void
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
  facility: "",
  positive: 2,
  dead: 0
}

function EditPatientRecord(props: Props) {
  const { open, handleClose, handleEditPatient, selectedPatientData } = props

  const [data, setData] = useState(initialData)
  const [barangay, setBarangay] = useState([])
  const [facility, setFacility] = useState([])

  useEffect(() => {
    handleFacility();
  }, [])

  useEffect(() => {
    handleData()
  }, [selectedPatientData])

  useEffect(() => {
    handleBarangay()
  }, [data.municipality])

  const handleData = async () => {
    try {
      const result: AxiosResponse = await Service.getPatientById(selectedPatientData)
      const { data } = result
      setData(data)
    } catch (error) {
      throw error
    }
  }

  const handleInputs = (event: any) => {
    const { name, value } = event.target

    setData({ ...data, [name]: value })
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

  const handleFacility = async () => {
    try {
      const result: AxiosResponse = await Service.getAllOrganizations()
      const { data } = result

      setFacility(data)
    } catch (error) {
      alert("Error fetching facility.")
    }
  }

  return (
    <BootstrapDialog
      onClose={handleClose}
      open={open}
      id="add_patient"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <span style={{ fontWeight: 'bold' }}>Edit Patient Record</span>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <table>
          <tr>
            <td style={{ width: '9pc' }}>Enter Last Name:</td>
            <td>
              <TextField type="text" className="patient_inputs" name="last_name" value={data.last_name} onChange={handleInputs} />
            </td>
            <td style={{ width: '12pc', paddingLeft: '10px' }}>Enter First Name:</td>
            <td>
              <TextField type="text" className="patient_inputs" name="first_name" value={data.first_name} onChange={handleInputs} />
            </td>
            <td style={{ width: '12pc', paddingLeft: '10px' }}>Enter Middle Name:</td>
            <td>
              <TextField type="text" className="patient_inputs" name="middle_name" value={data.middle_name} onChange={handleInputs} />
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
              <TextField type="date" className="patient_inputs" placeholder="Date Diagnosed" name="date_diagnosed" value={`${new Date(data.date_diagnosed).toLocaleDateString('fr-CA')}`} onChange={handleInputs} />
            </td>
            <td style={{ paddingLeft: '10px' }}>Enter Name of Facility:</td>
            <td>
              <Select
                labelId="facility"
                className="patient_inputs"
                id="facility"
                name="facility"
                value={data.facility}
                label="Facility"
                onChange={handleInputs}
              >
                {
                  facility.map((row: any) => {
                    return (
                      <MenuItem key={row.id} value={row.org_name}>{row.org_name}</MenuItem>
                    )
                  })
                }
              </Select>
            </td>
          </tr>
          <tr>
            <td style={{ paddingTop: '30px' }}>Is Patient Positive?</td>
            <td style={{ paddingTop: '30px' }}>
              <Select
                labelId="positive"
                className="patient_inputs"
                id="positive"
                name="positive"
                value={data.positive}
                label="Positive"
                onChange={handleInputs}
              >
                <MenuItem value={0}>{"No"}</MenuItem>
                <MenuItem value={1}>{"Yes"}</MenuItem>
                <MenuItem value={2}>{"Unknown"}</MenuItem>
              </Select>
            </td>
            <td style={{ paddingLeft: '10px', paddingTop: '30px' }}>Is Patient Dead?</td>
            <td style={{ paddingTop: '30px' }}>
              <Select
                labelId="dead"
                className="patient_inputs"
                id="dead"
                name="dead"
                value={data.dead}
                label="Dead"
                onChange={handleInputs}
              >
                <MenuItem value={0}>{"No"}</MenuItem>
                <MenuItem value={1}>{"Yes"}</MenuItem>
              </Select>
            </td>
          </tr>
        </table>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={() => { handleEditPatient(data); }}>Save</Button>
        <Button color="error" variant="contained" onClick={handleClose} >Cancel</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default EditPatientRecord;