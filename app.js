require("dotenv").config();

const express = require("express");
const app = express();
// //<=========Do this for EJS ==============>
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("view engine", "ejs");
//require spotify-web-api-node package here:
// npm i express spotify-web-api-node dotenv ejs express-ejs-layouts
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
const SpotifyWebApi = require('spotify-web-api-node');


// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));

// Our routes go here:
app.get("/", (req, res) => {
  res.render("home");
});
//geting info about the artist
app.get('/artist-search', (req, res)=> {
    console.log ("it works", req.query) //refers to research object
    spotifyApi
    .searchArtists(req.query.artist)
    .then (data => {
        console.log('the recived data from the API: ', data.body.artist.items[0].images);
    //what we want to do after recived the data from the API
    const restultFromApi = data.body.artists.items
    res.render('artist-search-results',{restultFromApi})
})})

app.listen(3000, () =>
  console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊")
);
