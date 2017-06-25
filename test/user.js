'use strict'

let mongoose = require('mongoose')
let House = require('../api/models/userModel')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

// Parent block
describe('Users', () => {

  describe('/GET api/v1/users/userId', () => {
    it('should GET a User', (done) => {
      chai.request(server)
        .get('/api/v1/users/594814d59427e46beb895951')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('username')
          done()
        })
    })

    it('should GET all Houses of User', (done) => {
      chai.request(server)
        .get('/api/v1/users/594814d59427e46beb895951/houses')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('houses').be.a('array')
          done()
        })
    })
  })

  describe('/POST api/v1/users', () => {
    it('should POST (sign-up) a User', (done) => {
      let user = {
        username: "tester",
        password: "prisonbreak",
        email: "tester@housebot.io"
      }
      // First, delete test User if exists
      User.remove({
        username: "tester"
      }, function(err) {
        chai.request(server)
          .post('/api/v1/users/signup')
          .send(user)
          .end((err, res) => {
            res.should.have.status(201)
            res.body.should.be.a('object')
            res.body.should.have.property('user')
            res.body.should.have.property('success').be.true
            done()
          })
      })
    })

    it('should not POST (sign-up) a User without credentials', (done) => {
      let user = {
        username: "",
        password: "",
        email: ""
      }
      chai.request(server)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          res.body.should.be.a('object')
          res.body.should.have.property('success').be.false
          done()
        })
    })

    it('should not POST (sign-up) a User with same email', (done) => {
      let user = {
        username: "tester",
        password: "prisonbreak",
        email: "tester@housebot.io"
      }
      let second_user = {
        username: "demo",
        password: "prisonbreak",
        email: "tester@housebot.io"
      }
      // First, delete test User if exists
      User.remove({
        username: "tester"
      }, function(err) {
        // Sign-up default test User
        chai.request(server)
          .post('/api/v1/users/signup')
          .send(user)
          .end((err, res) => {
            // Sign-up second User with same email
            chai.request(server)
              .post('/api/v1/users/signup')
              .send(second_user)
              .end((err, res) => {
                res.body.should.be.a('object')
                res.body.should.have.property('success').be.false
                done()
              })
          })
      })
    })
  })

})
