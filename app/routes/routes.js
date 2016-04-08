module.exports = function(app) {
  var express  = require('express'), apiRoutes = express.Router();
  require('./heroes.routes.js')(apiRoutes);
  require('./members.routes.js')(apiRoutes);
  require('./auth.routes.js')(apiRoutes);

  app.use('/api', apiRoutes);

  app.get('*', function(req, res) {
      res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};
