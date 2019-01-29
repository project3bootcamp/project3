import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AutoSave from './AutoSave';
import MyButton from './Button';
import Background from '../images/actormatchbckgrnd.png';

const spaceStyle = {
  margin: "40px",
  width: "100%",
  height: "100vh",
  backgroundImage: "url(" + { Background } + ")",
  fontSize: "20px"
};

export default class Home extends Component {
  state = {
    searches: [],
  };
  componentDidMount() {
    this.getSearches();

  }
  getSearches = () => {
    const savedSearches = new AutoSave();
    savedSearches.onGetSearched().then(res => {
      console.log("getting user saved searches");
      console.log(`Searches for ${res.data.name} are being loaded`);
      this.setState({ searches: res.data.search })
      console.log(res.data.search);
    });
  }
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <div style={spaceStyle}>
        Your Search History
            <Grid container spacing={32} >
          <Grid item xs={12}>
            <Grid container justify="center" spacing={8}>
              {!this.state.searches.length ?

                (<Grid item >
                  <Typography variant='h4'>
                    No Searches Found!
              </Typography>
                </Grid>) :

                (this.state.searches.map((search, index) => {
                  return (
                    <Grid item xs={12}
                      container
                      direction="column"
                      // justify="center"
                      // alignItems="center"
                      style={spaceStyle}>
                      <MyButton actor1={search.actor1} actor2={search.actor2}>{search.actor1}, {search.actor2}</MyButton>
                    </Grid>
                  )
                }
                )
                )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}