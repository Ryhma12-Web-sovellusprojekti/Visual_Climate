const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const routes = require('./routes')(app);
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.listen(port, () => { console.log(`Server started on port ${port}`) })
