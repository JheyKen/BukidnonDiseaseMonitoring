import React, { ChangeEvent } from 'react';
import './App.css';
import { Header, Login, Sidebar } from './Pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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

interface Props { }
interface State {
  login: boolean,
  username: string,
  password: string,
  name: string
}

const initialState = {
  login: false,
  username: "",
  password: "",
  name: ""
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
          name: `${first_name} ${middle_name} ${last_name}`
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

          this.setState({
            ...this.state,
            login: true,
            username: data.username,
            password: '',
            name: `${data.first_name} ${data.middle_name} ${data.last_name}`
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
    this.setState({ ...initialState })
  }

  render() {
    return (
      <div className="App">
        <div id='Header'>
          <Header
            login={this.state.login}
            handleLogout={this.handleLogout}
            name={this.state.name}
          />
        </div>

        <Router>
          {
            !this.state.login ? "" :
              <div id='Sidebar'>
                <Sidebar />
              </div>
          }

          <Switch>
            <div id={this.state.login ? 'Grid-with-sidebar' : 'Grid'}>


              <Route exact path='/'>
                {
                  this.state.login ?
                    <Dashboard />
                    :
                    <Login
                      username={this.state.username}
                      password={this.state.password}
                      handleLogin={this.handleLogin}
                      handleLoginInputs={this.handleLoginInputs}
                    />
                }
              </Route>

              <PrivateRoute exact path='/patient-record'>
                <PatientRecord />
              </PrivateRoute>

              <PrivateRoute exact path='/dengue'>
                <Dengue />
              </PrivateRoute>

              <PrivateRoute exact path='/influenza'>
                <Influenza />
              </PrivateRoute>

              <PrivateRoute exact path='/typhoid'>
                <Typhoid />
              </PrivateRoute>

              <PrivateRoute exact path='/generate-report'>
                <GenerateReport />
              </PrivateRoute>

              <PrivateRoute exact path='/manage-account'>
                <ManageAccount />
              </PrivateRoute>

              <PrivateRoute exact path='/manage-organization'>
                <ManageOrganization />
              </PrivateRoute>

            </div>
          </Switch>

        </Router>
      </div>
    );
  }
}

export default App;
