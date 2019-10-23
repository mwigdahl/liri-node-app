require("dotenv").config();

var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var searchArray = process.argv.splice(3, process.argv.length - 1);
var searchResult = searchArray.join("+");

// handles my action choices
switch (action) {
  case "spotify-this-song":
    spotifySong();
    break;
  case "concert-this":
    concertThis();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doWhatitSays();
    break;
  default:
    console.log("You need to enter an action");
}

function spotifySong() {
  spotify.search({ type: "track", query: searchResult, limit: 1 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log("\n---- Song Information ----\n");
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("Preview Song: " + data.tracks.items[0].external_urls.spotify);
    console.log("Album Name: " + data.tracks.items[0].album.name);
    console.log("\n-----------------------------\n");
  });
}

function concertThis() {
  var artist = searchResult;
  var bandintown =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  axios
    .get(bandintown)
    .then(function(response) {
      // handle success
      var result = response.data[0];

      console.log("\n---- Concert Information ----\n");
      console.log("Venue Name: " + result.venue.name);
      console.log(
        "Venue Location: " + result.venue.city + ", " + result.venue.region
      );
      console.log(
        "Concert Date: " + moment(result.datetime).format("MM/DD/YYYY")
      );
      console.log("\n-----------------------------\n");
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
}

function movieThis() {
  axios
    .get(
      "http://www.omdbapi.com/?t=" +
        searchResult +
        "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      var result = response.data;

      console.log("\n---- Movie Information ----\n");
      console.log("Title: " + result.Title);
      console.log("Release Year: " + result.Year);
      console.log("IMDB Rating: " + result.imdbRating);
      console.log("Rotten Tomatoes Rating: " + result.Ratings[1].Value);
      console.log("Country Produced: " + result.Country);
      console.log("Language: " + result.Language);
      console.log("Plot: " + result.Plot);
      console.log("Actors: " + result.Actors);
      console.log("\n-----------------------------\n");
    })
    .catch(function(error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

function doWhatitSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    var fileCommand = data.split(",");

    var makeItHappen =
      "node " + "liri.js " + fileCommand[0] + " " + fileCommand[1];
    console.log("make it happen", makeItHappen);

    return makeItHappen;
  });
}
