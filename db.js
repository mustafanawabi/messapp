let MongoClient = require('mongodb').MongoClient;
let db;

module.exports.connect = function(url) {
  if (!db) {
    MongoClient.connect(url, function(err, database) {
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
