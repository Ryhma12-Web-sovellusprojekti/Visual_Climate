const { admin } = require('../firebase.js');

//create a new user
exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    // create user by information from request body 
    const userRecord = await admin.auth().createUser({
      email: req.body.email,
      password: req.body.password,
      displayName: `${req.body.firstName} ${req.body.lastName}`,
      photoURL: "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
    });
    // if no errors, give response user created succesfully
    console.log('User created:', userRecord.uid);
    res.status(201).send('User created successfully!');
  } catch (error) {
    // if there is an error with code auth/email-already-exists, give the information as a response
    if (error.code === "auth/email-already-exists") {
      console.error("Error creating user:", error);
      res.status(404).send("Couldn't create user! "+ error.message);
    } else {
      console.error("Error creating user:", error);
      // if there is an error, give info and the error message
      res.status(500).send("Couldn't create user! "+ error.message);
    }
  }
}

//create user token for the current user
exports.createUserToken = async (req, res) => {
  // id given in request body is saved to userId variable
  const userId = req.body.userId;
  try {
    //creates custom token and saves it to token variable
    const token = await admin.auth().createCustomToken(userId, { expiresIn: '3600s' });
    console.log('User token: ', token);
    // send token as a response
    res.send(token);
  } catch (error) {
    console.error("Error creating user token:", error);
    // if there is an error, give info "Error creating user token"
    res.status(500).send("Error creating user token");
  } 
}

//get user id by given email
exports.getUserid = async (req, res) => {
  // email given in request parameter is saved to email variable
  const email = req.params.email;
  try {
    // get the user by email
    const user = await admin.auth().getUserByEmail(email);
    // save user id to userId variable
    const userId = user.uid;
    // give userId as a response
    res.json({userId});
  } catch (error) {
    // if there is an error with code auth/user-not-found, give info user does not exist
    if (error.code === "auth/user-not-found") {
      res.status(404).send(`User does not exist`);
    } else {
      console.error("Error getting user:", error);
      // if there is some other error, give info "Error getting user"
      res.status(500).send("Error getting user");
    }
  }
};

//delete user by given user ID
exports.deleteUser = async (req, res) => {
  // userId given in request parameter is saved to userId variable
  const userId = req.params.userId;
  
  try {
    // if user with given userId is found, delete the user
    await admin.auth().deleteUser(userId);
    // give "user has been deleted" as a response
    res.send(`User has been deleted`);
  } catch (error) {
    // if there is an error with code auth/user-not-found, give info user does not exist
    if (error.code === "auth/user-not-found") {
      res.status(404).send(`User does not exist`);
    } else {
      console.error("Error deleting user:", error);
      // if there is some other error, give info "Error deleting user"
      res.status(500).send("Error deleting user");
    }
  }
}
