require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var axios = require('axios');

var spotify = new Spotify(keys.spotify);

var moment = require('moment');

var fs = require('fs');

//Spotify
function liriSpotify() {
  var nodeArgs = process.argv;

  var songName = "";

  for (var i = 3; i < nodeArgs.length; i++) {
    songName = songName + "+" + nodeArgs[i];
  }

  spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(`Artist/Band Name: ${data.tracks.items[0].artists[0].name}`);
    console.log(`Song Name: ${data.tracks.items[0].name}`);
    console.log(`URL: ${data.tracks.items[0].external_urls.spotify}`);
    console.log(`Album Name: ${data.tracks.items[0].album.name}`);
  });
}

// Bands-In-Town
function liriConcert () {
  var nodeArgs = process.argv;

  var bandName = "";
  
  for (var i = 3; i < nodeArgs.length; i++) {
      if (i > 3 && i < nodeArgs.length) {
        bandName = bandName + "+" + nodeArgs[i];
      } else {
        bandName += nodeArgs[i];
      }
  }
  
  var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
  
  axios.get(queryUrl)
    .then(function (response) {
      console.log(`Name of the Venue: ${response.data[0].venue.name}\nVenue Location: ${response.data[0].venue.city}, ${response.data[0].venue.region}\nDate of the Event: ${moment(response.data[0].datetime).format("dddd, MMMM Do YYYY, h:mm:ss a")}`);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// OMDB
function liriMovie() {
  var nodeArgs = process.argv;

  var movieName = "";

  for (var i = 3; i < nodeArgs.length; i++) {
    movieName = movieName + "+" + nodeArgs[i];
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl)
    .then(
      function (response) {
        console.log(`\n**********\nTitle of the Movie: ${response.data.Title}\nYear movie came out: ${response.data.Year}\nIMDB Rating: ${response.data.Ratings[0].Value}\nRotten Tomatoes Rating: ${response.data.Ratings[1].Value}\nCountry where it was produced: ${response.data.Country}\nLanguage(s) movie is made in:${response.data.Language}\n\n Plot: ${response.data.Plot}\n\n Actors in the movie: ${response.data.Actors}\n**********\n`);
      })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response);
      }
    });
}

function liriDoThis () {
  fs.readFile('random.txt', 'utf8', function (error, data){
    if (error) {
      return console.log(error)
    } 
    var doThis = data;
    spotify.search({ type: 'track', query: doThis, limit: 1 }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log(`Artist/Band Name: ${data.tracks.items[0].artists[0].name}`);
      console.log(`Song Name: ${data.tracks.items[0].name}`);
      console.log(`URL: ${data.tracks.items[0].external_urls.spotify}`);
      console.log(`Album Name: ${data.tracks.items[0].album.name}`);
    });1
  })
}

//Liri function selector
var liriBot = process.argv[2];

switch (liriBot) {
  case 'concert-this':
    liriConcert();
    break;
  case 'spotify-this-song':
    liriSpotify();
    break;
  case 'movie-this':
    liriMovie();
    break;
  case 'do-what-it-says':
    liriDoThis();
    break;
  case '':
    liriInstructions();
    break;
}





