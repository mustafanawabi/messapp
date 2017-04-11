/**
  messapp REST APIs to get, post, and delete messages
  You can also check if a message is a palindrome
*/

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let db = require('./db');

// set static files path
app.use(express.static(path.join(__dirname, 'public')));

// for parsing json body requests
app.use(bodyParser.json());

// set routes
app.use(require('./controllers/views.js'));
app.use('/api/messages', require('./controllers/messages.js'));

// connect to the db based on env variable
let url;
app.get('env') == 'test' ? url = 'mongodb://localhost:27017/messapp-test' : url = 'mongodb://localhost:27017/messapp';
db.connect(url);

app.set('port', process.env.PORT || 3000);
let server = app.listen(app.get('port'), function() {
  console.log('Server started, listening on port: ' + app.get('port') + ' with db url ' + url);
});

module.exports = server;
