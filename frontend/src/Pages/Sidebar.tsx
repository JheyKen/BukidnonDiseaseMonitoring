import { useState } from 'react'
import { Drawer, List, ListItem, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { useHistory } from "react-router-dom";
import '../App.css';
import { localStorageValues } from '../App';

interface Props {
  handleLogout: () => void
  view: string
}

function Sidebar(props: Props) {
  const { handleLogout, view } = props
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
              {
                view === 'public' ? '' :
                  <ListItem className='list-item' onClick={() => { history.push("/patient-record") }}>
                    Patient's Record
                  </ListItem>
              }
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
                  {
                    Number(localStorageValues('isAdmin')) === 0 || view === 'public' ? '' :
                      <ListItem className='list-item' onClick={() => { history.push("/generate-report") }}>
                        Generate Report
                      </ListItem>
                  }
                </List>
              </Collapse>
              {
                Number(localStorageValues('isAdmin')) !== 1 || view === 'public' ? '' :
                  <>
                    <ListItem className='list-item' onClick={() => { history.push("/manage-account") }}>
                      Manage Account
                    </ListItem>
                    <ListItem className='list-item' onClick={() => { history.push("/manage-organization") }}>
                      Manage Organization
                    </ListItem>
                  </>
              }
              {
                view === 'public' ?
                  <ListItem className='list-item' style={{ color: 'red' }} onClick={() => { history.push("/"); handleLogout() }}>
                    Back to Login Page
                  </ListItem>
                  : ''
              }
            </List>
          </div>
        </Drawer>
      </div>
    </div>
  )
}

export default Sidebar