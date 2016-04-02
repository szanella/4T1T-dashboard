var Hero = require('../models/hero');

module.exports = function(app) {

    app.get('/api/heroes', function(req, res) {

        Hero.find(function(err, heroes) {

            if (err)
                res.send(err)

            console.log(heroes);
            res.json(heroes);
        });
    });

    app.get('/api/heroes/:hero_id', function(req, res) {

        Hero.findById(req.params.hero_id, function(err, hero) {

            if (err)
                res.send(err)

            res.json(hero);
        });
    });

    app.post('/api/heroes', function(req, res) {

        Hero.create({
            name : req.body.name,
            mainAttr : req.body.mainAttr
        }, function(err, hero) {
            if (err)
                res.send(err);

            Hero.find(function(err, hero) {
                if (err)
                    res.send(err)
                res.json(hero);
            });
        });

    });

    app.delete('/api/heroes/:hero_id', function(req, res) {
        Hero.remove({
            _id : req.params.hero_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            Hero.find(function(err, hero) {
                if (err)
                    res.send(err)
                res.json(hero);
            });
        });
    });
};
