const express = require('express')
const app = express()
const port = 5000
const { rtdb } = require('./firebase.js')

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

app.listen(port, () => { console.log(`Server started on port ${port}`) })
