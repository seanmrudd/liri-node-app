require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

//This works -- don't touch
spotify
  .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  .then(function(data) {
    console.log(Object.keys(data)); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });