import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MovieCard from './MovieCard';
import API from '../utils/API';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });

  class ActorSearch extends React.Component {
    state = {
      actor1name: '',
      actor2name: '',
      MovieList: [],
    };
  
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };

    searchMatchMovie = () => {
        //call api to search for matching movies
        API.searchActors()
          .then(res => {
            console.log(res.data);
            this.setState({ MovieList: res.data})
          })
          .catch(error => console.log(error));
    };
  
    render() {
      const { classes } = this.props;
  
      return (
      <div>
        <Grid container spacing={32} >
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16} >
            <Paper className={classes.root} elevation={1}>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="actor1name"
                  label="Actor 1 Name"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('actor1name')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField color="#fafafa"
                  id="actor2name"
                  label="Actor 2 Name"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('actor2name')}
                  margin="normal"
                  variant="outlined"
                />
                </form>
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={16} >
              <Paper className={classes.root} elevation={1}>
                <Button variant="contained" className={classes.button}
                onClick={this.searchMatchMovie}
                >
                  Search
                </Button>
                </Paper>
              </Grid>
            </Grid>
            
            <Grid item xs={12} >
                <Grid container spacing={16} justify='center' >
                <Paper className={classes.root} elevation={1}>
                  <p>Matching Movies:</p>
                  </Paper>
                </Grid>
                <Grid container spacing={32} justify='center' >
                {!this.state.MovieList.length ? (<Typography variant='h4'>No Movies Found!</Typography>) :(
                    this.state.MovieList.map((movie, index) => {
                        return (
                          <Grid key={index} style={{'display': 'grid'}} item xs={12} sm={6} justify='center'>
                            <MovieCard 
                              title={movie.ShowName}
                              image={movie.Image} />
                            </Grid>
                        )     
                    })         
                )}
                </Grid>            
            </Grid>
          
          </Grid>
      </div>
          );
        }
      }
      
      ActorSearch.propTypes = {
        classes: PropTypes.object.isRequired,
      };
      
      export default withStyles(styles)(ActorSearch);

