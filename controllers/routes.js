const comingsoonRouter = require('./comingsoon');

var routes = function(app) {
  app.use('/', comingsoonRouter);
};

module.exports = routes;
