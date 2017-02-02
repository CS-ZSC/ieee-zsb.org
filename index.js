var express = require('express');
var bodyParser = require('body-parser');
var gad = require('node-auto-deploy');

var app = express();
var controllers = require('./controllers/routes');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

controllers(app); /* Setup routes */

app.post('/webhook', function(req, res){
  if (req.body.secret == process.env.GIT_HOOK_SECRET) {
    if (req.body.ref) { /* Push */
      var branch = req.body.ref.slice(12);
      if (branch == 'master' || branch == 'testing') {
        var repo = {
          origin: 'origin',
          branch: branch
        };
        gad.deploy(repo);
        spawn("/root/update.sh",[repo.branch],{cwd:`${__dirname}`});
      }
    }
  }
});

var port = process.env.PORT || 80;
app.listen(port, function() {
  console.log('Started listening on port ' + port);
});
