import { useState } from "react";
import { Person, ArrowDropDown } from '@mui/icons-material';
import { Button, Menu, MenuItem } from "@mui/material";
import "../App.css"
import { ChangePassword } from "../Modals";

interface Props {
  login: boolean;
  handleLogout: () => void;
  name: string;
}

function Header(props: Props) {
  const { login, handleLogout, name } = props
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown)
  }

  const handleOpenChangePasswordModal = () => {
    setOpenDropdown(false);
    setOpenChangePasswordModal(true);
  }

  const handleCloseChangePasswordModal = () => {
    setOpenChangePasswordModal(false);
  }

  return (
    <div style={{ padding: '10px', display: 'flex' }}>
      <div style={!login ? {} : { width: '60%' }}>
        <span style={{ fontWeight: 'bold', fontSize: '25px' }}>
          BUKIDNON PROVINCIAL DISEASE MONITORING SYSTEM
        </span>
      </div>

      {
        !login ? '' :
          <div className="account" style={{ width: '40%', textAlign: 'right' }}>
            <Button aria-controls="menu" aria-haspopup="true" onClick={handleDropdown}>
              <Person style={{ fontSize: '30px' }} /> &nbsp;&nbsp;
              <span>{name} &nbsp;&nbsp;</span>
              <ArrowDropDown />
            </Button>
            <Menu
              id="menu"
              open={openDropdown}
              onClose={handleDropdown}
              keepMounted
            >
              <MenuItem onClick={handleOpenChangePasswordModal}>Change Password</MenuItem>
              <MenuItem onClick={() => { handleDropdown(); handleLogout(); }}>Logout</MenuItem>
            </Menu>
          </div>
      }

      <ChangePassword
        open={openChangePasswordModal}
        handleClose={handleCloseChangePasswordModal}
      />
    </div>
  )
}

export default Header;