import React from 'react';
import PropTypes from 'prop-types';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
//import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MovieCard from './MovieCard';
import API from '../utils/API';
import ActorCard from './ActorCard';
import Modal from '@material-ui/core/Modal';
import AutoSave from './AutoSave';

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
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

function rand() {
  return Math.round(Math.random() * 20) - 10;
};

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

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
    baseurl: "https://image.tmdb.org/t/p/w342/",
    MovieListFinal: [],
    actorModalOpen: false,
    searchModalOpen: false,
    savedsearches: [],
  };

  handleActorModalOpen = () => {
    this.setState({ actorModalOpen: true });
  };

  handleActorModalClose = () => {
    this.setState({ actorModalOpen: false });
  };

  handleSearchModalOpen = () => {
    this.setState({ searchModalOpen: true });
  };

  handleSearchModalClose = () => {
    this.setState({ searchModalOpen: false });
  };

  componentDidMount() {
  };
  
  onHandleSave = () =>{
    const savedName = new AutoSave();
    const obj = {
      actor1: this.state.actor1name,
      actor2: this.state.actor2name
    }
    console.log(obj)
    this.setState({savedsearches: obj})
    savedName.onSave(obj);
  };

  handleChange = name => event => {
    this.setState({
      [name]: this.capitalizeNames(event.target.value),
      actor1imageurl: '',
      actor2imageurl: '',
      MovieListFinal: []
    });
  };

  selectHandleChange = selectedOption => {
    this.setState({ actor1name: selectedOption });
    console.log(`Option selected: `, selectedOption);
  };

  //this is a function that will properly capitalize the saved names before storing the name to state
  capitalizeNames = (name) => {
    let splitStr = name.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    };
    return splitStr.join(' ');
  };

  //starts chain of function to process several API calls to our server and external
  //this function uses our server database to find the unique IMDB ID for each actor
  searchMatchMovie = () => {
    if (this.state.actor1name === '' || this.state.actor2name === '') {
      console.log("missing something");
      this.setState({ open: true });
    };

    let actor1 = this.state.actor1name;
    let actor2 = this.state.actor2name;
    actor1 = actor1.replace(/\b[a-z]/g, letter => (letter.toUpperCase()));
    actor2 = actor2.replace(/\b[a-z]/g, letter => (letter.toUpperCase()));
    API.searchByName(actor1)
      .then(res => {
        // console.log(res.data.nconst);
        this.setState({ actor1ID: res.data.nconst });
        // console.log(this.state.actor2name);
        API.searchByName(actor2)
          .then(res => {
            // console.log(res.data.nconst);
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
        // console.log(res.data.person_results[0].id);
        actor1TMDBID = res.data.person_results[0].id;

        API.searchTMDBID(this.state.actor2ID)
          .then(res => {
            // console.log(res.data.person_results[0].id);
            actor2TMDBID = res.data.person_results[0].id;
            this.setState({ actor1TMDBID: actor1TMDBID });
            this.setState({ actor2TMDBID: actor2TMDBID });
            //sends to next function in component
            //this.getTMDBCredits(actor1TMDBID, actor2TMDBID);
            this.getTMDBImage();
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
          });
      });
  };

  //this function uses the actors' TMDB id's to find all the actor's credits, then pulls out specific data and stores in a new object
  getTMDBCredits = () => {
    let actor1titles = [];
    let actor2titles = [];
    API.searchTMDBCredits(this.state.actor1TMDBID)
      .then(res => {
        let allCredits1 = res.data.cast;
        // console.log(allCredits1);
        for (let i = 0; i < allCredits1.length; i++) {
          // let imdbURLRequest = API.getMovieID(allCredits1[i].id);
          // console.log(imdbURLRequest);

          actor1titles[i] = {
            id: allCredits1[i].id,
            title: allCredits1[i].original_title,
            character: allCredits1[i].character,
            image: this.state.baseurl + allCredits1[i].poster_path,
          };

        };
        // console.log(actor1titles);
        this.setState({ actor1Credits: actor1titles });

        API.searchTMDBCredits(this.state.actor2TMDBID)
          .then(res => {
            let allCredits2 = res.data.cast;
            // console.log(allCredits2);
            for (let i = 0; i < allCredits2.length; i++) {

              actor2titles[i] = {
                id: allCredits2[i].id,
                title: allCredits2[i].original_title,
                character: allCredits2[i].character,
                image: this.state.baseurl + allCredits2[i].poster_path
              };
            };
            // console.log(actor2titles);
            this.setState({ actor2Credits: actor2titles });
            //takes the new objects and sends to next function in component
            this.compareLists(actor1titles, actor2titles)
          });
      });
  };

  //this function uses nested for...loops to see which movie id's they have in common, then creates a new object and updates state
  compareLists = (list1, list2) => {
    let FinalList = [];
    let tmdbIDList = [];

    for (let i = 0; i < list1.length; i++) {
      for (let j = 0; j < list2.length; j++) {
        if (list1[i].id === list2[j].id) {
          console.log(list1[i]);
          FinalList.push(list1[i]);
          tmdbIDList.push(list1[i].id);
        };
      };
    };
    console.log("FinalList", FinalList);

    if (FinalList.length === 0) {
      this.setState({ searchModalOpen: true });
    };

    this.getMovieID(FinalList, tmdbIDList);
  };

  //this function is used to send each TMDB id to the server, which then makes a separate call to TMBD to find the IMDB id for each movie.
  getMovieID = (FinalList, tmdbIDList) => {
    tmdbIDList.map(tmdbid => {

      API.getMovieID(tmdbid)
        .then(res => {

          for (var i in FinalList) {
            if (FinalList[i].id === tmdbid) {
              FinalList[i].imdbURL = "https://www.imdb.com/title/" + res.data
            }
          };
          console.log("FinalList", FinalList);
          this.setState({ MovieListFinal: FinalList });
        });
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={24} >
          <Grid item xs={12}>
            <Grid container justify="center" spacing={8} >
              <Paper className={classes.root} elevation={1}>
                <form className={classes.container} noValidate autoComplete="off">

                  {/* This Modal will render if one of the text field is empty when User hits the Search button */}
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.actorModalOpen}
                    onClose={this.handleActorModalClose}
                  >
                    <div style={getModalStyle()} className={classes.paper}>
                      <Typography variant="h6" id="modal-title">
                        Be sure you enter a name in each text field.
            </Typography>
                      <Typography variant="subtitle1" id="simple-modal-description">
                        How can we compare filmographies with only one actor? Don't be an idiot.
            </Typography>
                      {/* <SimpleModalWrapped /> */}
                    </div>
                  </Modal>

                  {/* This Modal will render if there are no search results. */}
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.searchModalOpen}
                    onClose={this.handleSearchModalClose}
                  >
                    <div style={getModalStyle()} className={classes.paper}>
                      <Typography variant="h6" id="modal-title">
                        Sorry. There are no results for these two actors.
            </Typography>
                      <Typography variant="subtitle1" id="simple-modal-description">
                        Maybe try another search?
            </Typography>
                    </div>
                  </Modal>

                  <TextField
                    id="actor1name"
                    label="Actor 1 Name"
                    className={classes.textField}
                    // JMG changed the value to return the correct state.actor1name
                    value={this.state.actor1name}
                    onChange={this.handleChange('actor1name')}
                    margin="normal"
                    variant="outlined"
                  />

                  <TextField color="#fafafa"
                    id="actor2name"
                    label="Actor 2 Name"
                    className={classes.textField}
                    // JMG changed the value to return the correct state.actor1name
                    value={this.state.actor2name}
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
              <Paper className={classes.root} elevation={1}>
                <Button variant="contained" className={classes.button}
                  onClick={this.onHandleSave}
                >
                  Save Search
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
            {!this.state.actor1imageurl && !this.state.actor2imageurl ? (<Typography variant='h4'>Enter Actors</Typography>) : (
              <Grid>
                <Grid item xs={12}>
                  <Grid container justify='center' spacing={32}>
                    <Paper className={classes.root} >
                      <ActorCard
                        title={this.state.actor1name}
                        image={this.state.actor1imageurl}
                      />
                    </Paper>
                    <Paper>
                      <ActorCard
                        title={this.state.actor2name}
                        image={this.state.actor2imageurl}
                      />
                    </Paper>
                  </Grid>
                </Grid>
                <Grid container spacing={32} justify='center' >
                  {/* JMG adjusted the following line */}
                  {!this.state.MovieListFinal.length ? (<Typography variant='h4'>No Movies Found!</Typography>) :
                    // JMG adjusted lines 226 - 231, to correspond with the actual state values
                    (this.state.MovieListFinal.map((movie, index) => {
                      return (
                        <Grid key={index} style={{ 'display': 'grid' }} container item xs={12} sm={6} justify='center' >
                          {/* <Link to={movie.href}> */}
                          <MovieCard
                            title={movie.title}
                            image={movie.image}
                            href={movie.imdbURL}
                          />
                          {/* </Link> */}
                        </Grid>
                      )
                    })
                    )
                  }
                </Grid>
              </Grid>
            )}
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

/*
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
     {JMG adjusted the following line }
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
*/
