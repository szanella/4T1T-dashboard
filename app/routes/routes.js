module.exports = function(app) {
  require('./heroes.routes.js')(app);
  require('./members.routes.js')(app);

  app.get('*', function(req, res) {
      res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};
