'use strict'

let passport = require('passport')
let house = require('../controllers/houseController')
let versioning = require('../config/versioning')

module.exports = (app) => {
  app.route(versioning.url + '/houses')
    .get(house.list_houses)
    .post(passport.authenticate('jwt', {
        session: false
      }),
      (req, res) => {
        var token = getToken(req.headers)
        if (token) {
          // User from token is at req.user
          house.create_house(req, res)
        } else {
          return res.status(403).send({
            success: false,
            message: 'Unauthorized.'
          })
        }
      })

  app.route(versioning.url + '/houses/:houseId')
    .get(house.show_house)
    .put(house.update_house)
    .delete(house.delete_house)

  app.route(versioning.url + '/houses/:houseId/owner')
    .get(house.get_owner)
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
