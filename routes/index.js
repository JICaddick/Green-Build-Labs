var express = require('express');
var users = require('./users');
var router = express.Router();

const app = express();

app.get ('/', (req, res) => {
  res.status(200).json({name:'James', says: 'Hello World'});
});

app.use ('/users', users);

module.exports = router;

// index.js this is just the map for your routes. You hit users.js and it will go to the users.js file. You hit materials.js   and it will go to the materials.js file.