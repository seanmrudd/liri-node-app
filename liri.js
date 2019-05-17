require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var axios = require('axios');

var spotify = new Spotify(keys.spotify);

var moment = require('moment');

//Spotify
   
  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data.tracks.items); 
  });

// Bands-In-Town
// axios
//     .get(`https://rest.bandsintown.com/artists/taylor+swift/events?app_id=codingbootcamp`)
//     .then(function (response) {
//         console.log(`Name of the Venue: ${response.data[0].venue.name}\nVenue Location: ${response.data[0].venue.city}, ${response.data[0].venue.region}\nDate of the Event: ${moment(response.data[0].datetime).format("dddd, MMMM Do YYYY, h:mm:ss a")}`);
//     })

// OMDB
// var nodeArgs = process.argv;

// var movieName = "";

// for (var i = 2; i < nodeArgs.length; i++) {
//     if (i > 2 && i < nodeArgs.length) {
//         movieName = movieName + "+" + nodeArgs[i];
//     } else {
//         movieName += nodeArgs[i];
//     }
// }

// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// axios.get(queryUrl).then(
//     function (response) {
//         console.log(`\n**********\nTitle of the Movie: ${response.data.Title}\nYear movie came out: ${response.data.Year}\nIMDB Rating: ${response.data.Ratings[0].Value}\nRotten Tomatoes Rating: ${response.data.Ratings[1].Value}\nCountry where it was produced: ${response.data.Country}\nLanguage(s) movie is made in:${response.data.Language}\n\n Plot: ${response.data.Plot}\n\n Actors in the movie: ${response.data.Actors}\n**********\n`);
//     })
//     .catch(function (error) {
//         if (error.response) {
//             console.log(error.response);
//         }
//     });
