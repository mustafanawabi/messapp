let express = require('express');
let router = express.Router();
let ObjectId = require('mongodb').ObjectID;
let palindrome = require('../lib/palindrome');
let db = require('../db');
let messageMiddleware = require('../middleware/messages');

const MESSAGES_COLLECTION = 'messages';

// middleware to validate messages and enrich req with additional properties
router.use(messageMiddleware.validate);
router.use(messageMiddleware.enrich);

// GET all messages
router.get('/', function(req, res) {
  db.get().collection(MESSAGES_COLLECTION)
    .find({})
    .toArray(function(err, messages) {
      if (err) return err;

      res.json(messages);
  });
});

// GET specific a message based on the id
router.get('/:id', function(req, res) {
  db.get().collection(MESSAGES_COLLECTION)
    .findOne({'_id': ObjectId(req.params.id)}, function(err, message) {
      if (err) return err;

      if (!message) {
        res.status(404).end();
        return;
      }

      res.json(message);
    });
});

// GET specific a message based on the id and check if it is a palindrome
router.get('/:id/palindrome', function(req, res) {
  db.get().collection(MESSAGES_COLLECTION)
    .findOne({'_id': ObjectId(req.params.id)}, function(err, message) {
      if (err) return err;

      if (!message) {
        res.status(404).end();
        return;
      }

      let result = palindrome(message.text);
      res.json({'palindrome': result});
    });
});

// POST a message
router.post('/', function(req, res) {
  let message = req.body;
  db.get().collection(MESSAGES_COLLECTION).insert(message, function() {
    res.status(201).json(message);
  });
});

// DELETE a message based on the id
router.delete('/:id', function(req, res) {
  db.get().collection(MESSAGES_COLLECTION)
    .findAndRemove({'_id': ObjectId(req.params.id)}, function(err, message) {
      if (err) return err;

      if (!message || (message.value == null)) {
        res.status(404).end();
        return;
      }

      res.status(204).end();
  });
});

module.exports = router;
