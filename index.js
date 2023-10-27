// Author: James Klein

// Importing modules

const express = require("express"),
	bodyParser = require("body-parser"),
	uuid = require("uuid");
const app = express();
const morgan = require("morgan");

app.use(bodyParser.json());

// #1 JSON data for movies
app.get("/movies", (req, res) => {
	res.send("Successful GET request returning data on all the movies");
});

// #2 JSON data for a single movie by title
app.get("/movies/:title", (req, res) => {
	res.send("Successful GET request returning data on a single movie");
});

// #3 JSON data for a genre by name
app.get("/movies/genre/:name", (req, res) => {
	res.send("Successful GET request returning data on a genre by name");
});

// #4 JSON data for a director by name
app.get("/movies/director/:name", (req, res) => {
	res.send("Successful GET request returning data on a director by name");
});

// #5 Create a new user
app.post("/users/", (req, res) => {
	res.send("Successful POST request creating a new user");
});

// #6 Update a user's info by username
app.put("/users/:username", (req, res) => {
	res.send("Successful PUT request updating a user's info by username");
});

// #7 Add a movie to a user's list of favorites
app.post("/users/:username/favorites", (req, res) => {
	res.send("Successful POST request adding a movie to a user's list of favorites");
});

// #8 Remove a movie from a user's list of favorites
app.delete("/users/:username/favorites/:title", (req, res) => {
	res.send("Successful DELETE request removing a movie from a user's list of favorites");
});

// #9 Delete a user by username
app.delete("/users/:username", (req, res) => {
	res.send("Successful DELETE request deleting a user by username");
});

app.listen(8080, () => {
	console.log("Your app is listening on port 8080.");
});
