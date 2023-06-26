import { ChangeEvent, FormEvent, useState } from 'react';
import '../App.css';
import { Grid, Button, Paper, TextField } from "@mui/material";
import CreateAccount from '../Modals/CreateAccount';
import { useHistory } from "react-router-dom";

const paperStyle = { padding: '10px 20px 20px 20px', height: 380, width: 300, margin: "10px auto" }
const marginStyle = { margin: '8px 0' }
const btnStyle = { margin: '30px 0', backgroundColor: '#115293', color: 'white' }

interface Props {
  username: string,
  password: string,
  handleLogin: () => void,
  handleLoginInputs: (e: ChangeEvent<HTMLInputElement>) => void
  handlePublicView: () => void
}

function Login(props: Props) {
  const { username, password, handleLogin, handleLoginInputs, handlePublicView } = props
  let history = useHistory();

  const [openCreateAccountModal, setOpenCreateAccountModal] = useState(false)

  const handleOpenCreateAccountModal = () => {
    setOpenCreateAccountModal(true);
  }

  const handleCloseCreateAccountModal = () => {
    setOpenCreateAccountModal(false);
  }

  return (
    <div className="box">
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid>
            <h2>Login</h2>
          </Grid>
          <form style={{ display: 'inline-block' }} onSubmit={(e: FormEvent<HTMLFormElement>) => { handleLogin(); e.preventDefault(); }}>
            <TextField name="username" label="Username" placeholder="Enter Username" style={marginStyle} value={username} onChange={(event: ChangeEvent<HTMLInputElement>) => handleLoginInputs(event)} fullWidth required />
            <TextField name="password" label="Password" placeholder="Enter Password" type="password" style={marginStyle} value={password} onChange={(event: ChangeEvent<HTMLInputElement>) => handleLoginInputs(event)} fullWidth required />
            <Button type="submit" variant="contained" style={btnStyle} fullWidth >Submit</Button>
          </form>
          <div>
            <Button onClick={handleOpenCreateAccountModal}>
              Create Account
            </Button>
          </div>
          <div>
            <Button color='error' onClick={handlePublicView}>
              View Public Portal
            </Button>
          </div>
        </Paper>
      </Grid>

      <CreateAccount
        open={openCreateAccountModal}
        handleClose={handleCloseCreateAccountModal}
      />

    </div>
  )
}

export default Login;