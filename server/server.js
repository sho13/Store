const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const storeItems = require('../store_items.json');

app.use(express.static(path.join(__dirname, '/../client/')));
app.use(express.static(path.join(__dirname, '/../node_modules')));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.get('/shopitems', (req, res) => {
  res.send(storeItems);
})

app.listen(port, (err) => {
  if(err) {
    console.log('Error occurred : ', err);
  }
  console.log('Server is listening to port : ', port);
});
