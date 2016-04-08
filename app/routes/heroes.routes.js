var Hero = require('../models/hero');

module.exports = function(app) {
  app.get('/api/heroes', function(req, res) {
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

  app.get('/api/heroes/:hero_id', function(req, res) {
    Hero.findById(req.params.hero_id, function(err, hero) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(hero);
      }
    });
  });

  app.post('/api/heroes', function(req, res) {
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

  app.delete('/api/heroes/:hero_id', function(req, res) {
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
