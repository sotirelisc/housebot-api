'use strict'

let mongoose = require('mongoose'),
  User = mongoose.model('Users')
let passport = require('passport')
let config = require('../config/database')
require('../config/passport')(passport)
let jwt = require('jsonwebtoken')

exports.add_to_watchlist = (req, res) => {
  let house = req.body.house
  User.findById(req.user._id, (err, user) => {
    if (err) {
      res.send(err)
    }
    user.watchlist.push(house)
    user.save()
    res.status(200).json({
      success: true,
      watchlist: user.watchlist
    })
  })
}

exports.show = (req, res, what) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      res.send(err)
    }
    if (what === "user") {
      res.send({
        username: user.username
      })
    } else if (what === "houses") {
      res.send({
        houses: user.houses
      })
    }
  })
}

exports.sign_up_user = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({
      success: false,
      message: 'Credentials were not provided.'
    })
  } else {
    let newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })
    newUser.save((err, user) => {
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

exports.sign_in_user = (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) throw err
    if (!user) {
      res.status(401).send({
        success: false,
        message: 'Authentication failed.'
      })
    } else {
      user.comparePassword(req.body.password, (err, doesMatch) => {
        if (doesMatch && !err) {
          let token = jwt.sign(user, config.secret)
          res.json({
            success: true,
            username: user.username,
            token: 'JWT ' + token
          })
        } else {
          res.status(401).send({
            success: false,
            message: 'Authentication failed.'
          })
        }
      })
    }
  })
}
