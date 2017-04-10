/*
  REST APIs to get, post, and deconste messages
  You can also check if a message is a palindrome

  To start the server:
  node server.js

  To start the server in debug mode:
  set DEBUG=express:* & node server.js
*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// set static files path
app.use(express.static(path.join(__dirname, 'public')));

// for parsing json body requests
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded (data from forms)
app.use(bodyParser.urlencoded({ extended: true }));

// set routes
app.use(require('./controllers/views.js'));
app.use('/api/messages', require('./controllers/messages.js'));

app.listen(8080, function() {
  console.log('------------------------ server running ------------------------');
});
