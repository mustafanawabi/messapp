/**
 * Server - a NodeJS/ExpressJS based HTTP server
 */
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let db = require('./db');

// set static files path
app.use(express.static(path.join(__dirname, 'ui/dist')));

// for parsing json body requests
app.use(bodyParser.json());

// set routes
app.use(require('./controllers/views.js'));
app.use('/api/messages', require('./controllers/messages.js'));

// connect to the db based on env variable
let url;
let coll;
let dbHost;
app.get('env') == 'test'? coll = 'messapp-test' :
						  coll = 'messapp';

process.argv[2] == 'docker'	? dbHost = 'mongo' :
							  dbHost = 'localhost';

url = 'mongodb://' + dbHost + '/' + coll;
db.connect(url);

// set port
app.set('port', process.env.PORT || 3000);

// start server
let server = app.listen(app.get('port'), function() {
  console.log('server listening on ' + app.get('port') + ' with db ' + url);
});

module.exports = server;
