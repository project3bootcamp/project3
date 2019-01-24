import axios from "axios";

export default {
  // Gets basic api search results with test actor
  searchByName: actorName => {
    console.log(actorName);
    return axios.get("/api/" + actorName);
  },

  getNames: () => {
    return axios.get('/api/');
  },

  searchTMDBID: actorID => {
    return axios.get("https://api.themoviedb.org/3/find/" + actorID + "?api_key=c92cdcfa44e3261c741c830802ba0c44&language=en-US&external_source=imdb_id");
  },

  searchTMDBCredits: tmdbID => {
    return axios.get("https://api.themoviedb.org/3/person/" + tmdbID + "/movie_credits?api_key=c92cdcfa44e3261c741c830802ba0c44&language=en-US");
  },

  searchTMDBActorImage: tmdbID => {
    return axios.get("https://api.themoviedb.org/3/person/" + tmdbID + "?api_key=c92cdcfa44e3261c741c830802ba0c44&language=en-US")
  },

  searchOMDB: movieID => {
    return axios.get("http://omdbapi.com/?apikey=c1a5ab8c&i=" + movieID);
  },



};