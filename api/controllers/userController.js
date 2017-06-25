'use strict'

var mongoose = require('mongoose'),
  User = mongoose.model('Users')
var passport = require('passport')
var config = require('../config/database')
require('../config/passport')(passport)
var jwt = require('jsonwebtoken')

exports.show_houses = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err) {
      res.send(err)
    }
    res.json(user.houses)
  })
}

exports.show_user = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err) {
      res.send(err)
    }
    res.json(user.username)
  })
}

exports.sign_up_user = function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({
      success: false,
      message: 'Credentials were not provided.'
    })
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })
    newUser.save(function(err, user) {
      if (err) {
        return res.json({
          success: false,
          message: err
        })
      }
      res.status(201).send({
        success: true,
        message: 'Successfully created new user.',
        user: user
      })
    })
  }
}

exports.sign_in_user = function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err
    if (!user) {
      res.send({
        success: false,
        message: 'Authentication failed.'
      })
    } else {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.sign(user, config.secret)
          res.json({
            success: true,
            username: user.username,
            token: 'JWT ' + token
          })
        } else {
          res.send({
            success: false,
            message: 'Authentication failed.'
          })
        }
      })
    }
  })
}
