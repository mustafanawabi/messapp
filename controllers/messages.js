const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const palindrome = require('../lib/palindrome');
const MESSAGES_COLLECTION = 'messages';
const MESSAGE_SCHEMA = require('../models/message');
const validator = require('jsonschema').validate;
const db = require('../db');

// middleware to validate messages
router.use(function(req, res, next) {
  if (req.method == 'POST') {
    let message = req.body;
    let validatorResult = validator(message, MESSAGE_SCHEMA);

    if (validatorResult.errors.length > 0) {
      res.status(400).send(validatorResult.errors[0].stack);
      return;
    }
  }

  next();
});

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
  let id = req.params.id;
  db.get().collection(MESSAGES_COLLECTION)
    .findOne({'_id': ObjectId(id)}, function(err, message) {
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
  let id = req.params.id;
  db.get().collection(MESSAGES_COLLECTION)
    .findOne({'_id': ObjectId(id)}, function(err, message) {
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
    res.status(201).send(message);
  });
});

// DELETE a message based on the id
router.delete('/:id', function(req, res) {
  let id = req.params.id;
  db.get().collection(MESSAGES_COLLECTION)
    .findAndRemove({'_id': ObjectId(id)}, function(err, message) {
      if (err) return err;

      if (!message || (message.value == null)) {
        res.status(404).end();
        return;
      }

      res.status(204).end();
  });
});

module.exports = router;
