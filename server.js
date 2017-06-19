var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  House = require('./api/models/houseModel'),
  bodyParser = require('body-parser')

var morgan = require('morgan')
var passport = require('passport')
var config = require('./config/database')

mongoose.Promse = global.Promise;
mongoose.connect(config.database)

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(passport.initialize())

// Return 404 custom message
app.use(function(req, res) {
  res.status(404).send({
    url: req.originalUrl + ' not found'
  })
})

var houseRoutes = require('./api/routes/houseRoutes')
var userRoutes = require('./api/routes/userRoutes')

app.use('/api', houseRoutes)
app.use('/api', userRoutes)

app.listen(port)

console.log('HouseBot API server started on: ' + port)
