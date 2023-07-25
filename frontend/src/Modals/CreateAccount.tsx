import { useState } from "react";
import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { DialogContent, DialogActions, Button, TextField, Select, MenuItem } from "@mui/material";
import Service from "../Service/Service";
import { AxiosResponse } from "axios";

interface Props {
    open: boolean,
    handleClose: () => void
}

function CreateAccount(props: Props) {
    const { open, handleClose } = props

    const [data, setData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        position: "",
        org_name: "",
        username: "",
        password: ""
    })

    const handleInputs = (event: any) => {
        const { name, value } = event.target

        setData({ ...data, [name]: value })
    }

    const handleCreateAccount = async () => {
        try {
            await Service.createAccount(data)
            alert("Successfully created account.")
            handleResetData();
            handleClose();
        } catch (error) {
            alert("Error creating account.")
        }
    }

    const handleResetData = () => {
        setData({
            first_name: "",
            middle_name: "",
            last_name: "",
            position: "",
            org_name: "",
            username: "",
            password: ""
        })
    }

    return (
        <BootstrapDialog
            onClose={() => { handleClose(); handleResetData() }}
            open={open}
            id="create_account"
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={() => { handleClose(); handleResetData() }}>
                <span style={{ fontWeight: 'bold' }}>Create Account</span>
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <table width={'100%'}>
                    <tr>
                        <td width={'30%'}>First Name:</td>
                        <td width={'70%'}>
                            <TextField className="edit_inputs" placeholder="Enter First Name" name="first_name" value={data.first_name} onChange={handleInputs} />
                        </td>
                    </tr>
                    <tr>
                        <td>Middle Name:</td>
                        <td>
                            <TextField className="edit_inputs" placeholder="Enter Middle Name" name="middle_name" value={data.middle_name} onChange={handleInputs} />
                        </td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td>
                            <TextField className="edit_inputs" placeholder="Enter Last Name" name="last_name" value={data.last_name} onChange={handleInputs} />
                        </td>
                    </tr>
                    <tr>
                        <td>Position:</td>
                        <td>
                            <Select
                                labelId="position"
                                id="position"
                                name="position"
                                className="edit_inputs"
                                value={data.position}
                                label="Position"
                                onChange={handleInputs}
                            >
                                <MenuItem value={"Health Worker"}>{"Health Worker"}</MenuItem>
                                <MenuItem value={"CHO Employee"}>{"CHO Employee"}</MenuItem>
                                <MenuItem value={"MHO Employee"}>{"MHO Employee"}</MenuItem>
                                <MenuItem value={"PHO Employee"}>{"PHO Employee"}</MenuItem>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td>Organization:</td>
                        <td>
                            <Select
                                labelId="org_name"
                                id="org_name"
                                name="org_name"
                                className="edit_inputs"
                                value={data.org_name}
                                label="Organization Name"
                                onChange={handleInputs}
                            >
                                <MenuItem value={"Malaybalay Polymedic General Hospital"}>{"Malaybalay Polymedic General Hospital"}</MenuItem>
                                <MenuItem value={"Barangay 9 Health Center"}>{"Barangay 9 Health Center"}</MenuItem>
                                <MenuItem value={"PHO"}>{"PHO"}</MenuItem>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td>Username:</td>
                        <td>
                            <TextField className="edit_inputs" placeholder="Enter Username" name="username" value={data.username} onChange={handleInputs} />
                        </td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td>
                            <TextField type="password" className="edit_inputs" placeholder="Enter Password" name="password" value={data.password} onChange={handleInputs} />
                        </td>
                    </tr>
                </table>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="contained" onClick={handleCreateAccount}>Create</Button>
                <Button color="error" variant="contained" onClick={() => { handleClose(); handleResetData() }}>Cancel</Button>
            </DialogActions>
        </BootstrapDialog>
    );
}

export default CreateAccount;