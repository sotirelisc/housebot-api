let mongoose = require('mongoose')
let House = require('../api/models/userModel')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

// Parent block
describe('Users', () => {

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
  })

})
