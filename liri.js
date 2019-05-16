require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var axios = require('axios');

var spotify = new Spotify(keys.spotify);

var moment = require('moment');

moment().format();

// This works -- don't touch
// spotify
//     .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//     .then(function (data) {
//         console.log(Object.keys(data));
//     })
//     .catch(function (err) {
//         console.error('Error occurred: ' + err);
//     });

// axios
//     .get(`https://rest.bandsintown.com/artists/taylor+swift/events?app_id=codingbootcamp`)
//     .then(function (response) {
//         console.log(response.data);
//     })

var nodeArgs = process.argv;

var movieName = "";

for (var i = 2; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
    } else {
        movieName += nodeArgs[i];
    }
}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

axios.get(queryUrl).then(
    function (response) {
        console.log(`\n**********\nTitle of the Movie: ${JSON.stringify(response.data.Title)}\nYear movie came out: ${response.data.Year}\nIMDB Rating: ${response.data.Ratings[0].Value}\nRotten Tomatoes Rating: ${response.data.Ratings[1].Value}\nCountry where it was produced: ${response.data.Country}\nLanguage(s) movie is made in:${response.data.Language}\n\n Plot: ${response.data.Plot}\n\n Actors in the movie: ${response.data.Actors}\n**********\n`);
    })
    .catch(function (error) {
        if (error.response) {
            console.log(error.response);
        }
    });
