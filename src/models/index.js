const Movie = require("./Movie");
const Genre = require("./Genre");
const Actor = require("./Actor");
const Director = require("./Director");

Movie.belongsToMany(Genre, {through: 'GenresMovies'});
Genre.belongsToMany(Movie, {through: 'GenresMovies'});

Movie.belongsToMany(Actor, {through: 'ActorsMovies'});
Actor.belongsToMany(Movie, {through: 'ActorsMovies'});

Movie.belongsToMany(Director, {through: 'DirectorsMovies'});
Director.belongsToMany(Movie, {through: 'DirectorsMovies'});
