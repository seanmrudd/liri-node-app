# liri-node-app
CLI for songs, concerts and movies

# What this project is
This CLI allows a user to use prompts to search song infromation, movie information, or when the next concert for an artist or band.

# But why?
Well, in case you don't want to ask siri or alexa for certain information, you can ask it on your command line.

# How to use it
You will need to obtain a Spotify API key.  Once you get that, you can creat a .env file and place them in there.
Just enter this into your .env file.  You can get one here at [Spotify](https://developer.spotify.com/dashboard/). 

----------------------------------------------
Spotify API keys

SPOTIFY_ID={spotify-id}
SPOTIFY_SECRET={spotif-secret}

-----------------------------------------------

After that, install the package.json.  Once you get that done, you should be good to go.

To start using the command line, you will type in "node liri.js <command-prompt> <item-you-want-searched>".
The commands are:
<spotify-this-song> to search for a song
<concert-this> to search for a concert
<movie-this> to search for a movie

After you add your <command-prompt> just type want you want to search after that.

