const express = require("express");
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const palindrome = require('../lib/palindrome');

const DB_URL = 'mongodb://localhost:27017/palindrome';
const MESSAGES_COLLECTION = 'messages';

// GET all messages
router.get('/', function(req, res) {
  MongoClient.connect(DB_URL, function(err, db) {
    if (err) return err;

    db.collection(MESSAGES_COLLECTION)
      .find({})
      .toArray(function(err, messages) {
        db.close();
        if (err) return err;

        res.json(messages);
    });
  });
});

// GET specific a message based on the id
router.get('/:id', function(req, res) {
  MongoClient.connect(DB_URL, function(err, db) {
    if (err) return err;

    let id = req.params.id;
    db.collection(MESSAGES_COLLECTION)
      .findOne({ '_id': ObjectId(id) }, function(err, message) {
        db.close();
        if (err) return err;

        if (!message) {
          res.status(404).end();
          return;
        }

        res.json(message);
      });
  });
});

// GET specific a message based on the id and check if it is a palindrome
router.get('/:id/palindrome', function(req, res) {
  MongoClient.connect(DB_URL, function(err, db) {
    if (err) return err;

    let id = req.params.id;
    db.collection(MESSAGES_COLLECTION)
      .findOne({ '_id': ObjectId(id) }, function(err, message) {
        db.close();
        if (err) return err;

        if (!message) {
          res.status(404).end();
          return;
        }

        let result = palindrome(message.text);
        res.json({ 'palindrome': result });
      });
  });
});

// POST a message
router.post('/', function(req, res) {
  MongoClient.connect(DB_URL, function(err, db) {
    if (err) return err;

    let message = req.body;
    db.collection(MESSAGES_COLLECTION).insert(message, function() {
      db.close();
      if (err) return err;

      res.status(201).send(message);
    });
  });
});

// DELETE a message based on the id
router.delete('/:id', function(req, res) {
  MongoClient.connect(DB_URL, function(err, db) {
    if (err) return err;

    let id = req.params.id;
    db.collection(MESSAGES_COLLECTION)
      .findAndRemove({ '_id': ObjectId(id) }, function(err, message) {
        db.close();
        if (err) return err;

        if (!message || (message.value == null)) {
          res.status(404).end();
          return;
        }

        res.status(204).end();
    });
  });
});

module.exports = router;
