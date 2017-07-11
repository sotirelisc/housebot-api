'use strict'

let mongoose = require('mongoose')
let House = require('../api/models/houseModel')
let User = require('../api/models/userModel')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

const createHouse = (cb) => {
  // We need to sign-up a User in order to create a House
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
        let credentials = {
          username: "tester",
          password: "prisonbreak"
        }
        // Sign-in test User
        chai.request(server)
          .post('/api/v1/users/signin')
          .send(credentials)
          .end((err, res) => {
            let token = res.body.token
            // Delete test House if exists
            House.remove({
              short_description: "Up on the mountain (demo)"
            }, (err) => {
              // Create new test House
              let house = {
                short_description: "Up on the mountain (demo)",
                long_description: "Nothing like a house not by the sea, but up high on mountain Kerkis.",
                price: 200
              }
              chai.request(server)
                .post('/api/v1/houses')
                .send(house)
                .set('Authorization', token)
                .end((err, res) => {
                  cb(res)
                })
            })
          })
      })
  })
}

// Parent block
describe('Houses', () => {

  describe('/GET api/v1/houses', () => {
    it('should GET all Houses', (done) => {
      chai.request(server)
        .get('/api/v1/houses')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          done()
        })
    })
  })

  describe('/GET api/v1/houses/:houseId', () => {
    it('should GET a House', (done) => {
      createHouse(res => {
        chai.request(server)
          .get('/api/v1/houses/' + res.body._id)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('short_description')
            res.body.should.have.property('long_description')
            res.body.should.have.property('price')
            res.body.should.have.property('owner')
            done()
          })
      })
    })
  })

  describe('/POST api/v1/houses', () => {
    it('should not POST a House without Authorization', (done) => {
      let house = {
        short_description: "Up on the mountain",
        long_description: "Nothing like a house not by the sea, but up high on mountain Kerkis.",
        price: 200
      }
      chai.request(server)
        .post('/api/v1/houses')
        .send(house)
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })

    it('it should POST a house', (done) => {
      createHouse(res => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('short_description')
        res.body.should.have.property('long_description')
        res.body.should.have.property('price')
        res.body.should.have.property('created_at')
        done()
      })
    })
  })

})
