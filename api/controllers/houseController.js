'use strict'

var mongoose = require('mongoose'),
  House = mongoose.model('Houses'),
  User = mongoose.model('Users')

exports.get_owner = (req, res) => {
  House.findOne({
    _id: req.params.houseId
  }).populate('owner', 'username').exec((err, house) => {
    if (err) {
      res.send(err)
      return handleError(err)
    }
    res.send(house + house.owner.username)
  })
}

exports.list_all_houses = (req, res) => {
  House.find({}, (err, house) => {
    if (err) {
      res.send(err)
    }
    res.json(house)
  })
}

exports.create_a_house = (req, res) => {
  var new_house = new House(req.body)
  // Assign house owner
  new_house.owner = req.user._id
  new_house.save((err, house) => {
    if (err) {
      res.send(err)
    }
    // Find owner (User) and append new_house id to its array
    User.findById(req.user._id, (err, user) => {
      if (err) {
        res.send(err)
      }
      user.houses.push(house._id)
      user.save()
      res.json(house)
    })
  })
}

exports.read_a_house = (req, res) => {
  House.findById(req.params.houseId, (err, house) => {
    if (err) {
      res.send(err)
    }
    res.json(house)
  })
}

exports.update_a_house = (req, res) => {
  House.findOneAndUpdate(req.params.houseId, req.body, {
    new: true
  }, (err, house) => {
    if (err) {
      res.send(err)
    }
    res.json(house)
  })
}

exports.delete_a_house = (req, res) => {
  House.remove({
    _id: req.params.houseId
  }, (err, house) => {
    if (err) {
      res.send(err)
    }
    res.json({
      message: 'House deleted'
    })
  })
}
