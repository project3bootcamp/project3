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

//JMG adjust this state
class ActorSearch extends React.Component {
  state = {
    actor1name: '',
    actor2name: '',
    actor1imageurl: '',
    actor2imageurl: '',
    actor1ID: '',
    actor2ID: '',
    actor1TMDBID: '',
    actor2TMDBID: '',
    actor1Credits: [],
    actor2Credits: [],
    baseurl: "https://image.tmdb.org/t/p/original/",
    MovieListFinal: []
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  //starts chain of function to process several API calls to our server and external
  //this function uses our server database to find the unique IMDB ID for each actor
  searchMatchMovie = () => {
    console.log(this.state.actor1name);
    API.searchByName(this.state.actor1name)
      .then(res => {
        console.log(res.data.nconst);
        this.setState({ actor1ID: res.data.nconst });

        API.searchByName(this.state.actor2name)
          .then(res => {
            console.log(res.data.nconst);
            this.setState({ actor2ID: res.data.nconst });
            //sends to next function in component
            this.getTMDBID();
          })
      })
      .catch(error => console.log(error));
  };

  //this function takes the unique IMDB ID's and makes a call to external API (TMDB) to find the actors' unique keys in that specific database
  getTMDBID = () => {
    let actor1TMDBID = '';
    let actor2TMDBID = '';
    API.searchTMDBID(this.state.actor1ID)
      .then(res => {
        console.log(res.data.person_results[0].id);
        actor1TMDBID = res.data.person_results[0].id;

        API.searchTMDBID(this.state.actor2ID)
          .then(res => {
            console.log(res.data.person_results[0].id);
            actor2TMDBID = res.data.person_results[0].id;
            this.setState({ actor1TMDBID: actor1TMDBID });
            this.setState({ actor2TMDBID: actor2TMDBID });
            //sends to next function in component
            this.getTMDBCredits(actor1TMDBID, actor2TMDBID);

          })
      })
  };

  //this function uses the actors' TMDB id's to find the URL path to their images
  getTMDBImage = () => {
    API.searchTMDBActorImage(this.state.actor1TMDBID)
      .then(res => {
        this.setState({ actor1imageurl: this.state.baseurl + res.data.profile_path });

        API.searchTMDBActorImage(this.state.actor2TMDBID)
          .then(res => {
            this.setState({ actor2imageurl: this.state.baseurl + res.data.profile_path })
            //sends to next function in component
            this.getTMDBCredits();
          })
      })
  };

  //this function uses the actors' TMDB id's to find all the actor's credits, then pulls out specific data and stores in a new object
  getTMDBCredits = () => {
    let actor1titles = [];
    let actor2titles = [];
    API.searchTMDBCredits(this.state.actor1TMDBID)
      .then(res => {
        let allCredits1 = res.data.cast;
        console.log(allCredits1);
        for (let i = 0; i < allCredits1.length; i++) {

          actor1titles[i] = {
            id: allCredits1[i].id,
            title: allCredits1[i].original_title,
            character: allCredits1[i].character,
            image: this.state.baseurl + allCredits1[i].poster_path
          };

        };
        console.log(actor1titles);
        this.setState({ actor1Credits: actor1titles });

        API.searchTMDBCredits(this.state.actor2TMDBID)
          .then(res => {
            let allCredits2 = res.data.cast;
            console.log(allCredits2);
            for (let i = 0; i < allCredits2.length; i++) {

              actor2titles[i] = {
                id: allCredits2[i].id,
                title: allCredits2[i].original_title,
                character: allCredits2[i].character,
                image: this.state.baseurl + allCredits2[i].poster_path
              };
            };
            console.log(actor2titles);
            this.setState({ actor2Credits: actor2titles });
            //takes the new objects and sends to next function in component
            this.compareLists(actor1titles, actor2titles)
          });
      });
  };

  //this function uses nested for...loops to see which movie id's they have in common, then creates a new object and updates state
  compareLists = (list1, list2) => {
    let FinalList = [];
    for (let i = 0; i < list1.length; i++) {
      for (let j = 0; j < list2.length; j++) {
        if (list1[i].id === list2[j].id) {
          console.log(list1[i]);
          FinalList.push(list1[i]);
        };
      };
    };
    console.log(FinalList);
    this.setState({ MovieListFinal: FinalList });
  };

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
            label="Actor 2 Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('actor2name')}
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
          <p>Matching Movies:</p>
          <Grid container spacing={32} alignItems="stretch" alignContent="stretch">
            {/* JMG adjusted the following line */}
            {!this.state.MovieListFinal.length ? (<Typography variant='h4'>No Movies Found!</Typography>) :
              // JMG adjusted lines 226 - 231, to correspond with the actual state values
              (this.state.MovieListFinal.map((movie, index) => {
                return (
                  <Grid key={index} style={{ 'display': 'grid' }} item xs={12} sm={6} >
                    <MovieCard
                      title={movie.title}
                      image={movie.image}
                    />
                  </Grid>
                )
              })
              )
            }

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

