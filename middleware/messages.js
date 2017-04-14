let validator = require('jsonschema').validate;
let schema = require('../models/message');
let dateFormat = require('dateformat');

module.exports.validate = function(req, res, next) {
  if (req.method == 'POST') {
    let message = req.body;
    let validatorResult = validator(message, schema);

    // check if message validation is ok
    if (validatorResult.errors.length > 0) {
      res.status(400).send(validatorResult.errors[0].stack);
      return;
    }
  }

  next();
};

module.exports.enrich = function(req, res, next) {
  if (req.method == 'POST') {
    let message = req.body;
    let now = new Date();
    message.date = dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
    message.length = message.text.length;
    message.isPalindrome = '';
  }

  next();
};
