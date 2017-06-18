'use strict'

module.exports = function(app) {
  var house = require('../controllers/houseController')

  app.route('/houses')
    .get(house.list_all_houses)
    .post(house.create_a_house)

  app.route('/houses/:houseId')
    .get(house.read_a_house)
    .put(house.update_a_house)
    .delete(house.delete_a_house)
}
