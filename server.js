let express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser')

let morgan = require('morgan')
let passport = require('passport')
let config = require('./api/config/database')

let house_routes = require('./api/routes/houseRoutes')
let user_routes = require('./api/routes/userRoutes')

mongoose.Promise = global.Promise
mongoose.connect(config.database)

app.use(morgan('combined'))

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(passport.initialize())

// Index route
app.get('/', (req, res) => {
  res.send('Nothing here!')
})

house_routes(app)
user_routes(app)

// Return 404 custom message
app.use((req, res) => {
  res.status(404).send({
    url: req.originalUrl + ' not found'
  })
})

app.listen(process.env.PORT || 3000)

console.log('HouseBot API is up and running!')

// Export server for testing
module.exports = app
