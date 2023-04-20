const visualsController = require("./controllers/visualsController");
const customViewsController = require("./controllers/customViewsController");
const userController = require("./controllers/userController");


module.exports = function(app) {
    app.get("/get/visudata/:row/:visu/:table", visualsController.getVisuals1to3);
    app.get("/get/visudata/:row/:visu", visualsController.getVisuals4to5);

    app.get("/get/customview/:id", customViewsController.getCustomView);
    app.get("/all/customview/:id", customViewsController.getCustomViews);
    app.post("/create/customview", customViewsController.createCustomView);
    app.delete("/delete/customview/:id", customViewsController.deleteCustomView);
    app.delete("/deleteall/customview/:id", customViewsController.deleteAllCustomViews);

    app.get("/check/:userId", userController.checkUserExists);
    app.get("/getname/:userId", userController.getDisplayname);
    app.post('/createuser', userController.createUser);
    app.delete('/deleteuser/:userId', userController.deleteUser);
};