'use strict'

module.exports = function(app) {
  var user = require('../controllers/userController')

  app.route('/users/signup')
    .post(user.sign_up_user)

  app.route('/users/signin')
    .post(user.sign_in_user)
}
