'use strict'

var mongoose = require('mongoose'),
  House = mongoose.model('Houses'),
  User = mongoose.model('Users')

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
  // Assign house owner
  new_house.owner = req.user._id
  new_house.save(function(err, house) {
    if (err) {
      res.send(err)
    }
    // Find owner (User) and append new_house id to its array
    User.findById(req.user._id, function(err, user) {
      if (err) {
        res.send(err)
      }
      user.houses.push(house._id)
      user.save()
      res.json(house)
    })
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
