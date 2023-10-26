const { r } = require("tar");

const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	uuid = require("uuid");

app.use(bodyParser.json());

let users = [
	{
		id: "baf7df5b-1f86-471b-a949-6d45ef62f7ea",
		username: "jane_doe",
		email: "jane.doe@example.com",
		password: "hashed_password1",
		firstName: "Jane",
		lastName: "Doe",
		dateOfBirth: "1995-05-20",
		favorites: [
			{
				movieID: "Inception",
				dateAdded: "2023-10-21",
			},
		],
	},
	{
		id: "4c43a2fc-a8fa-4d6e-a167-bbe0cf130b39",
		username: "john_smith",
		email: "john.smith@example.com",
		password: "hashed_password2",
		firstName: "John",
		lastName: "Smith",
		dateOfBirth: "1992-03-15",
		favorites: [
			{
				movieID: "Avatar",
				dateAdded: "2023-07-15",
			},
			{
				movieID: "The Shawshank Redemption",
				dateAdded: "2023-08-10",
			},
		],
	},
];

let movies = [
	{
		Title: "Inception",
		Description: "A skilled thief, the absolute best in the dangerous art of extraction, steals valuable secrets from deep within the subconscious during the dream state.",
		Genre: {
			Name: "Sci-Fi",
			Description: "Science fiction (often shortened to Sci-Fi or SF) is a genre of speculative fiction that typically deals with imaginative and futuristic concepts.",
		},
		Director: {
			Name: "Christopher Nolan",
			Bio: "Born on July 30, 1970, in London, England. Nolan gained international recognition with his second film, Memento (2000). He went on to create the Dark Knight trilogy and later directed hits like Interstellar (2014) and Dunkirk (2017).",
			Birth: 1970.0,
		},
		ImageURL: "https://sample-image-url.com/inception.jpg",
		Featured: false,
	},
	{
		Title: "Avatar",
		Description: "On the lush alien world of Pandora, a former Marine becomes mobile again through an avatar and falls in love with a Na'vi woman.",
		Genre: {
			Name: "Adventure",
			Description: "Adventure films are a genre of film that typically use their action scenes to display and explore exotic locations in an energetic way.",
		},
		Director: {
			Name: "James Cameron",
			Bio: "Born on August 16, 1954, in Kapuskasing, Ontario, Canada. Cameron's directorial breakthrough was the action film The Terminator (1984). He later directed Titanic (1997) which became the highest-grossing film of all time until Cameron's Avatar (2009) surpassed it.",
			Birth: 1954.0,
		},
		ImageURL: "https://sample-image-url.com/avatar.jpg",
		Featured: true,
	},
	{
		Title: "The Shawshank Redemption",
		Description: "Two imprisoned men bond over several years, finding solace and eventual redemption through acts of common decency.",
		Genre: {
			Name: "Drama",
			Description: "In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.",
		},
		Director: {
			Name: "Frank Darabont",
			Bio: "Born on January 28, 1959, in Montbéliard, France. Darabont is known for adapting Stephen King novels, like The Green Mile (1999) and later The Mist (2007).",
			Birth: 1959.0,
		},
		ImageURL: "https://sample-image-url.com/shawshank.jpg",
		Featured: true,
	},
];

//Create

app.post("/users", (req, res) => {
	const newUser = req.body;

	if (!newUser.username) {
		const message = "Missing username in request body";
		res.status(400).send(message);
	} else {
		newUser.id = uuid.v4();
		users.push(newUser);
		res.status(201).json(newUser);
	}
});

app.post("/users/:id/favorites", (req, res) => {
	const { id } = req.params;
	const user = users.find((user) => user.id === id);

	if (user) {
		user.favorites.push(req.body);
		res.status(201).send(user);
	} else {
		res.status(404).send("User not found.");
	}
});

//Read

app.get("/movies/", (req, res) => {
	res.status(200).json(movies);
});

app.get("/movies/:title", (req, res) => {
	const { title } = req.params;
	const movie = movies.find((movie) => movie.Title === title);

	if (movie) {
		res.status(200).json(movie);
	} else {
		res.status(404).send("Movie not found.");
	}
});

app.get("/movies/genre/:genreName", (req, res) => {
	const { genreName } = req.params;
	const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

	if (genre) {
		res.status(200).json(genre);
	} else {
		res.status(404).send("Genre not found.");
	}
});

app.get("/movies/director/:directorName", (req, res) => {
	const { directorName } = req.params;
	const director = movies.find((movie) => movie.Director.Name === directorName).Director;

	if (director) {
		res.status(200).json(director);
	} else {
		res.status(404).send("Director not found.");
	}
});

//Update

app.put("/users/:id", (req, res) => {
	const { id } = req.params;
	const updatedUser = req.body;

	let user = users.find((user) => user.id == id);

	if (user) {
		user.username = updatedUser.username;
		res.status(200).json(user);
	} else {
		res.status(400).send("User not found.");
	}
});

app.put("/users/:id/:movieTitle", (req, res) => {
	const { id } = req.params;
	const updatedUser = req.body;

	let user = users.find((user) => user.id == id);

	if (user) {
		user.username = updatedUser.username;
		res.status(200).json(user);
	} else {
		res.status(400).send("User not found.");
	}
});

/*app.put("/users/:id/favorites/:movieID", (req, res) => {
	const { id, movieID } = req.params;
	const user = users.find((user) => user.id === id);
	const movieIndex = user.favorites.findIndex((movie) => movie.id === movieID);

	if (user) {
		user.favorites[movieIndex] = req.body;
		res.status(200).send(user);
	} else {
		res.status(404).send("User not found.");
	}
});*/

//Delete

app.delete("/users/:id", (req, res) => {
	const { id } = req.params;
	const userIndex = users.findIndex((user) => user.id === id);

	if (userIndex === -1) {
		const message = "User not found.";
		res.status(404).send(message);
	} else {
		users.splice(userIndex, 1);
		res.status(204).send();
	}
});

app.delete("/users/:id/favorites/:movieID", (req, res) => {
	const { id, movieID } = req.params;
	const user = users.find((user) => user.id === id);
	const movieIndex = user.favorites.findIndex((movie) => movie.id === movieID);

	if (user) {
		user.favorites.splice(movieIndex, 1);
		res.status(204).send();
	} else {
		res.status(404).send("User not found.");
	}
});

app.listen(8080, () => console.log("Your app is listening on port 8080"));
