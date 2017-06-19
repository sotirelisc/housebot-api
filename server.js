var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  House = require('./api/models/houseModel')
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser')

var morgan = require('morgan')
var passport = require('passport')
var config = require('./api/config/database')

mongoose.Promise = global.Promise;
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

// Index route
app.get('/', function (req, res) {
  res.send('Nothing here!')
})

var house_routes = require('./api/routes/houseRoutes')
house_routes(app)
var user_routes = require('./api/routes/userRoutes')
user_routes(app)

// Return 404 custom message
app.use(function(req, res) {
  res.status(404).send({
    url: req.originalUrl + ' not found'
  })
})

app.listen(port)

console.log('HouseBot API server started on: ' + port)
