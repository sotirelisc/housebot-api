'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var HouseSchema = new Schema({
  short_description: {
    type: String
  },
  long_description: {
    type: String
  },
  price: {
    type: Number
  },
  featured_image: {
    type: String
  },
  long: {
    type: String
  },
  lat: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'active']
    }],
    default: ['pending']
  },
  listing_type: {
    type: [{
      type: String,
      enum: ['rent', 'buy']
    }]
  }
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Houses', HouseSchema)
