const express = require('express')
const app = express()
const port = 5000
const { rtdb, fsdb} = require('./firebase.js')


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



app.listen(port, () => { console.log(`Server started on port ${port}`) })
