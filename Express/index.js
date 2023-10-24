const express = require("express"),
	morgan = require("morgan"),
	fs = require("fs"),
	path = require("path");

const app = express();

console.log("Starting Express app...");

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
	flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream, immediate: true }));

// Logging to console
app.use(morgan("combined"));

app.get("/", (req, res) => {
	res.send("Welcome to the ArtCine app!");
});

app.get("/movies", (req, res) => {
	res.json(movieData);
});

const movieDataJson =
	'[{"title":"Juliet of the Spirits","director":"Federico Fellini"},{"title":"The Fountain","director":"Darren Aronofsky"},{"title":"Akira","director":"Katsushiro Otomo"},{"title":"TRON","director":"Steven Lisberger"},{"title":"Mr Nobody","director":"Jaco Van Dormael"},{"title":"Stalker (Russian)","director":"Andrei Tarkovsky"},{"title":"Fight Club","director":"David Fincher"},{"title":"Naked Lunch","director":"David Cronenberg"},{"title":"Harry Potter and the Goblet of Fire","director":"Mike Newell"},{"title":"Pi","director":"Darren Aronofsky"}]';

const movieData = JSON.parse(movieDataJson);

app.use(express.static("public"));

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

app.listen(8080, () => {
	console.log("Your app is listening on port 8080.");
});
