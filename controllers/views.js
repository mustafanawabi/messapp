const express = require("express");
const router = express.Router();
const path = require('path');

// GET all messages
router.get(['/', '/index', '/index.html'], function(req, res) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;
