const router = require('express').Router();

router.get('/mutex', function(req, res) {
  res.render('events/mutex');
});

module.exports = router;
