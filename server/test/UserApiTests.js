const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require ("chai-http");
chai.use(chaiHttp);
const server = require("../server");


var testUid1="";
var testUid2="";

describe("API test for User Controller", function () {

before(function(){
    server.start();
})

after(function(){
    server.close();
})

describe("/POST", function () {
    it("should create new user", function (done) {
        chai.request("http://localhost:5000").post("/createuser").set("content-type", "application/json").send(
            {
                email: "apitest@example.com",
                password: "password112",
                firstName: "Testing",
                lastName: "Api"
            }
        ).end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.text).to.be.equal("User created successfully!");
            done();
        });
    });

    it("should create second new user when email is different", function (done) {
        chai.request("http://localhost:5000").post("/createuser").set("content-type", "application/json").send(
            {
                email: "apitest1@example.com",
                password: "password112",
                firstName: "Testing",
                lastName: "Api"
            }
        ).end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.text).to.be.equal("User created successfully!");
            done();
        });
    });

    it("should fail when trying to create new user with email that already exists", function (done) {
        chai.request("http://localhost:5000").post("/createuser").set("content-type", "application/json").send(
            {
                email: "apitest@example.com",
                password: "somepassword",
                firstName: "Other",
                lastName: "Testuser"
            }
        ).end(function (err, res) {
            expect(res).to.have.status(500);
            expect(res.text).to.be.equal("Couldn't create user! The email address is already in use by another account.");
            done();
        });
    });
});

describe("/GET", function () {

    it("should return user id and displayName for the first test user", function (done) {
        chai.request("http://localhost:5000").get("/getuser/apitest@example.com").end(function (err, res) {
            const responseJson = JSON.parse(res.text); // Parse the response body to JSON
            console.log(responseJson);
            testUid1 = responseJson.userId;
            const displayName = responseJson.displayName;
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(responseJson).to.deep.equal({"userId": testUid1, "displayName": displayName});
            done();
        });
    });

    it("should return user id and displayName for the second test user", function (done) {
        chai.request("http://localhost:5000").get("/getuser/apitest1@example.com").end(function (err, res) {
            const responseJson = JSON.parse(res.text); // Parse the response body to JSON
            console.log(responseJson);
            testUid2 = responseJson.userId;
            const displayName = responseJson.displayName;
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(responseJson).to.deep.equal({"userId": testUid2, "displayName": displayName});
            done();
        });
    });
   
    it("should return displayName", function (done) {
        chai.request("http://localhost:5000").get("/getname/"+testUid1).end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.text).to.be.equal("Testing Api");
            done();
        });
    });
});


describe("/DELETE", function () {
    it("should delete first test user by given id", function (done) {
        chai.request("http://localhost:5000").delete("/deleteuser/"+testUid1).end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.text).to.be.equal("User has been deleted");
            done();
        });
    });

    it("should delete second test user by given id", function (done) {
        chai.request("http://localhost:5000").delete("/deleteuser/"+testUid2).end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.text).to.be.equal("User has been deleted");
            done();
        });
    });
   
   
    it("should give user not found when trying to delete same user again", function (done) {
        chai.request("http://localhost:5000").delete("/deleteuser/"+testUid1).end(function (err, res) {
            expect(res).to.have.status(404);
            expect(res.text).to.be.equal("User does not exist");
            done();
        });
    });
});

});
