var Member = require('../models/member');

module.exports = function(app) {
  app.get('/api/members', function(req, res) {
    console.log("RETRIEVING MEMBERS");
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

  app.post('/api/members/:member_id/heroes', function(req, res) {
    Member.findByIdAndUpdate(
      req.params.member_id,
      {$push : {favouriteHeroes : {position : req.body.role, name: req.body.hero, degree : req.body.degree}}},
      function(err, todo) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          Member.findById(req.params.member_id, {favouriteHeroes: 1},
            function(err, favHeroes) {
              if (err) {
                res.status(500).send(err);
              }
              else {
                res.json(favHeroes.favouriteHeroes);
              }
            });
        }
      }
    );
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

  app.delete('/api/members/:member_id/heroes/:role/:hero', function(req, res) {
    Member.update(
      {_id : req.params.member_id},
      {$pull : {favouriteHeroes : {position : req.params.role, name: req.params.hero}}},
      function(err, todo) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          Member.findById(req.params.member_id, {favouriteHeroes: 1},
            function(err, favHeroes) {
              if (err) {
                res.status(500).send(err);
              }
              else {
                res.json(favHeroes.favouriteHeroes);
              }
            });
        }
      }
    );
  });

  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};
