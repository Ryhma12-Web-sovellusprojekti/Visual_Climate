const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require ("chai-http");
chai.use(chaiHttp);
const server = require("../server");

const baseUrl = "http://localhost:5000";
// test variables
var testUid1="";
var testUid2="";
var token1="";
var token2="";

describe("API test for User Controller", function () {
// start server before tests
before(function(){
    server.start();
})
// stop server after tests
after(function(){
    server.close();
})

    describe("Tests for user creation", function () {
        it("Should create new user", function (done) {
            // http request to create user from api
            chai.request(baseUrl).post("/createuser").set("content-type", "application/json").send(
                {   
                    // user information in request body
                    email: "apitest@example.com",
                    password: "password112",
                    firstName: "Testing",
                    lastName: "Api"
                }
            ).end(function (err, res) {
                // no errors expected
                expect(err).to.be.null;
                // expected response status to be 201
                expect(res).to.have.status(201);
                // expected response text to be User created successfully!
                expect(res.text).to.be.equal("User created successfully!");
                done();
            });
        });

        it("Should create second new user when email is different", function (done) {
            // http request to create user from api
            chai.request(baseUrl).post("/createuser").set("content-type", "application/json").send(
                {
                    // user information in request body
                    email: "apitest1@example.com",
                    password: "password112",
                    firstName: "Testing",
                    lastName: "Api"
                }
            ).end(function (err, res) {
                // no errors expected
                expect(err).to.be.null;
                // expected response status to be 201
                expect(res).to.have.status(201);
                // expected response text to be User created successfully!
                expect(res.text).to.be.equal("User created successfully!");
                done();
            });
        });

        it("Should fail when trying to create new user with email that already exists", function (done) {
            // http request to create user from api
            chai.request(baseUrl).post("/createuser").set("content-type", "application/json").send(
                {
                    // user information in request body
                    email: "apitest@example.com",
                    password: "somepassword",
                    firstName: "Other",
                    lastName: "Testuser"
                }
            ).end(function (err, res) {
                // expected response status to be 404
                expect(res).to.have.status(404);
                // error text gives information that email address is already in use
                expect(res.text).to.be.equal("Couldn't create user! The email address is already in use by another account.");
                done();
            });
        });
    });

    describe('Tests for login', () => {

        it("Should return user id for the first test user", function (done) {
            // http request to get user id
            chai.request(baseUrl).get("/getuser/apitest@example.com").end(function (err, res) {
                // parse the response body to json
                const responseJson = JSON.parse(res.text); 
                console.log(responseJson.userId);
                // save user id to testUid1 variable
                testUid1 = responseJson.userId;
                console.log("This is testUid1: "+ testUid1);
                // no errors expected
                expect(err).to.be.null;
                // expected response status to be 200
                expect(res).to.have.status(200);
                // expected responseJson to be same form as {"userId": testUid1}
                expect(responseJson).to.deep.equal({"userId": testUid1});
                done();
            });
        });

        it("Should return user id for the second test user", function (done) {
            // http request to get user id
            chai.request(baseUrl).get("/getuser/apitest1@example.com").end(function (err, res) {
                // parse the response body to json
                const responseJson = JSON.parse(res.text); 
                console.log(responseJson.userId);
                // save user id to testUid2 variable
                testUid2 = responseJson.userId;
                console.log("Tämä on testi UID2: "+ testUid2);
                // no errors expected
                expect(err).to.be.null;
                // expected response status to be 200
                expect(res).to.have.status(200);
                // expected responseJson to be same form as {"userId": testUid2}
                expect(responseJson).to.deep.equal({"userId": testUid2});
                done();
            });
        });

        it("Should create token to first test user to log in", function (done) {
            // http request to create user token from api
            chai.request(baseUrl).post("/createusertoken").set("content-type", "application/json").send(
                {
                    // userId given in request body
                    userId: testUid1
                }
            ).end(function (err, res) {
                // save response text to token1 variable
                token1 =res.text;
                console.log("This is token1: "+ token1);
                // no errors expected
                expect(err).to.be.null;
                // expected response status to be 200
                expect(res).to.have.status(200);
                done();
            });
        });

        it("Should create token to second test user to log in", function (done) {
            // http request to create user token from api
            chai.request(baseUrl).post("/createusertoken").set("content-type", "application/json").send(
                {
                    // userId given in request body
                    userId: testUid2
                }
            ).end(function (err, res) {
                // save response text to token2 variable
                token2 =res.text;
                console.log("This is token2: "+ token2);
                // no errors expected
                expect(err).to.be.null;
                // expected response status to be 200
                expect(res).to.have.status(200);
                done();
            });
        });
    });

    describe("Tests for user deletion", function () {
        it("Should delete first test user", function (done) {
            // http request to delete user from api
            chai.request(baseUrl).delete(`/deleteuser/${testUid1}`).set('Authorization', `Bearer ${token1}`).set('id', `${testUid1}`).end(function (err, res) {
                // no errors expected
                expect(err).to.be.null;    
                // expected response status to be 200
                expect(res).to.have.status(200);
                // response text gives information that user has been deleted
                expect(res.text).to.be.equal("User has been deleted");
                done();
            });
        });

        it("Should delete second test user", function (done) {
            // http request to delete user from api
            chai.request(baseUrl).delete(`/deleteuser/${testUid2}`).set('Authorization', `Bearer ${token2}`).set('id', `${testUid2}`).end(function (err, res) {
               // no errors expected
               expect(err).to.be.null;    
               // expected response status to be 200
               expect(res).to.have.status(200);
               // response text gives information that user has been deleted
               expect(res.text).to.be.equal("User has been deleted");
               done();
            });
        });
    
        it("Should give user not found when trying to delete same user again", function (done) {
            // http request to delete user from api
            chai.request(baseUrl).delete(`/deleteuser/${testUid2}`).set('Authorization', `Bearer ${token2}`).set('id', `${testUid2}`).end(function (err, res) {
                // expected response status to be 404
                expect(res).to.have.status(404);
                // response text gives information that user does not exist
                expect(res.text).to.be.equal("User does not exist");
                done();
            });
        });
    });

});
