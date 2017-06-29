'use strict'

let passport = require('passport')
let user = require('../controllers/userController')
let versioning = require('../config/versioning')

module.exports = (app) => {
  app.route(versioning.url + '/users/signup')
    .post(user.sign_up_user)

  app.route(versioning.url + '/users/signin')
    .post(user.sign_in_user)

  app.route(versioning.url + '/watchlist')
    .post(passport.authenticate('jwt', {
        session: false
      }),
      (req, res) => {
        var token = getToken(req.headers)
        if (token) {
          // User from token is at req.user
          user.add_to_watchlist(req, res)
        } else {
          return res.status(403).send({
            success: false,
            message: 'Unauthorized.'
          })
        }
      })

  app.route(versioning.url + '/users/:userId')
    .get((req, res) => {
      user.show(req, res, "user")
    })

  app.route(versioning.url + '/users/:userId/houses')
    .get((req, res) => {
      user.show(req, res, "houses")
    })
}

// JWT approach of getting token from request headers
const getToken = (headers) => {
  if (headers && headers.authorization) {
    let parted = headers.authorization.split(' ')
    if (parted.length === 2) {
      return parted[1]
    } else {
      return null
    }
  } else {
    return null
  }
}
