'use strict'

module.exports = function(app) {
  var user = require('../controllers/userController')
  var versioning = require('../config/versioning')

  app.route(versioning.url + '/users/signup')
    .post(user.sign_up_user)

  app.route(versioning.url + '/users/signin')
    .post(user.sign_in_user)

  app.route(versioning.url + '/users/:userId')
    .get((req, res) => {
      user.show(req, res, "user")
    })

  app.route(versioning.url + '/users/:userId/houses')
    .get((req, res) => {
      user.show(req, res, "houses")
    })
}
