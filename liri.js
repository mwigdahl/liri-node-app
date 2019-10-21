require("dotenv").config();

var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];

switch(action) {
    case 'spotify-this-song':
      spotifySong();
      break;
    case 'concert-this':
        concertThis();
      break;
      case 'movie-this':
        movieThis();
      break;
      case 'do-what-it-says':
        doWhatitSays();
      break;
    default:
      console.log('You need to enter an action');
  }


function spotifySong() {
    spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });

}



function concertThis() {
    //code
}

function movieThis() {
    axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
      function(response) {
        console.log(response.data);
        console.log("The movie's rating is: " + response.data.imdbRating);
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and then server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  function doWhatitSays() {
      //code
  }
