const MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb://localhost:27017/palindrome';
let db;

module.exports.connect = function() {
  if (!db) {
    MongoClient.connect(URL, function(err, database) {
      if(err) throw err;

      db = database;
    });
  }
}

module.exports.close = function() {
  if (db) {
    db.close();
  }
};

module.exports.get = function() {
  return db;
};
