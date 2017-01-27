const router = require('express').Router();

router.get('/', function(req, res) {
  res.render('comingsoon');
});

module.exports = router;
