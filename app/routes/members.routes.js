var Member = require('../models/member');

module.exports = function(apiRoutes) {
  apiRoutes.get('/api/members', function(req, res) {
    Member.find().select({'name': 1, 'favouriteHeroes': 1}).exec(function(err, members) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(members);
      }

    });
  });

  apiRoutes.get('/api/members/:member_id', function(req, res) {
    Member.findById(req.params.member_id).select({'name': 1, 'favouriteHeroes': 1}).exec(function(err, member) {

      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(member);
      }

    });
  });

  apiRoutes.post('/api/members', function(req, res) {

    Member.create({
      name : req.body.name,
      favouriteHeroes : []
    }, function(err, member) {
      if (err){
        res.status(500).send(err);
      }
      else {
        Member.find().select({'name': 1, 'favouriteHeroes': 1}).exec(function(err, members) {
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

  apiRoutes.post('/api/members/:member_id/heroes', function(req, res) {
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

  apiRoutes.delete('/api/members/:member_id', function(req, res) {
    Member.remove({
      _id : req.params.member_id
    }, function(err, todo) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        Member.find().select({'name': 1, 'favouriteHeroes': 1}).exec(function(err, members) {
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

  apiRoutes.delete('/api/members/:member_id/heroes/:role/:hero', function(req, res) {
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
