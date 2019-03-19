const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const app = require('../app')

chai.use(chaiHttp)

let idAdmin = ''
let tokenAdmin = ''
let idItem = ''

describe('LOGIN TEST', () => {
    describe('success', () => {
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

describe('ADD ITEMS TEST', () => {
    describe('success', () => {
      it('should create a new product when user login role is admin when request to /items with POST request', function(done){
        const product = {
          name: 'botol',
          amount: 10,
          price: 1500,
          // picture: res.body.image,
          user: idAdmin
        }
        chai
          .request(app)
          .post('/items')
          .set('access_token', tokenAdmin)
          .send(product)
          .end(function(err, res){
            should.not.exist(err)
            res.should.have.status(201)
            res.body.should.be.an('object')
            res.body.should.have.property('_id')
            res.body.should.have.property('name')
            res.body.should.have.property('amount')
            res.body.should.have.property('price')
            // res.body.should.have.property('picture')
            idItem = res.body._id
            done();
          })
      }).timeout(10000)
    })
  
    describe('failed', () => {
      it('should not create a new product when no login token when request to /items with POST request', function(done){
        const product = {
          name: 'botol',
          amount: 10,
          price: 2000
        }
        chai
          .request(app)
          .post('/items')
          .send(product)
          .end(function(err, res) {
            res.should.have.status(401)
            done()
          })
      })
    })
})

describe('READ ITEM', () => {
    describe('success', () => {
      it('Should read all products when request to /items with GET request', function(done){
        chai
          .request(app)
          .get('/items')
          .end(function(err, res){
            console.log(res.body)
            should.not.exist(err)
            res.status.should.equal(200)
            done()
          })
      })
    })
})

describe('UPDATE ITEM', () => {
    describe('success', () => {
      it('Should update all products when request to /items/:id with PUT request', function(done){
        const product = {
          name: 'botol2',
          amount: 12,
          price: 2000,
          // picture: res.body.image
        }
        chai
          .request(app)
          .put(`/items/${idItem}`)
          .set('access_token', tokenAdmin)
          .send(product)
          .end(function(err, res){
            should.not.exist(err)
            res.status.should.equal(200)
            done()
          })
      }).timeout(10000)
    })
  
    describe('failed', () => {
      it('should not update a product when no login token when request to /items/:id with POST request', function(done){
        const product = {
          name: 'botol',
          amount: 30,
          price: 2000
        }
        chai
          .request(app)
          .put(`/items/${idItem}`)
          .send(product)
          .end(function(err, res) {
            should.not.exist(err)
            res.status.should.equal(401)
            done()
          })
      })
    })
})

describe('DELETE ITEM', () => {
    describe('success', () => {
      it('Should make sure that successfully erase a product when request to /remove with DELETE request', function (done){
      chai
        .request(app)
        .delete(`/items/${idItem}`)
        .set('access_token', tokenAdmin)
        .end(function(err, res){
            should.not.exist(err)
            res.status.should.equal(200)
            done()
        })
      })
    })
  
  
    describe('failed', () => {
      it('Should make sure that failed to erase a product when not authenticated that request to /remove with DELETE request', function (done){
        chai
          .request(app)
          .delete(`/items/${idItem}`)
          .end(function(err, res){
            should.not.exist(err)
            res.status.should.equal(401)
            done()
          })
      })
    })
})