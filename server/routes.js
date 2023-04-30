const visualsController = require("./controllers/visualsController");
const customViewsController = require("./controllers/customViewsController");
const userController = require("./controllers/userController");
const jwt = require('jsonwebtoken');
const { admin } = require('./firebase.js');

// Verifies the authenticity of the token
const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    const id = req.headers.id;

    // If authorization header is not present or does not start with Bearer, return Unauthorized
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).send('Unauthorized');
    }

    // Retiving the token from the header
    const idToken = authorizationHeader.split('Bearer ')[1];

    // Decoding the token payload with the given ID and algorithm
    const decoded_payload = jwt.decode(idToken, id, algorithms=['RS256']);

    // Logging the decoded payload for debugging purposes
    console.log(decoded_payload);

    // Getting the current time and token expiration time in seconds
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const tokenExpirationTimeInSeconds = decoded_payload.exp;

    // Verifying if the token is valid by checking the uid and expiration time
    if (decoded_payload.uid == id && currentTimeInSeconds < tokenExpirationTimeInSeconds) {
        console.log("Token is valid");
        next();
    } else {
        res.status(403).send("Verification failed!");
        console.log("Token is not valid");
    }
}

module.exports = function(app) {
    // routes to get data for visualizations 1 to 3 in saved customviews when user is not logged in  
    app.get("/get/visudata/single/:row/:visu/:table", visualsController.getVisuals1to3);
    app.get("/get/visudata/single/:row/:visu/", visualsController.getVisuals4to5);

    // routes to get visualizations data when user is logged in
    app.get("/get/visudata/:row/:visu/:table", verifyToken, visualsController.getVisuals1to3);
    app.get("/get/visudata/:row/:visu/", verifyToken, visualsController.getVisuals4to5);

    // route to get saved customviews data when user is not logged in  
    app.get("/get/customview/:id", customViewsController.getCustomView);
    // routes for managing customviews when the user is logged in
    app.get("/all/customview/:id", verifyToken, customViewsController.getCustomViews);
    app.post("/create/customview", verifyToken, customViewsController.createCustomView);
    app.delete("/delete/customview/:id", verifyToken, customViewsController.deleteCustomView);
    app.delete("/deleteall/customview/:id", verifyToken, customViewsController.deleteAllCustomViews);

    //routes to create new user, create token and get user id
    app.get("/getuser/:email", userController.getUserid);
    app.post('/createuser', userController.createUser);
    app.post('/createusertoken', userController.createUserToken);
    //route to delete user when user is logged in
    app.delete('/deleteuser/:userId', verifyToken, userController.deleteUser);
}
