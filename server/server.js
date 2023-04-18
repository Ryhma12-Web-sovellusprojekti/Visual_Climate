const express = require('express')
const app = express()
const port = 5000
const { admin, rtdb, fsdb} = require('./firebase.js')


app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

// get data for graphs
app.get("/get/:row/:visu/:table", (req, res) => {
    rtdb
      .ref(req.params.row+'/'+req.params.visu+'/'+req.params.table)
      .once("value")
      .then((snapshot) => {
        res.send(snapshot.val());
      });
  });

//get custom view data with document id
app.get("/get/customview/:id", async (req, res) => {
  const docRef = await doc(collection(fsdb, "customview"), req.params.id);
  getDoc(docRef)
     .then((doc) => {
         if (doc.exists()) {
          res.send(doc.data());
         } else {
          res.status(404).send("Document not found");
         }
     })
     .catch((error) => {
      console.error("Error getting document:", error);
      res.status(500).send("Error getting document");
     })
});

//check if a user exists
app.get("/auth/:userId", async (req, res) => {
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
});


app.listen(port, () => { console.log(`Server started on port ${port}`) })
