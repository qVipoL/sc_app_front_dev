import React from 'react'
import './App.css'
import { BrowserRouter as Router , Switch, Route } from 'react-router-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeObj from './util/theme'
import jwtDecode from 'jwt-decode'
// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
// Pages
import signup from './pages/signup'
import login from './pages/login'
import home from './pages/home'
// Components
import Navbar from './components/Navbar'
import AuthRoute from './util/AuthRoute'

const theme = createMuiTheme(themeObj)

let authenticated

const token = localStorage.FBIdToken
if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false
  }
  authenticated = true
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path='/' component={home} />
                <AuthRoute exact path='/login' component={login} authenticated={authenticated}/>
                <AuthRoute exact path='/signup' component={signup} authenticated={authenticated}/>
                <Route component={home} />
              </Switch>
            </div>
          </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
