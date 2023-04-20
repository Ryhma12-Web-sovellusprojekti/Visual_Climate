const { fsdb } = require('../firebase.js');
  
  // get Custom View
  exports.getCustomView = async (req, res) => {
    try {
      const doc = await fsdb.collection('customview').doc(req.params.id).get();
      if (doc.exists) {
        res.send(doc.data());
      } else {
        res.status(404).send("Document not found");
      }
    } catch (error) {
      console.error("Error getting document:", error);
      res.status(500).send("Error getting document");
    }
  }
//get all the users custom views data
exports.getCustomViews = async (req, res) => {
    const id = req.params.id;
    await fsdb.collection("customview")
      .where("user", "==", id)
      .get()
      .then((querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({...doc.data(), id: doc.id});
        });
        res.send(documents);
      })
      .catch((error) => {
        console.error("Error getting documents:", error);
        res.status(500).send("Error getting documents");
      });
  }
  
    // post new customview
exports.createCustomView = async (req, res) => {
    try {
      console.log(req.body);
      const customJson = {
        title: req.body.title,
        user: req.body.user,
        viewText: req.body.viewText,
        visuals: req.body.visuals
      };
      const response = await fsdb.collection("customview").add(customJson);
      res.send(response);
    } catch(error){
      console.error("Error creating custom view:", error);
      res.status(500).send("Error creating custom view");
    }
  }

  //delete custom view data with document id
  exports.deleteCustomView = async (req, res) => {
    const id = req.params.id;
  
    const docRef = fsdb.collection("customview").doc(id);
    const doc = await docRef.get();
  
    if (!doc.exists) {
      res.status(404).send(`Document with ID ${id} not found.`);
      return;
    }
  
    await docRef.delete()
      .then(() => {
        res.send(`Document with ID ${id} was deleted successfully.`);
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
        res.status(500).send("Error deleting document");
      });
  }

  //delete all the users saved custom views
  exports.deleteAllCustomViews = async (req, res) => {
    const id = req.params.id;
  
    try {
      const querySnapshot = await fsdb.collection("customview")
        .where("user", "==", id)
        .get();
  
      if (querySnapshot.empty) {
        res.status(404).send(`No documents found for user ${id}`);
        return;
      }
  
      const batch = fsdb.batch();
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
  
      await batch.commit();
  
      res.send(`All custom views for user ${id} were deleted successfully.`);
  
    } catch (error) {
      console.error("Error deleting documents:", error);
      res.status(500).send("Error deleting documents");
    }
  }