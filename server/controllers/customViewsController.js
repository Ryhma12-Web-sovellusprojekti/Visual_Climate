const { fsdb } = require('../firebase.js');

// get Custom View
exports.getCustomView = async (req, res) => {
  try {
    // get document from Firestore database collection named customview where given document id exists 
    const doc = await fsdb.collection('customview').doc(req.params.id).get();
    if (doc.exists) {
      // if document exists, its data is returned as a response
      res.send(doc.data());
    } else {
      // if document don't exists, given info is document not found
      res.status(404).send("Document not found");
    }
  } catch (error) {
    console.error("Error getting document:", error);
    // if there is other errors, given info is error getting document
    res.status(500).send("Error getting document");
  }
}

//get all the users customviews data
exports.getCustomViews = async (req, res) => {
  // id given as a request parameter is saved to id variable
  const id = req.params.id;
  // search documents from Firestore database customview collection where users value is same as id
  await fsdb.collection("customview")
    .where("user", "==", id)
    .get()
    .then((querySnapshot) => {
      // if querySnapshot is not empty, all the customviews data is saved to documents variable
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      // send documents as a response
      res.send(documents);
    })
    .catch((error) => {
      console.error("Error getting documents:", error);
      // if there is an error, give message error getting documents
      res.status(500).send("Error getting documents");
    });
}

// create new customview
exports.createCustomView = async (req, res) => {
  try {
    console.log(req.body);
    // get information from request body  
    const customJson = {
      title: req.body.title,
      user: req.body.user,
      viewText: req.body.viewText,
      visuals: req.body.visuals,
      visuTexts: req.body.visuTexts,
      sidebySide: req.body.sidebySide
    };

    // save information to new document in Firestore database customview collection
    const response = await fsdb.collection("customview").add(customJson);
    // give response
    res.send(response);

  } catch (error) {
    console.error("Error creating custom view:", error);
    // if there is an error, give info error creating custom view
    res.status(500).send("Error creating custom view");
  }
}

//delete custom view data with document id
exports.deleteCustomView = async (req, res) => {
  // document id given as a request parameter is saved to id variable
  const id = req.params.id;
  // give path to database where to search the document 
  const docRef = fsdb.collection("customview").doc(id);
  // get the document
  const doc = await docRef.get();
  // if document is empty give info document not found.
  if (!doc.exists) {
    res.status(404).send(`Document with ID ${id} not found.`);
    return;
  }
  // if document is not empty, delete the document
  await docRef.delete()
    .then(() => {
      res.send(`Document with ID ${id} was deleted successfully.`);
    })
    .catch((error) => {
      console.error("Error deleting document:", error);
      // if there is an error, give info error deleting document
      res.status(500).send("Error deleting document");
    });
}

//delete all the users saved custom views
exports.deleteAllCustomViews = async (req, res) => {
  // user id given as a request parameter is saved to id variable
  const id = req.params.id;
  try {
    // search documents from Firestore database customview collection where users value is same as id
    const querySnapshot = await fsdb.collection("customview")
      .where("user", "==", id)
      .get();
    // if there isn't any documents, give info No documents found for user
    if (querySnapshot.empty) {
      res.status(404).send(`No documents found for user ${id}`);
      return;
    }
    // if there is documents found, delete all the documents at once
    const batch = fsdb.batch();
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    // when all the documents is been deleted, give info All custom views were deleted successfully
    res.send(`All custom views for user ${id} were deleted successfully.`);

  } catch (error) {
    console.error("Error deleting documents:", error);
     // if there is an error, give info error deleting documents
    res.status(500).send("Error deleting documents");
  }
}
