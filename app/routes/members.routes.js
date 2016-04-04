var Member = require('../models/member');

module.exports = function(app) {
  app.get('/api/members', function(req, res) {
    Member.find(function(err, members) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(members);
      }

    });
  });

  app.get('/api/members/:member_id', function(req, res) {
    Member.findById(req.params.member_id, function(err, member) {

      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(member);
      }

    });
  });

  app.post('/api/members', function(req, res) {

    Member.create({
      name : req.body.name,
      favouriteHeroes : []
    }, function(err, member) {
      if (err){
        res.status(500).send(err);
      }
      else {
        Member.find(function(err, members) {
          if (err) {
            res.status(500).send(err)
          }
          else {
            res.json(members);
          }
        });
      }
    });

  });

  app.delete('/api/members/:member_id', function(req, res) {
    Member.remove({
      _id : req.params.member_id
    }, function(err, todo) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        Member.find(function(err, members) {
          if (err) {
            res.status(500).send(err)
          }
          else {
            res.json(members);
          }
        });
      }
    });
  });

  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};
