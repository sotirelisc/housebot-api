let mongoose = require('mongoose')
let House = require('../api/models/houseModel')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

// Parent block
describe('Houses', () => {
  /*
   * Test the /GET route
   */
  describe('/GET api/v1/houses', () => {
    it('it should GET all houses', (done) => {
      chai.request(server)
        .get('/api/v1/houses')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          done()
        })
    })
  })

  describe('/POST api/v1/houses', () => {
    it('it should not POST a house without Authorization', (done) => {
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
