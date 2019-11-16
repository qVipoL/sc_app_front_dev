import React from 'react'
import './App.css'
import { BrowserRouter as Router , Switch, Route } from 'react-router-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeObj from './util/theme'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logOutUser, getUserData } from './redux/actions/userActions'
// Pages
import signup from './pages/signup'
import login from './pages/login'
import home from './pages/home'
import user from './pages/user'
// Components
import Navbar from './components/layout/Navbar'
import AuthRoute from './util/AuthRoute'

axios.defaults.baseURL = "https://europe-west1-social-app-cffe5.cloudfunctions.net/api"

const theme = createMuiTheme(themeObj)

const token = localStorage.FBIdToken
if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logOutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container" style={{height:'100%'}}>
            <Switch>
              <Route exact path='/' component={home} />
              <AuthRoute exact path='/login' component={login} />
              <AuthRoute exact path='/signup' component={signup} />
              <Route exact path='/users/:handle' component={user} />
              <Route exact path='/users/:handle/post/:postId' component={user} />
              <Route component={home} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
