const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require ("chai-http");
chai.use(chaiHttp);


describe("get user info", function() {
    it("should return user info", function(done){
        chai.request("http://localhost:5000").get("/getname/wlAWtKVQ6peQbCRs3YiJ6Pt0u4w2").end(function(err, res){
            expect(err).to.be.null;
            expect(res).to.have.status(200)
            done();
        })
    })
})