import React, { Component } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import black from '@material-ui/core/colors/grey';

>>>>>>> 84bba00f275485ac0e92c40af5ef646758313f0a
export default class Home extends Component {
    handleClick = () => {
        console.log('this is:', this);
      }
    
      render() {
        return (
<<<<<<< HEAD
          <button onClick={this.handleClick}>
            <Link to='/ActorSearch'>ActorSearch</Link>
          </button>
=======
            <div>
                Home Component
            <Grid container spacing={32} >
              <Grid item xs={12}>
                <Grid container justify="center" spacing={6} >
                <Paper elevation={1}>
                <Link style={{color: black[900]}} to="/actorsMatch"> Actors Match</Link>
                </Paper>
                </Grid>
            </Grid>
            </Grid>
            </div>
>>>>>>> 84bba00f275485ac0e92c40af5ef646758313f0a
        );
      }
    }