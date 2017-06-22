'use strict'

var passport = require('passport')

module.exports = function(app) {
  var house = require('../controllers/houseController')
  var versioning = require('../config/versioning')

  app.route(versioning.url + '/houses')
    .get(house.list_all_houses)
    .post(passport.authenticate('jwt', {
        session: false
      }),
      function(req, res) {
        var token = getToken(req.headers)
        if (token) {
          // User from token is at req.user
          house.create_a_house(req, res)
        } else {
          return res.status(403).send({
            success: false,
            message: 'Unauthorized.'
          })
        }
      })

  app.route(versioning.url + '/houses/:houseId')
    .get(house.read_a_house)
    .put(house.update_a_house)
    .delete(house.delete_a_house)
}

// JWT approach of getting token from request headers
const getToken = (headers) => {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ')
    if (parted.length === 2) {
      return parted[1]
    } else {
      return null
    }
  } else {
    return null
  }
}
