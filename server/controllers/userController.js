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

      const token = await admin.auth().createCustomToken(userRecord.uid, { expiresIn: '3600s' });
      console.log('User token: ', token);

      res.status(201).send('User created successfully!');
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Error creating user!');
    }
};
    
//check if a user exists
exports.checkUserExists = async (req, res) => {
  const userId = req.params.userId;

  try {
    await admin.auth().getUser(userId);
    res.send(`User with ID ${userId} exists`);
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      res.status(404).send(`User with ID ${userId} does not exist`);
    } else {
      console.error("Error getting user:", error);
      res.status(500).send("Error getting user");
    }
  }
}

exports.getDisplayname = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await admin.auth().getUser(userId);
    const displayName = user.displayName;
    if (displayName) {
    res.send(displayName);
    } else {
    res.send(`User with ID ${userId} exists but does not have a display name`);
    }
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      res.status(404).send(`User with ID ${userId} does not exist`);
    } else {
      console.error("Error getting user:", error);
      res.status(500).send("Error getting user");
    }
  }
}

exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;
  
  try {
    await admin.auth().deleteUser(userId);
    res.send(`User with ID ${userId} has been deleted`);
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      res.status(404).send(`User with ID ${userId} does not exist`);
    } else {
      console.error("Error deleting user:", error);
      res.status(500).send("Error deleting user");
    }
  }
}