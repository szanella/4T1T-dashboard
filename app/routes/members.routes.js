// app/routes.js

// load the todo model
var Member = require('../models/member');

// expose the routes to our app with module.exports
module.exports = function(app) {

    // api ---------------------------------------------------------------------
    // get all members
    app.get('/api/members', function(req, res) {

        // use mongoose to get all members in the database
        Member.find(function(err, members) {

            if (err)
                res.send(err)

            res.json(members); // return all members in JSON format
        });
    });

    app.get('/api/members/:member_id', function(req, res) {

        // use mongoose to get all members in the database
        Member.findById(req.params.member_id, function(err, member) {

            if (err)
                res.send(err)

            res.json(member); // return all members in JSON format
        });
    });

    app.post('/api/members', function(req, res) {

        Member.create({
            name : req.body.name,
            favouriteHeroes : []
        }, function(err, member) {
            if (err)
                res.send(err);

            Member.find(function(err, members) {
                if (err)
                    res.send(err)
                res.json(members);
            });
        });

    });

    app.delete('/api/members/:member_id', function(req, res) {
        Member.remove({
            _id : req.params.member_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            Member.find(function(err, members) {
                if (err)
                    res.send(err)
                res.json(members);
            });
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
