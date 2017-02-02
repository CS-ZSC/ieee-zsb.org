var express = require('express');
var bodyParser = require('body-parser');
var expressLogging = require('express-logging');
var logger = require('logops');
var gad = require('node-auto-deploy');
var Crypto = require('crypto');

var app = express();
var controllers = require('./controllers/routes');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressLogging(logger));

controllers(app); /* Setup routes */

app.post('/webhook', function(req, res) {
  console.log('Received Github webhook');
  if (true) { /* TODO: add secret verification */
    if (req.body.ref) { /* Push */
      var branch = req.body.ref.slice(12);
      console.log('Github: Push event to branch ' + branch)
      if (branch == 'master' || branch == 'testing') {
        console.log('GAD: Updating branch ' + branch)
        var repo = {
          origin: 'origin',
          branch: branch
        };
        gad.deploy(repo);
        spawn("/root/update.sh",[repo.branch],{cwd:`${__dirname}`});
      }
    }
  } else {
    console.log('Github Webhook: Error: Wrong secret');
  }
  res.send('OK');
});

var port = process.env.PORT || 80;
app.listen(port, function() {
  console.log('Started listening on port ' + port);
});
