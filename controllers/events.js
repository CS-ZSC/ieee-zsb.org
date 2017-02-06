const router = require('express').Router();
const database = require('../models/database');
var app = global.app;

router.get('/mutex', function(req, res) {
  res.render('events/mutex');
});

router.get('/mutex/confirm/:id', function(req, res) {
  var id = req.params.id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    database.confirm(req.params.id, function(err, db) {
      if (err == 'Already confirmed') {
        res.render('events/failure', {msg: 'Already confirmed'});
      } else if (err) {
        var ts = +new Date();
        console.log('== ERROR LOG [' + ts + '] ==\n' + err + '\n== END ERROR LOG ==');
        res.render('events/error', {error: 'ERR::LOG_' + ts});
      } else {
        res.render('events/success', {msg: 'Successfully confirmed registeration for MUTEX event'});
      }
      if (db) db.close();
    })
  } else {
    res.render('events/error', {error: 'ERR::INVALID_ID'});
  }
});

router.post('/mutex', function(req, res) {
  var timestamp = +new Date();
  req.body.timestamp = timestamp;
  /* Validate required fields */
  if (req.body.fullname && req.body.email && req.body.level && req.body.workshops) {
    if (!req.body.question) { /* Bypassed level question */
      req.body.programmer = 1;
    }
    //res.render('events/confirm', {fullname: req.body.fullname, link: 'http://ieee-zsb.org'});
    database.warehouse.insertDoc('mutex_form', 'req_headers', req.headers, function(err, db) {
      console.log(err);
      db.close();
    });
    database.insertForm(req.body, function(err, db, id) {
      if (err == 'Already registered') {
        res.render('events/failure', {msg: 'Looks like <a>' + req.body.email + '</a> is already registered!'});
      } else if (err) {
        var ts = +new Date();
        console.log('== ERROR LOG [' + ts + '] ==\n' + err + '\n== END ERROR LOG ==');
        res.render('events/error', {error: 'ERR::LOG_' + ts});
      } else {
        app.mailer.send('events/confirm', {
          to: req.body.email,
          subject: 'Mutex event registeration confirmation',
          fullname: req.body.fullname,
          link: 'http://ieee-zsb.org:50080/events/mutex/confirm/' + id,
        }, function(err) {
          if (err) {
            var ts = +new Date();
            console.log('== ERROR LOG [' + ts + '] ==\n' + err + '\n== END ERROR LOG ==');
            res.render('events/error', {error: 'ERR::LOG_' + ts});
          } else {
            res.render('events/success', {msg: 'Successfully Registered. <br>A confirmation email has been sent to <a>' + req.body.email + '</a>'});
          }
        });
      }
      if (db) db.close();
    });
  } else {
    res.render('events/error', {error: 'ERR::INVALID_REQ'});
  }
});

module.exports = router;
