var PredictionHelper = require('../libs/predictions/predictionHelper');
var InteractionModule = require('../libs/predictions/predictionModules/interactionModule');

module.exports = function(apiRoutes) {
  apiRoutes.get('/predictions/pick', function(req, res) {
    req.query.ypicks = req.query.ypicks || [];
    if(!(req.query.ypicks instanceof Array)) {
      req.query.ypicks = [req.query.ypicks];
    }
    req.query.epicks = req.query.epicks || [];
    if(!(req.query.epicks instanceof Array)) {
      req.query.epicks = [req.query.epicks];
    }
    req.query.ybans = req.query.ybans || [];
    if(!(req.query.ybans instanceof Array)) {
      req.query.ybans = [req.query.ybans];
    }
    req.query.ebans = req.query.ebans || [];
    if(!(req.query.ebans instanceof Array)) {
      req.query.ebans = [req.query.ebans];
    }
    var picks = {
      yours: req.query.ypicks,
      enemy: req.query.epicks
    }, bans = {
      yours: req.query.ybans,
      enemy: req.query.ebans
    };
    var predHelper = new PredictionHelper([new InteractionModule()], picks, bans);

    predHelper.getPickSuggestion().then(
      function(result) {
        res.json(result);
      },
      function(err) {
        res.status(500).send(err);
      }
    );
  });
};
