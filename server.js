/*
  to start the server in debug mode:
  set DEBUG=express:* & node server.js
*/

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;

const DB_URL = 'mongodb://localhost:27017/palindrome';
const MESSAGES_COLLECTION = 'messages';
// middleware for parsing json body requests
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded (data from forms)
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

app.get('/api/messages', function(req, res) {
  MongoClient.connect(DB_URL, function(err, db) {
    if (err) return err;

    db.collection(MESSAGES_COLLECTION)
      .find({})
      .toArray(function(err, docs) {
        if (err) return err;

        db.close();
        res.json({ result : docs });
      });
  });
});

app.post('/api/message', function(req, res) {
  MongoClient.connect(DB_URL, function(err, db) {
    if (err) return err;

    let msg = req.body;
    db.collection(MESSAGES_COLLECTION).insert(msg);

    db.close();
    res.status(201).send(msg);
  });
});

app.listen(8080, function() {
  console.log('------------------------ server running ------------------------');
});
