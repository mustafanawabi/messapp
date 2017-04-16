/**
 * DB - helper functions to manage db connections
 */
let MongoClient = require('mongodb').MongoClient;
let db;


/**
 * connect - connects to the db and sets the var 'db' to the connection
 *
 * @param  {string} url - the db url to connect to
 */
module.exports.connect = function(url) {
  if (!db) {
    MongoClient.connect(url, function(err, database) {
      if(err) throw err;

      db = database;
    });
  }
};

/**
 * close - closes the db connection
 */
module.exports.close = function() {
  if (db) {
    db.close();
  }
};

/**
 * get - gets the db connection
 *
 * @return  {object} db - the db connection
 */
module.exports.get = function() {
  return db;
};
