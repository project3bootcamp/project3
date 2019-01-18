import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import black from '@material-ui/core/colors/grey';

export default class Home extends Component {
    render() {
        return (
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
        );
    }
}