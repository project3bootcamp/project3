import React, { Component } from 'react';
import MovieCard from './components/MovieCard';
import ActorSearch from './components/ActorSearch';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
//import { ThemeProvider } from "@material-ui/styles";
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
          <div className="App">
            <Navbar />
                <Route exact path="/" component={ Home } />
                <div className="container">
                  <Route exact path="/register" component={ Register } />
                  <Route exact path="/login" component={ Login } />
                  <Route exact path="/actorsMatch" component={ActorSearch } />
                </div>
          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;
