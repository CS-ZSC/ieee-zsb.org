var express = require('express');
var bodyParser = require('body-parser');
var expressLogging = require('express-logging');
var logger = require('logops');

var app = express();
var controllers = require('./controllers/routes');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressLogging(logger));

controllers(app); /* Setup routes */
require('models/webhook')(app); /* Setup webhook */

var port = process.env.PORT || 80;
app.listen(port, function() {
  console.log('Started listening on port ' + port);
});
