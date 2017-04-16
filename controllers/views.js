/**
 * View Router - routes requests from root to middleware
 */
let express = require('express');
let router = express.Router();
let path = require('path');

/**
 * Middleware to get index.html
 * GET /, /index, index.html
 *
 * @return {object} index.html
 */
router.get(['/', '/index', '/index.html'], function(req, res) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;
