'use strict'

module.exports = function(app) {
  var user = require('../controllers/userController')

  app.route('/signup')
    .post(user.sign_up_user)

  app.route('/signin')
    .post(user.sign_in_user)
}
