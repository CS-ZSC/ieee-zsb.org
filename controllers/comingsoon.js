const router = require('express').Router();
const database = require('../models/database');

router.get('/', function(req, res) {
  res.render('comingsoon');
});

router.post('/check', function(req, res) {
  var id = req.query._id;
  if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
    database.getDoc(id, function(err, db, doc) {
      if (err) {
        res.send({id: id, accepted: false, attended: false, error: err});
      } else {
        res.send({id: id, fullname: doc.fullname, accepted: doc.accepted, attended: doc.attended? true : false})
      }
      if (db) db.close();
    })
  } else {
    res.send({id: id, accepted: false, attended: false, error: "INV_ID"});
  }
});

router.get('/check', function(req, res) {
  res.send("It works");
});

module.exports = router;
