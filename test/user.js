'use strict'

let mongoose = require('mongoose')
let User = require('../api/models/userModel')
let House = require('../api/models/houseModel')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

const signUpTestUser = (cb) => {
  let user = {
    username: "tester",
    password: "prisonbreak",
    email: "tester@housebot.io"
  }
  // First, delete test User if exists
  User.remove({
    username: "tester"
  }, (err) => {
    // Sign-up test User
    chai.request(server)
      .post('/api/v1/users/signup')
      .send(user)
      .end((err, res) => {
        if (err) {
          return cb(err)
        }
        cb(null, res)
      })
  })
}

const signInTestUser = (credentials, cb) => {
  chai.request(server)
    .post('/api/v1/users/signin')
    .send(credentials)
    .end((err, res) => {
      cb(res)
    })
}

// Parent block
describe('Users', () => {

  describe('/GET api/v1/watchlist', () => {
    it('should GET a watchlist (favorite Houses) of current User', (done) => {
      signUpTestUser((err, token) => {
        chai.request(server)
          .get('/api/v1/watchlist')
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('username')
            done()
          })
      })
    })
  })

  describe('/GET api/v1/users/:userId', () => {
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
  })

  describe('/GET api/v1/users/:userId/houses', () => {
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
      signUpTestUser((err, res) => {
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.should.have.property('user')
        res.body.should.have.property('success').be.true
        done()
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
      }, (err) => {
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

    it('should not POST (sign-up) a User with same username', (done) => {
      let user = {
        username: "tester",
        password: "prisonbreak",
        email: "tester@housebot.io"
      }
      let second_user = {
        username: "tester",
        password: "prisonbreak",
        email: "tester@housebot.ai"
      }
      // First, delete test User if exists
      User.remove({
        username: "tester"
      }, (err) => {
        // Sign-up default test User
        chai.request(server)
          .post('/api/v1/users/signup')
          .send(user)
          .end((err, res) => {
            // Sign-up second User with same username
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

    it('should POST (sign-in) a User with valid credentials', (done) => {
      signUpTestUser((err, res) => {
        // Valid credentials for test User
        let credentials = {
          username: "tester",
          password: "prisonbreak"
        }
        signInTestUser(credentials, (res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('username')
          res.body.should.have.property('token')
          res.body.should.have.property('success').be.true
          done()
        })
      })
    })

    it('should not POST (sign-in) a User with invalid credentials', (done) => {
      signUpTestUser((err, res) => {
        // Invalid credentials for test User
        let credentials = {
          username: "tester",
          password: "wrongpass"
        }
        signInTestUser(credentials, (res) => {
          res.body.should.be.a('object')
          res.body.should.have.property('success').be.false
          done()
        })
      })
    })
  })

})
