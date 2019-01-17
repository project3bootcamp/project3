import React, { Component } from 'react';
import MovieCard from './components/MovieCard';
import ActorSearch from './components/ActorSearch';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
//import { ThemeProvider } from "@material-ui/styles";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ActorSearch />
      </div>
    );
  }
}

export default App;
