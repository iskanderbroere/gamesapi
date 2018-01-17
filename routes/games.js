// routes/games.js
const router = require('express').Router()
const { Game } = require('../models')
const passport = require('../config/auth')

router.get('/games', (req, res, next) => {
  Game.find()
    // Newest games first
    .sort({ createdAt: -1 })
    // Send the data in JSON format
    .then((games) => res.json(games))
    // Throw a 500 error if something goes wrong
    .catch((error) => next(error))
  })
  .get('/games/:id', (req, res, next) => {
    const id = req.params.id
    Game.findById(id)
      .then((game) => {
        if (!game) { return next() }
        res.json(game)
      })
      .catch((error) => next(error))
  })
  .post('/games', passport.authorize('jwt', { session: false }), (req, res, next) => {
    // Once authorized, the user data should be in `req.account`!
    if (!req.account) {
      const error = new Error('Unauthorized')
      error.status = 401
      return next(error)
    }

    let newGame = req.body
    newGame.authorId = req.account._id

    Game.create(newGame)
      .then((game) => {
        res.status = 201
        res.json(game)
      })
      .catch((error) => next(error))
  })
  .put('/games/:id', (req, res, next) => {
    const gameId = req.params.id
    let update = req.body

    Game.findOneAndUpdate(gameId, update)
      .then((game) => {
        if (!game) return next()
        res.json(game)
      })
      .catch((error) => next(error))
  })
  .patch('/games/:id', (req, res, next) => {
    const gameId = req.params.id
    let update = req.body

    Game.findOneAndUpdate(gameId, update)
      .then((game) => {
        if (!game) return next()
        res.json(game)
      })
      .catch((error) => next(error))
  })
  .delete('/games/:id', (req, res, next) => {
    const gameId = req.params.id

    Game.findOneAndRemove(gameId)
      .then((game) => {
        if (!game) return next()
        res.json(game)
      })
      .catch((error) => next(error))
  })

module.exports = router
