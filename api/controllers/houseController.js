'use strict'

var mongoose = require('mongoose'),
  House = mongoose.model('Houses')

exports.list_all_houses = function(req, res) {
  House.find({}, function(err, house) {
    if (err) {
      res.send(err)
    }
    res.json(house)
  })
}

exports.create_a_house = function(req, res) {
  var new_house = new House(req.body)
  new_house.save(function(err, house) {
    if (err) {
      res.send(err)
    }
    res.json(house)
  })
}

exports.read_a_house = function(req, res) {
  House.findById(req.params.houseId, function(err, house) {
    if (err) {
      res.send(err)
    }
    res.json(house)
  })
}

exports.update_a_house = function(req, res) {
  House.findOneAndUpdate(req.params.houseId, req.body, {
    new: true
  }, function(err, house) {
    if (err) {
      res.send(err)
    }
    res.json(house)
  })
}

exports.delete_a_house = function(req, res) {
  House.remove({
    _id: req.params.houseId
  }, function(err, house) {
    if (err) {
      res.send(err)
    }
    res.json({
      message: 'House deleted'
    })
  })
}
