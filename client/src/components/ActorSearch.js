import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MovieCard from './MovieCard';

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
    }
  
    render() {
      const { classes } = this.props;
  
      return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="standard-name"
            label="Actor 1 Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('actor1name')}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Actor 1 Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('actor1name')}
            margin="normal"
          />
          </form>
          <div>
            <Button variant="contained" className={classes.button}
            onClick={this.searchMatchMovie}
            >
              Search
            </Button>
          </div>
          <div>
             <p>Maching Movies:</p>   
            <Grid container spacing={30} alignItems="stretch" alignContent="stretch">
            {!this.state.MovieList.length ? (<Typography variant='h4'>No Books Found!</Typography>) :(
                this.state.MovieList.map(movie => {
                    return (
                      <Grid key={movie.movieId} style={{'display': 'grid'}} item xs={12} sm={6} >
                        <MovieCard movie/>
                        </Grid>
                    )     
                })         
            )}
                        
            </Grid>
          </div>
          </div>
          );
        }
      }
      
      ActorSearch.propTypes = {
        classes: PropTypes.object.isRequired,
      };
      
      export default withStyles(styles)(ActorSearch);

