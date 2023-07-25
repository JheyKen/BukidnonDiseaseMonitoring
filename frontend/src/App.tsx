import React, { ChangeEvent, CSSProperties } from 'react';
import './App.css';
//@ts-ignore
import FileSaver from 'file-saver';
import { Header, Login, Sidebar } from './Pages';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {
  Dashboard,
  Dengue,
  GenerateReport,
  Influenza,
  ManageAccount,
  ManageOrganization,
  PatientRecord,
  Typhoid,
  PrivateRoute
} from './Components';
import Service from './Service/Service';
import Report from './Data/Report';
import { PulseLoader } from 'react-spinners'
import { AxiosResponse } from "axios";

interface Props { }
interface State {
  login: boolean,
  load: boolean,
  username: string,
  password: string,
  name: string,
  view: string,
  diseaseForReport: string,
  dateFromForReport: string,
  dateToForReport: string
}

const initialState = {
  login: false,
  load: false,
  username: "",
  password: "",
  name: "",
  view: "login",
  diseaseForReport: "Dengue",
  dateFromForReport: "",
  dateToForReport: ""
}

const overrideSpinner: CSSProperties = {
  position: "fixed",
  width: "100%",
  height: "100%",
  paddingTop: '20%',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: 2,
}

export function localStorageValues(value: string) {
  return JSON.stringify(localStorage.getItem(value)).replace(/^["'](.+(?=["']$))["']$/, '$1');
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    (async () => {
      if (localStorage.length) {
        this.setState({ ...this.state, login: true })
        await this.handleFetchData()
      }
    })();
  }

  handleFetchData = async () => {
    try {
      const usernameParams = localStorageValues('username')
      const checkLogin = await Service.getAccountByUsername(usernameParams);

      const { username, first_name, middle_name, last_name } = checkLogin.data;

      if (localStorage.length) {
        this.setState({
          password: "",
          username,
          name: `${first_name} ${middle_name} ${last_name}`,
          view: 'registered',
          diseaseForReport: localStorageValues('diseaseForReport'),
          dateFromForReport: localStorageValues('dateFromForReport'),
          dateToForReport: localStorageValues('dateToForReport')
        })
      }


    } catch (error) {
      throw error
    }
  }

  handleLoginInputs = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    this.setState({ ...this.state, [name]: value })
  }

  handleLogin = async () => {
    try {
      const { username, password } = this.state

      const dbResult = await Service.getLogin(username, password);

      if (dbResult) {
        const { data, message } = dbResult.data;

        if (message === 'Password incorrect.') {
          this.setState({ username: '', password: '' })
          alert('Invalid Credentials.')
        } else if (message === 'No user found.') {
          this.setState({ username: '', password: '' })
          alert('No user found.')
        } else {
          localStorage.setItem('username', data.username)
          localStorage.setItem('login', 'true')
          localStorage.setItem('isAdmin', data.isAdmin)
          localStorage.setItem('diseaseForReport', 'Dengue')

          this.setState({
            ...this.state,
            login: true,
            username: data.username,
            password: '',
            name: `${data.first_name} ${data.middle_name} ${data.last_name}`,
            view: "registered",
            diseaseForReport: 'Dengue'
          })
        }
      }
    } catch (error) {
      this.setState({ username: '', password: '' })
      alert('Error logging in.');
    }
  }

  handleLogout = () => {
    localStorage.clear()
    window.location.reload();
    this.setState({ ...initialState })
  }

  handleDataForReport = (data: any) => {
    const { name, value } = data.target

    if (name === 'diseaseForReport') {
      localStorage.setItem('diseaseForReport', value)
    } else if (name === 'dateFromForReport') {
      localStorage.setItem('dateFromForReport', value)
    } else {
      localStorage.setItem('dateToForReport', value)
    }

    this.setState({ ...this.state, [name]: value })
  }

  handlePublicView = () => {
    this.setState({ ...this.state, view: 'public' })
  }

  handleDownloadReport = async () => {
    this.setState({ ...this.state, load: true })
    try {
      const result: BlobPart = await Service.generatePDF();
      var blob = new Blob([result], { type: "application/pdf" });
      FileSaver.saveAs(blob, "report.pdf");
    } catch (error) {
      alert("Error generating PDF.");
    }
    this.setState({ ...this.state, load: false })
  }

  render() {
    return (
      <div className="App">
        {
          window.location.pathname !== "/report" &&
          <div id='Header'>
            <Header
              login={this.state.login}
              handleLogout={this.handleLogout}
              name={this.state.name}
            />
          </div>
        }

        {
          !this.state.load ? "" :
            <div style={{ textAlign: 'center' }}>
              <PulseLoader color={'#115293'} size={50} cssOverride={overrideSpinner} />
            </div>
        }

        <Router>
          {
            this.state.view === 'login' ? "" :
              window.location.pathname !== "/report" &&
              <div id='Sidebar'>
                <Sidebar
                  handleLogout={this.handleLogout}
                  view={this.state.view}
                />
              </div>
          }

          <Switch>
            <Route exact path='/report'>
              <Report />
            </Route>
            <div id={this.state.login || this.state.view === 'public' ? 'Grid-with-sidebar' : 'Grid'}>
              <Route exact path='/'>
                {
                  this.state.view === 'login' ?
                    <div id="Grid">
                      <Login
                        username={this.state.username}
                        password={this.state.password}
                        handleLogin={this.handleLogin}
                        handleLoginInputs={this.handleLoginInputs}
                        handlePublicView={this.handlePublicView}
                      />
                    </div>
                    :
                    <Dashboard />
                }
              </Route>

              <PrivateRoute exact path='/patient-record'>
                <PatientRecord />
              </PrivateRoute>

              {
                this.state.view === 'login' ? ''
                  :
                  <>
                    <Route exact path='/dengue'>
                      <Dengue />
                    </Route>

                    <Route exact path='/influenza'>
                      <Influenza />
                    </Route>

                    <Route exact path='/typhoid'>
                      <Typhoid />
                    </Route>
                  </>
              }

              {
                Number(localStorageValues('isAdmin')) === 0 ? "" :
                  <PrivateRoute exact path='/generate-report'>
                    <GenerateReport
                      handleDataForReport={this.handleDataForReport}
                      diseaseForReport={this.state.diseaseForReport}
                      dateFromForReport={this.state.dateFromForReport}
                      dateToForReport={this.state.dateToForReport}
                      handleDownloadReport={this.handleDownloadReport}
                    />
                  </PrivateRoute>
              }

              {
                Number(localStorageValues('isAdmin')) === 1 ?
                  <>
                    <PrivateRoute exact path='/manage-account'>
                      <ManageAccount />
                    </PrivateRoute>

                    <PrivateRoute exact path='/manage-organization'>
                      <ManageOrganization />
                    </PrivateRoute>
                  </>
                  : ""
              }
            </div>
          </Switch>

        </Router>
      </div>
    );
  }
}

export default App;
