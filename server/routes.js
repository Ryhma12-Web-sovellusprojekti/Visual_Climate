const visualsController = require("./controllers/visualsController");
const customViewsController = require("./controllers/customViewsController");
const userController = require("./controllers/userController");

const verifyToken = (req, res, next) => {
    const idToken = req.headers.authorization;
    admin.auth().verifyIdToken(idToken)
      .then((decodedToken) => {
        req.user = decodedToken;
        next();
      })
      .catch((error) => {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
      });
  };

module.exports = function(app) {
    app.get("/get/visudata/:row/:visu/:table", verifyToken, visualsController.getVisuals1to3);
    app.get("/get/visudata/:row/:visu/", verifyToken, visualsController.getVisuals4to5);

    app.get("/get/customview/:id", verifyToken, customViewsController.getCustomView);
    app.get("/all/customview/:id", verifyToken, customViewsController.getCustomViews);
    app.post("/create/customview", verifyToken, customViewsController.createCustomView);
    app.delete("/delete/customview/:id", verifyToken, customViewsController.deleteCustomView);
    app.delete("/deleteall/customview/:id", verifyToken, customViewsController.deleteAllCustomViews);

    app.get("/check/:userId", verifyToken, userController.checkUserExists);
    app.get("/getname/:userId", verifyToken, userController.getDisplayname);
    app.post('/createuser', verifyToken, userController.createUser);
    app.delete('/deleteuser/:userId', verifyToken, userController.deleteUser);
};