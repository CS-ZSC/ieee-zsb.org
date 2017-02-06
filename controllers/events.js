const router = require('express').Router();
const database = require('../models/database');

router.get('/mutex', function(req, res) {
  res.render('events/mutex');
});

router.get('/mutex/confirm/:id', function(req, res) {
  res.send(req.params.id);
});

router.post('/mutex', function(req, res) {
  var timestamp = +new Date();
  req.body.timestamp = timestamp;
  /* Validate required fields */
  if (req.body.fullname && req.body.email && req.body.level && req.body.workshops) {
    if (!req.body.question) { /* Bypassed level question */
      req.body.programmer = 1;
    }
    res.render('events/confirm', {fullname: req.body.fullname, link: 'http://ieee-zsb.org'});
    /*database.warehouse.insertDoc('mutex_form', 'req_headers', req.headers, function(err) {
      console.log(err);
    });*/
    /*database.insertForm(req.body, function(err, db) {
      if (err == 'Already registered') {
        res.render('events/failure', {email: req.body.email});
      } else if (err) {
        res.render('events/error');
      } else {
        res.render('events/success', {msg: 'Successfully registered for MUTEX event'});
      }
      db.close();
    });*/
  } else {
    res.render('events/error', {error: 'ERR::INVALID_REQ'});
  }
});

module.exports = router;
