var express = require('express');
var app = express();
var controllers = require('./controllers/routes');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

controllers(app); /* Setup routes */

var port = process.env.PORT || 80;
app.listen(port, function() {
  console.log('Started listening on port ' + port);
});
