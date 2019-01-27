import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import black from '@material-ui/core/colors/grey';
import AutoSave from './AutoSave';

export default class Home extends Component {
    state = {
        searches: [],
    };
    componentDidMount(){
        this.getSearches();
        
    }
    getSearches = () => {
        const savedSearches = new AutoSave();
        savedSearches.onGetSearched().then(res => {
        console.log("getting user saved searches");
        console.log(`Searches for ${res.data.name} are being loaded`);
        this.setState({ searches:res.data.search })
        console.log(res.data.search);
        });
    }
    handleClick = () => {
        console.log('this is:', this);
      }
    
      render() {
        return (
            <div>
                User Profile
            <Grid container spacing={32} >
              <Grid item xs={12}>
                <Grid container justify="center" spacing={8} >
                    {!this.state.searches.length ?(<Typography variant='h4'>No Searches Found!</Typography>) :
                
                       ( this.state.searches.map((search, index) => {
                        return (
                          <Grid item xs={12}container
                          direction="column"
                          justify="center"
                          alignItems="center">
                            <Paper>
                                <Button >{search.actor1},{search.actor2}</Button>
                            </Paper>
                          </Grid>
                        )}
                       )
                    )}
                    <Grid item xs={6}>
                      <Paper elevation={1}>
                        <Link style={{color: black[900]}} to="/actorsMatch"> Actors Match</Link>
                      </Paper>
                    </Grid>
                </Grid>
              </Grid>
            </Grid>
            </div>
        );
      }
    }