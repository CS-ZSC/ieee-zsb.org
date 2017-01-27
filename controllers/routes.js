const comingsoonRouter = require('./comingsoon');
const eventsRouter = require('./events');

var routes = function(app) {
  app.use('/', comingsoonRouter);
  app.use('/events', eventsRouter);
};

module.exports = routes;
