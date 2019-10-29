var assert = require('chai').assert;
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp)
//import chaiHttp from 'chai-http';
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe("Gets all items from database", () => {
    chai.request(app)
    .get('/api/items')
    .end(function(err,res){
        expect(res).to.have.status(200);
    });
});

// describe("Items", () => {
//     describe("GET ", () => {
//         it("should get all items", (done) => {
//             chai.request(app)
//             .get('/api/items')
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.as('object');
//                 done()
//             })
//         })
//     })
// })