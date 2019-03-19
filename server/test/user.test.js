const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const app = require('../app')

chai.use(chaiHttp)

let idUser = ''
let idAdmin = ''
let tokenUser = ''
let tokenAdmin = ''

describe('REGISTER USER TEST', function() {
    describe('success', () => {
      it('Should make sure that customers must be register /user/register with POST request', function(done) {
        const user = {
          fullName: 'abcd1',
          email: 'abcd1@gmail.com',
          password: '1Qazxc'
        }

        chai
          .request(app)
          .post('/user/register')
          .send(user)
          .end(function(err, res) {
            should.not.exist(err)
            res.should.have.status(201)
            res.body.should.be.an('object')
            res.body.should.have.property('_id')
            res.body.should.have.property('fullName')
            res.body.should.have.property('email')
            res.body.should.have.property('password')
            done()
          })
      })
      
      it('Should make sure that admin must be register /user/registerAdmin with POST request', function(done) {
        const user = {
          fullName: 'abcde1',
          email: 'abcde1@gmail.com',
          password: '1Qazxc'
        }
        chai
          .request(app)
          .post('/user/registerAdmin')
          .send(user)
          .end(function(err, res) {
            should.not.exist(err)
            res.should.have.status(201)
            res.body.should.be.an('object')
            res.body.should.have.property('_id')
            res.body.should.have.property('fullName')
            res.body.should.have.property('email')
            res.body.should.have.property('password')
            done()
          })
      })
    })

    describe('failed', () => {
        it(`Should make sure that somebody can't be register if email has been taken /user/register with POST request`, function(done) {
          const user = {
            fullName: 'willy',
            email: 'willyprayogo26@gmail.com',
            password: '1Qazxc'
          }
          chai
            .request(app)
            .post('/user/register')
            .send(user)
            .end(function(err, res) {
                res.body.should.be.have.property('message')
                res.body.message.should.equal('Email has been used')
                res.should.have.status(409)
                done()
            })
        })
        it(`Should make sure that somebody can't be register if fullName empty /user/register with POST request`, function(done) {
          const user = {
            fullName: '',
            email: 'willypray@gmail.com',
            password: '1Qazxc'
          }
          chai
            .request(app)
            .post('/user/register')
            .send(user)
            .end(function(err, res) {
                res.body.should.be.have.property('message')
                res.body.message.should.equal('Invalid fullName')
                res.should.have.status(400)
                done()
            })
        })
        it(`Should make sure that somebody can't be register if email not using email format /user/register with POST request`, function(done) {
          const user = {
            fullName: 'willy',
            email: 'aasada',
            password: '1Qazxc'
          }
          chai
            .request(app)
            .post('/user/register')
            .send(user)
            .end(function(err, res) {
                res.body.should.be.have.property('message')
                res.body.message.should.equal('Invalid email')
                res.should.have.status(400)
                done()
            })
        })
        it(`Should make sure that somebody can't be register if password is not good /user/register with POST request`, function(done) {
          const user = {
            fullName: 'willy',
            email: 'willyprayogo26910@gmail.com',
            password: 'abc'
          }
          chai
            .request(app)
            .post('/user/register')
            .send(user)
            .end(function(err, res) {
                res.body.should.be.have.property('message')
                res.body.message.should.equal('Password must contain at least one letter, at least one number, and be longer than six charaters.')
                res.should.have.status(400)
                done()
            })
        })
    })
})

describe('LOGIN TEST', () => {
    describe('success', () => {
        it(`Should make sure that customer login /user/login with POST request`, function(done) {
            const user = {
              email: 'abcd@gmail.com',
              password: '1Qazxc'
            }
            chai
              .request(app)
              .post('/user/login')
              .send(user)
              .end(function(err, res){
                res.should.have.status(200)
                res.body.should.have.property('email')
                res.body.access_token.should.to.be.a('string')
                res.body.role.should.equal('customer')
                idUser = res.body.id
                tokenUser = res.body.access_token
                done()
            })
        })
        it(`Should make sure that admin login /user/login with POST request`, function(done) {
            const user = {
              email: 'abcde@gmail.com',
              password: '1Qazxc'
            }
            chai
              .request(app)
              .post('/user/login')
              .send(user)
              .end(function(err, res){
                res.should.have.status(200)
                res.body.should.have.property('email')
                res.body.access_token.should.to.be.a('string')
                res.body.role.should.equal('admin')
                idAdmin = res.body.id
                tokenAdmin = res.body.access_token
                done()
            })
        })
    })

    describe('failed', () => {
        it(`Should make sure that email can't login if have wrong or empty email /user/login with POST request`, function(done) {
        const user = {
            email: 'willy@ma.com',
            password: '1Qazxc'
        }
        chai
            .request(app)
            .post('/user/login')
            .send(user)
            .end(function(err, res) {
                res.body.should.be.have.property('message')
                res.body.message.should.equal('Wrong email/password')
                res.should.have.status(400)
                done()
            })
        })
    })
})