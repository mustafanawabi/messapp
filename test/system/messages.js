// set environment to 'test', will run a test version of db
process.env.NODE_ENV = 'test';

let assert = require('chai').assert;
let server = require('../../server');
let db = require('../../db');
let request = require('request');
let url = 'http://localhost:' + (process.env.PORT || 80) + '/api/messages';
const MESSAGES_COLLECTION = 'messages';

before(function() {
  // connect to db
  db.connect('mongodb://localhost:27017/messapp-test');
});

after(function() {
  // close db connection
  db.close();

  // stop the server
  server.close();

  // kill the process
  process.exit(0);
});

describe('-- REST APIs TESTS --', function() {
  afterEach(function() {
    db.get().collection(MESSAGES_COLLECTION).removeMany({});
  });

  let messageID;

  it('post a message, get all messages and check first one', function (done) {
    request({url: url, method: 'POST', json: {text: 'test message'}}, function(err, res, body) {
      messageID = body._id;
      assert.equal(201, res.statusCode);

      request(url, function(err, res, body) {
        let data = JSON.parse(body);
        assert.equal(200, res.statusCode);
        assert.equal('test message', data[0].text);
        assert.equal(messageID, data[0]._id);
        assert.equal(false, data[0].isPalindrome);

        done();
      });
    });
  });

  it('post a message and check if message was posted', function (done) {
    request({url: url, method: 'POST', json: {text: 'yooy'}}, function(err, res, body) {
      messageID = body._id;
      assert.equal(201, res.statusCode);

      request(url + '/' + messageID, function(err, res, body) {
        let data = JSON.parse(body);
        assert.equal(200, res.statusCode);
        assert.equal('yooy', data.text);
        assert.equal(messageID, data._id);

        done();
      });
    });
  });

  it('post a message and check if it a palindrome', function (done) {
    request({url: url, method: 'POST', json: {text: 'abccba'}}, function(err, res, body) {
      messageID = body._id;
      assert.equal(201, res.statusCode);

      request(url + '/' + messageID + '/palindrome', function(err, res, body) {
        let data = JSON.parse(body);
        assert.equal(200, res.statusCode);
        assert.equal(true, data.palindrome);

        done();
      });
    });
  });

  it('post a message, delete it, then check if it exists', function (done) {
    request({url: url, method: 'POST', json: {text: 'test message'}}, function(err, res, body) {
      messageID = body._id;
      assert.equal(201, res.statusCode);

      request({url: url + '/' + messageID, method: 'DELETE', json: {text: 'test message'}
      }, function(err, res, body) {
        assert.equal(204, res.statusCode);

        request(url + '/' + messageID, function(err, res, body) {
          assert.equal(404, res.statusCode);

          done();
        });
      });
    });
  });
});
