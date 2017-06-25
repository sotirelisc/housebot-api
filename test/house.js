let mongoose = require('mongoose')
let House = require('../api/models/houseModel')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

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
      chai.request(server)
        .get('/api/v1/houses/594fdbf2579f162b199576eb')
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
    // it('it should POST a house', (done) => {
    //   let house = {
    //     short_description: "Up on the mountain",
    //     long_description: "Nothing like a house not by the sea, but up high on mountain Kerkis.",
    //     price: 200
    //   }
    //   chai.request(server)
    //     .post('/api/v1/houses')
    //     .send(house)
    //     .end((err, res) => {
    //       res.should.have.status(200)
    //       res.body.should.be.a('object')
    //       res.body.house.should.have.property('short_description')
    //       res.body.house.should.have.property('long_description')
    //       res.body.house.should.have.property('price')
    //       res.body.house.should.have.property('created_at')
    //       done()
    //     })
    // })
  })

})
