const router = require('express').Router();
const database = require('../models/database');

router.get('/', function(req, res) {
  res.render('comingsoon');
});

router.post('/check', function(req, res) {
  var id = req.query.id;
  if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
    database.getDoc(id, function(err, db, doc) {
      if (err) {
        res.send({accepted: false, attended: false, error: err});
      } else {
        res.send({fullname: doc.fullname, accepted: doc.accepted, attended: doc.attended? true : false})
      }
      if (db) db.close();
    })
  } else {
    res.send({accepted: false, attended: false, error: "INV_ID"});
  }
});

module.exports = router;
