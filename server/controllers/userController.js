const { admin } = require('../firebase.js');

//create a new user
exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    const userRecord = await admin.auth().createUser({
      email: req.body.email,
      password: req.body.password,
      displayName: `${req.body.firstName} ${req.body.lastName}`,
      photoURL: "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
    });
      console.log('User created:', userRecord.uid);
      res.status(201).send('User created successfully!');
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send("Couldn't create user! "+ error.message);
    }
};

//create user token for the current user
exports.createUserToken = async (req, res) => {
  const userId = req.body.userId;

  try {
    const token = await admin.auth().createCustomToken(userId, { expiresIn: '3600s' });
    console.log('User token: ', token);
    res.send(token);
  } catch (error) {
    console.error("Error creating user token:", error);
    res.status(500).send("Error creating user token");
  } 
}


    
//check if a user exists by given user ID
exports.checkUserExists = async (req, res) => {
  const userId = req.params.userId;

  try {
    await admin.auth().getUser(userId);
    res.send(`User exists`);
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      res.status(404).send(`User does not exist`);
    } else {
      console.error("Error getting user:", error);
      res.status(500).send("Error getting user");
    }
  }
}

//get user id and displayname by given email
exports.getUserInfo = async (req, res) => {
  const email = req.params.email;
  try {
    // get the user by email
    const user = await admin.auth().getUserByEmail(email);
    const userId = user.uid;
    const displayName = user.displayName;
    res.json({ userId, displayName });
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      res.status(404).send(`User does not exist`);
    } else {
      console.error("Error getting user:", error);
      res.status(500).send("Error getting user");
    }
  }
};

//get users display name by given user ID
exports.getDisplayname = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await admin.auth().getUser(userId);
    const displayName = user.displayName;
    if (displayName) {
    res.send(displayName);
    } else {
    res.send(`User exists but does not have a display name`);
    }
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      res.status(404).send(`User does not exist`);
    } else {
      console.error("Error getting user:", error);
      res.status(500).send("Error getting user");
    }
  }
}

//delete user by given user ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;
  
  try {
    await admin.auth().deleteUser(userId);
    res.send(`User has been deleted`);
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      res.status(404).send(`User does not exist`);
    } else {
      console.error("Error deleting user:", error);
      res.status(500).send("Error deleting user");
    }
  }
}