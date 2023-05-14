const express = require('express');
const movieRouter = require('./movie.router');
const genreRouter = require('./genre.router');
const actorRouter = require('./actor.router');
const directorRouter = require('./director.router');
const router = express.Router();

router.use('/movies', movieRouter)
router.use('/genres', genreRouter)
router.use('/actors', actorRouter)
router.use('/directors', directorRouter)

module.exports = router;