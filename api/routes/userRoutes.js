'use strict'

module.exports = function(app) {
  var user = require('../controllers/userController')

  app.route('/users/signup')
    .post(user.sign_up_user)

  app.route('/users/signin')
    .post(user.sign_in_user)

  app.route('/users/:userId')
    .get(user.show_user)

  app.route('/users/:userId/houses')
    .get(user.show_houses)
}
