const { rtdb } = require('../firebase.js');

  // get data for graphs (visualizations 1-3)
  exports.getVisuals1to3 = (req, res) => {
    rtdb.ref(req.params.row+'/'+req.params.visu+'/'+req.params.table)
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();
      if (!data) {
        res.status(404).send("Data not found");
        return;
      }
      res.send(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching data");
    });
}

  // get data for graphs (visualizations 4-5)
  exports.getVisuals4to5= (req, res) => {
    rtdb.ref(req.params.row+'/'+req.params.visu)
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();
      if (!data) {
        res.status(404).send("Data not found");
        return;
      }
      res.send(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching data");
    });
  }