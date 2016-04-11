var Hero = require('../models/hero');
var Member = require('../models/member');

module.exports = function(apiRoutes) {
  apiRoutes.get('/heroes', function(req, res) {
    var query;
    if(req.query.offset !== undefined && req.query.limit !== undefined) {
      console.log(req.query.offset);
      query = Hero.find().skip(req.query.offset * req.query.limit).limit(req.query.limit);
    }
    else {
      query = Hero.find();
    }
    query.sort({'name': 1}).exec(function(err, heroes) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(heroes);
      }
    });
  });

  apiRoutes.get('/heroes/:hero_id', function(req, res) {
    Hero.findById(req.params.hero_id, function(err, hero) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(hero);
      }
    });
  });

  apiRoutes.get('/heroes/:hero_id/players', function(req, res) {
    Hero.findById(req.params.hero_id).select({name: 1}).exec(function(err, hero) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        Member.aggregate(
          [
            {$project : {favouriteHeroes: 1, name: 1}},
            {$unwind:"$favouriteHeroes"},
            {$match: {"favouriteHeroes.name": hero.name}},
            {$sort: {"favouriteHeroes.degree": 1}},
            {$group: {
              _id: "$favouriteHeroes.name",
              "players": {$push: {name: "$name", position: "$favouriteHeroes.position", degree: "$favouriteHeroes.degree"}}
            }}
          ], function(err, players) {
          if (err) {
            res.status(500).send(err);
          }
          else {
            res.json(players[0]);
          }
        });
      }
    });

  });

  apiRoutes.post('/heroes', function(req, res) {
    console.log("ADDING HERO");

    Hero.create({
      name : req.body.name,
      mainAttr : req.body.mainAttr,
      imgPrefix : req.body.imgPrefix
    }, function(err, hero) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        Hero.find(function(err, hero) {
          if (err) {
            res.status(500).send(err)
          }
          else {
            res.json(hero);
          }
        });
      }
    });

  });

  apiRoutes.delete('/heroes/:hero_id', function(req, res) {
    Hero.remove({
      _id : req.params.hero_id
    }, function(err, todo) {
      if (err) {
        res.status(500).send(err);
      }

      Hero.find(function(err, hero) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.json(hero);
        }
      });
    });
  });
};
