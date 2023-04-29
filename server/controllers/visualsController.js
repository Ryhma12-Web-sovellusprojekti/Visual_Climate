const { rtdb } = require('../firebase.js');

// get data for graphs (visualizations 1-3)
exports.getVisuals1to3 = (req, res) => {
  // the visualization data is retrieved from the path obtained as request parameters from Firebase realtime database
  rtdb.ref(req.params.row + '/' + req.params.visu + '/' + req.params.table)
    .once("value")
    .then((snapshot) => {
      // if data is found, it's saved to data variable
      const data = snapshot.val();
      if (!data) {
        // if data is not found, give response "Data not found"
        res.status(404).send("Data not found");
        return;
      }
      // give data as a response
      res.send(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // if there is some other error, give info "Error fetching data"
      res.status(500).send("Error fetching data");
    });
};

// get data for graphs (visualizations 4-5)
exports.getVisuals4to5 = (req, res) => {
  // the visualization data is retrieved from the path obtained as request parameters from Firebase realtime database
  rtdb.ref(req.params.row + '/' + req.params.visu)
    .once("value")
    .then((snapshot) => {
      // if data is found, it's saved to data variable
      const data = snapshot.val();
      if (!data) {
        // if data is not found, give response "Data not found"
        res.status(404).send("Data not found");
        return;
      }
      // give data as a response
      res.send(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // if there is some other error, give info "Error fetching data"
      res.status(500).send("Error fetching data");
    });
};