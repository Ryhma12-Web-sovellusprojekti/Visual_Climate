const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000'
}));

const routes = require('./routes')(app);

let serverInstance = null;

module.exports = {
  start: function(){
   serverInstance= app.listen(port, () => { console.log(`Server started on port ${port}`) })
  },
  close: function(){
    serverInstance.close();
    console.log(`Server closed on port ${port}`);
  }
}
