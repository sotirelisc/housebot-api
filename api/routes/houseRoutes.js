'use strict'

var passport = require('passport')

module.exports = function(app) {
  var house = require('../controllers/houseController')

  app.route('/houses')
    .get(house.list_all_houses)
    .post(passport.authenticate('jwt', {
        session: false
      }),
      function(req, res) {
        var token = getToken(req.headers)
        if (token) {
          console.log("Creates a house: " + req.user)
          house.create_a_house(req, res)
        } else {
          return res.status(403).send({
            success: false,
            message: 'Unauthorized.'
          })
        }
      })

  app.route('/houses/:houseId')
    .get(house.read_a_house)
    .put(house.update_a_house)
    .delete(house.delete_a_house)
}

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
