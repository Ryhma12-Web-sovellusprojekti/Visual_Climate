const express = require('express')
const app = express()
const port = 5000
const { admin, rtdb, fsdb } = require('./firebase.js')
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000'
}));

// get data for graphs (visualizations 1-3)
app.get("/get/visudata/:row/:visu/:table", (req, res) => {
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
});

// get data for graphs (visualizations 4-5)
app.get("/get/visudata/:row/:visu", (req, res) => {

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
});

//get custom view data with document id
app.get("/get/customview/:id", async (req, res) => {
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
});

//get all the users custom views data
app.get("/all/customview/:id", async (req, res) => {
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
});

//add customview data
app.post("/create/customview", async (req, res) => {
  try {
    console.log(req.body);
    const customJson = {
      title: req.body.title,
      user: req.body.user,
      viewText: req.body.viewText,
      visuals: req.body.visuals
    };
    const response = fsdb.collection("customview").add(customJson);
    res.send(response);
  } catch(error){
    console.error("Error creating custom view:", error);
    res.status(500).send("Error creating custom view");
  }
})


//delete custom view data with document id
app.delete("/delete/customview/:id", async (req, res) => {
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
});

//delete all the users saved custom views
app.delete("/deleteall/customview/:id", async (req, res) => {
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
});

//create a new user
app.post('/createuser', async (req, res) => {

   try {
    console.log(req.body);
    const userRecord = await admin.auth().createUser({
      email: req.body.email,
      password: req.body.password,
      displayName: `${req.body.firstName} ${req.body.lastName}`,
    });
        console.log('User created:', userRecord.uid);
    res.status(201).send('User created successfully!');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user!');
  }
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
