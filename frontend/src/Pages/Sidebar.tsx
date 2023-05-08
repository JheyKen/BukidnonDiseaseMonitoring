import { useState } from 'react'
import { Button, Drawer, List, ListItem, Collapse } from "@mui/material";
import { MenuRounded, ExpandLess, ExpandMore } from "@mui/icons-material"
import { useHistory } from "react-router-dom";
import '../App.css';

function Sidebar() {
  let history = useHistory();

  const [nestedReportList, setNestedReportList] = useState(true);

  const handleNestedReport = () => {
    setNestedReportList(!nestedReportList)
  }

  return (
    <div style={{ position: 'absolute', transform: 'translate(50%, -170%)' }}>
      <div>
        <Drawer
          anchor={'left'}
          open={true}
          variant={'persistent'}
        >
          <div>
            <List>
              <ListItem className='list-item' onClick={() => { history.push("/") }}>
                Dashboard
              </ListItem>
              <ListItem className='list-item' onClick={() => { history.push("/patient-record") }}>
                Patient's Record
              </ListItem>
              <ListItem className='list-item' onClick={handleNestedReport}>
                Reports {nestedReportList ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={nestedReportList} timeout="auto" unmountOnExit>
                <List style={{ paddingLeft: '50px' }}>
                  <ListItem className='list-item' onClick={() => { history.push("/dengue") }}>
                    Dengue
                  </ListItem>
                  <ListItem className='list-item' onClick={() => { history.push("/influenza") }}>
                    Influenza
                  </ListItem>
                  <ListItem className='list-item' onClick={() => { history.push("/typhoid") }}>
                    Typhoid
                  </ListItem>
                  <ListItem className='list-item' onClick={() => { history.push("/generate-report") }}>
                    Generate Report
                  </ListItem>
                </List>
              </Collapse>
              <ListItem className='list-item' onClick={() => { history.push("/manage-account") }}>
                Manage Account
              </ListItem>
              <ListItem className='list-item' onClick={() => { history.push("/manage-organization") }}>
                Manage Organization
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    </div>
  )
}

export default Sidebar