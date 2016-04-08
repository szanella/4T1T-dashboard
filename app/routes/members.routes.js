var Member = require('../models/member');
var pwdService = require('password-hash-and-salt');

module.exports = function(apiRoutes) {
  apiRoutes.get('/members', function(req, res) {
    Member.find().select({'name': 1, 'favouriteHeroes': 1}).exec(function(err, members) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(members);
      }

    });
  });

  apiRoutes.get('/members/:member_id', function(req, res) {
    Member.findById(req.params.member_id).select({'name': 1, 'favouriteHeroes': 1}).exec(function(err, member) {

      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(member);
      }

    });
  });

  apiRoutes.post('/members', function(req, res) {

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

  apiRoutes.post('/members/:member_id/heroes', function(req, res) {
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

  apiRoutes.post('/members/:member_id/password', function(req, res) {
    pwdService(req.body.password).hash(function(error, hash) {
    	if(error)
    		throw new Error('Something went wrong!');

      Member.findByIdAndUpdate(
        req.params.member_id,
        {$set: {passwordHash: hash}},
        function(err, todo) {
          if (err) {
            res.status(500).send(err);
          }
          else {
            res.status(200).send("done");
          }
        }
      );
    });
  });

  apiRoutes.delete('/members/:member_id', function(req, res) {
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

  apiRoutes.delete('/members/:member_id/heroes/:role/:hero', function(req, res) {
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
};
