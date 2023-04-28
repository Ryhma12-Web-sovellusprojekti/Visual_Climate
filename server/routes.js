const visualsController = require("./controllers/visualsController");
const customViewsController = require("./controllers/customViewsController");
const userController = require("./controllers/userController");
const jwt = require('jsonwebtoken');
const { admin } = require('./firebase.js');


const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    const id = req.headers.id;
    
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).send('Unauthorized');
    }
    
    const idToken = authorizationHeader.split('Bearer ')[1];

    const decoded_payload = jwt.decode(idToken, id, algorithms=['RS256']);

    console.log(decoded_payload);

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const tokenExpirationTimeInSeconds = decoded_payload.exp;

    if (decoded_payload.uid == id && currentTimeInSeconds < tokenExpirationTimeInSeconds) {
      console.log("Token is valid");
      next();
    } else {
      res.status(403).send("Verification failed!");
      console.log("Token is not valid");
    }
}

module.exports = function(app) {
    app.get("/get/visudata/:row/:visu/:table", verifyToken, visualsController.getVisuals1to3);
    app.get("/get/visudata/:row/:visu/", verifyToken, visualsController.getVisuals4to5);

    app.get("/get/visudata/single/:row/:visu/:table", visualsController.getVisuals1to3);
    app.get("/get/visudata/single/:row/:visu/", visualsController.getVisuals4to5);

    app.get("/get/customview/:id", customViewsController.getCustomView);
    app.get("/all/customview/:id", verifyToken, customViewsController.getCustomViews);
    app.post("/create/customview", verifyToken, customViewsController.createCustomView);
    app.delete("/delete/customview/:id", verifyToken, customViewsController.deleteCustomView);
    app.delete("/deleteall/customview/:id", verifyToken, customViewsController.deleteAllCustomViews);

    app.get("/check/:userId", verifyToken, userController.checkUserExists);
    app.get("/getname/:userId",  verifyToken, userController.getDisplayname);
    app.post('/createuser', userController.createUser);
    app.post('/createusertoken', userController.createUserToken);
    app.delete('/deleteuser/:userId', verifyToken, userController.deleteUser);
}
