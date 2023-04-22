//verify token
exports.verifyToken = async (req, res) => {
    const idToken = req.headers.authorization.split('Bearer ')[1];
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      res.send(decodedToken);
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(500).send("Error verifying token");
    }
  }