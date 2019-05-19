require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var axios = require('axios');

var spotify = new Spotify(keys.spotify);

var moment = require('moment');

var fs = require('fs');


//Spotify
function liriSpotify() {

  if (liriSearch === '') {

    spotify
      .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
      .then(function (data) {
        console.log('\n-----------------------');
        console.log(`Artist/Band Name: ${data.album.artists[0].name}`);
        console.log(`Song Name: ${data.name}`);
        console.log(`URL: ${data.album.artists[0].external_urls.spotify}`);
        console.log(`Album Name: ${data.album.name}`);
        console.log('-----------------------');
      })
      .catch(function (err) {
        console.error('Error occurred: ' + err);
      });
  } else

    spotify.search({ type: 'track', query: liriSearch, limit: 1}, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log('\n-----------------------');
      console.log(`Artist/Band Name: ${data.tracks.items[0].artists[0].name}`);
      console.log(`Song Name: ${data.tracks.items[0].name}`);
      console.log(`URL: ${data.tracks.items[0].external_urls.spotify}`);
      console.log(`Album Name: ${data.tracks.items[0].album.name}`);
      console.log('-----------------------');
    });
}

// Bands-In-Town
function liriConcert() {

  var queryUrl = "https://rest.bandsintown.com/artists/" + liriSearch + "/events?app_id=codingbootcamp";

  axios.get(queryUrl)
    .then(function (response) {
      console.log(`\n**********\nName of the Venue: ${response.data[0].venue.name}\nVenue Location: ${response.data[0].venue.city}, ${response.data[0].venue.region}\nDate of the Event: ${moment(response.data[0].datetime).format("MM/DD/YYYY")}\n**********\n`);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// OMDB
function liriMovie() {

  if (liriSearch === '') {
    liriSearch = 'Mr. Nobody';
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + liriSearch + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl)
    .then(
      function (response) {
        console.log(`\n**********\nTitle of the Movie: ${response.data.Title}\nYear movie came out: ${response.data.Year}\nIMDB Rating: ${response.data.Ratings[0].Value}\nRotten Tomatoes Rating: ${response.data.Ratings[1].Value}\nCountry where it was produced: ${response.data.Country}\nLanguage(s) movie is made in:${response.data.Language}\n\n Plot: ${response.data.Plot}\n\n Actors in the movie: ${response.data.Actors}\n**********\n`);
        if (liriSearch === 'Mr. Nobody') {
          console.log("If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>")
          console.log("It's on Netflix!")
        }
      })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response);
      }
    });
}

function liriDoThis() {
  fs.readFile('random.txt', 'utf8', function (error, data) {
    if (error) {
      return console.log(error)
    }

    var doThis = data.split(',');

    liriBot = doThis[0];
    liriSearch = doThis[1];

    if (liriBot === 'spotify-this-song') {
      liriSpotify(liriSearch);
    } else if (liriBot === 'concert-this') {
      liriConcert(liriSearch);
    } else if (liriBot === 'movie-this') {
      liriMovie(liriSearch);
    }
  })
}

function liriInstructions () {
  console.log("\nAfter you type in 'node liri.js' you can enter: \n\n<spotify-this-song> to search for a song, \n<concert-this> to search for a concert, or \n<movie-this> to search for a movie.  \n\nAfter the command, enter in what you want to search.")
}

//Liri function selector
var liriBot = process.argv[2];

var liriInput = process.argv;

var liriSearch = liriInput.slice(3).join(' ').trim();

switch (liriBot) {
  case 'concert-this':
    liriConcert(liriSearch);
    break;
  case 'spotify-this-song':
    liriSpotify(liriSearch);
    break;
  case 'movie-this':
    liriMovie(liriSearch);
    break;
  case 'do-what-it-says':
    liriDoThis();
    break;
  default:
    liriInstructions();
}