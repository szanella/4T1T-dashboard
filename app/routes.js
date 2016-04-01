// app/routes.js

// load the todo model
var Member = require('./models/member');

// expose the routes to our app with module.exports
module.exports = function(app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/members', function(req, res) {

        // use mongoose to get all todos in the database
        Member.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/members', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Member.create({
            name : req.body.text
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Member.find(function(err, members) {
                if (err)
                    res.send(err)
                res.json(members);
            });
        });

    });

    // delete a todo
    app.delete('/api/members/:member_id', function(req, res) {
        Member.remove({
            _id : req.params.member_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
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
