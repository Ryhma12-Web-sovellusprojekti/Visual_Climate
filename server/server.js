const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')

// configure the JSON body parser middleware function
app.use(express.json());
// configure middleware function to handle incoming URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// configuring the Cross Origin Resource Sharing
app.use(cors({
  // set origin to only allow request from http://localhost:3000
  origin: 'http://localhost:3000'
}));

const routes = require('./routes')(app);

let serverInstance = null;

module.exports = {
  // function to start server
  start: function(){
   serverInstance= app.listen(port, () => { console.log(`Server started on port ${port}`) })
  },
  close: function(){
    // function to stop server
    serverInstance.close();
    console.log(`Server closed on port ${port}`);
  }
}
