import React from 'react';
import './App.css';
import { BrowserRouter as Router , Switch, Route } from 'react-router-dom';
import signup from './pages/signup';
import login from './pages/login';
import home from './pages/home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={home} />
          <Route path='/login' component={login} />
          <Route path='/signup' component={signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
