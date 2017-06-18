var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  House = require('./api/models/houseModel'),
  bodyParser = require('body-parser')

mongoose.Promse = global.Promise;
mongoose.connect('mongodb://housebot:kanieloutis@ds131432.mlab.com:31432/housebot')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use(function(req, res) {
  res.status(404).send({
    url: req.originalUrl + ' not found'
  })
})

var routes = require('./api/routes/houseRoutes')
routes(app)

app.listen(port)

console.log('HouseBot API server started on: ' + port)
