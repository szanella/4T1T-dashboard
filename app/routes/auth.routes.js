var Member = require('../models/member');
var pwdService = require('password-hash-and-salt');
var jwt    = require('jsonwebtoken');

module.exports = function(apiRoutes, app) {
  apiRoutes.post('/authenticate', function(req, res) {
    Member.findOne({
      name: req.body.name
    }, function(err, member) {

      if (err) throw err;

      if (!member) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (member) {
        pwdService(req.body.password).verifyAgainst(member.passwordHash, function(error, verified) {
          if(error)
          res.json({ success: false, message: 'Something went wrong' });
          else if(!verified) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
            var token = jwt.sign(member, app.get('secret'), {
              expiresIn: 86400 // expires in 24 hours
            });

            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Authentication successful!',
              token: token
            });
          }
        });
      }
    });
  });
};
