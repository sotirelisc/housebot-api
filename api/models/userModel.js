'use strict'

let mongoose = require('mongoose')
let bcrypt = require('bcrypt-nodejs')
let Schema = mongoose.Schema

let UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  full_name: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  user_type: {
    type: [{
      type: String,
      enum: ['regular', 'owner']
    }],
    default: ['regular']
  },
  houses: [{
    type: Schema.Types.ObjectId,
    ref: 'House'
  }]
})

UserSchema.pre('save', function(next) {
  let user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          return next(err)
        }
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, doesMatch) => {
    if (err) {
      return cb(err)
    }
    cb(null, doesMatch)
  })
}

module.exports = mongoose.model('Users', UserSchema)
