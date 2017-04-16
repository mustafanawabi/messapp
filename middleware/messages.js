/**
 * Middleware - a set of functions that perform different tasks
 */
let validator = require('jsonschema').validate;
let schema = require('../models/message');
let dateFormat = require('dateformat');

/**
 * validate - validates incoming POST requests against the mnessage model
 *
 * @param  {object} req  the request object
 * @param  {object} res  the response object
 * @param  {object} next the next function
 */
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

/**
 * enrich - adds the date and message length to the request object
 *
 * @param  {object} req  the request object
 * @param  {object} res  the response object
 * @param  {object} next the next function
 */
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
