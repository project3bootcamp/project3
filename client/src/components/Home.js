import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default class Home extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                Home Component
            <Grid container spacing={32} >
              <Grid item xs={12}>
                <Grid container justify="center" spacing={16} >
                <Paper elevation={1}>
                <Link to="/actorsMatch"> Actors Match</Link>
                </Paper>
                </Grid>
            </Grid>
            </Grid>
            </div>
        );
    }
}