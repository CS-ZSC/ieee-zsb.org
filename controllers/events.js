const router = require('express').Router();
const database = require('../models/database');

router.get('/mutex', function(req, res) {
  res.render('events/mutex');
});

router.post('/mutex', function(req, res) {
  database.insertForm(req.body, function(err, db) {
    if (err == 'Already registered') {
      res.render('events/failure', {email: req.body.email});
    } else if (err) {
      res.render('events/error');
    } else {
      res.render('events/success');
    }
    db.close();
  });
});

module.exports = router;
