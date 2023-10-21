const express = require("express"),
	morgan = require("morgan"),
	fs = require("fs"), // import built in node modules fs and path
	path = require("path");

const app = express();
// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
	flags: "a",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", (req, res) => {
	res.send("ArtCinema API");
});

app.get("/movies", (req, res) => {
	res.json(movieData);
});

const movieDataJson =
	'[{"title":"Juliet of the Spirits","director":"Federico Fellini"},{"title":"The Fountain","director":"Darren Aronofsky"},{"title":"Akira","director":"Katsushiro Otomo"},{"title":"TRON","director":"Steven Lisberger"},{"title":"Mr Nobody","director":"Jaco Van Dormael"},{"title":"Stalker (Russian)","director":"Andrei Tarkovsky"},{"title":"Fight Club","director":"David Fincher"},{"title":"Naked Lunch","director":"David Cronenberg"},{"title":"Harry Potter and the Goblet of Fire","director":"Mike Newell"},{"title":"Pi","director":"Darren Aronofsky"}]';

const movieData = JSON.parse(movieDataJson);

app.listen(8080, () => {
	console.log("Your app is listening on port 8080.");
});
