var AbstractPredictionModule = require('../abstractPredictionModule');
var Member = require('../../../models/member');

function ProficiencyModule() {
  var self = this;
  AbstractPredictionModule.apply(this, Array.prototype.slice.call(arguments));

  ProficiencyModule.prototype.getPickSuggestion = function(picks, bans) {
    var pickSuggPromise, suggestions = [];

    pickSuggPromise = new Promise(function(resolve, reject) {
      Member.aggregate(
        [
          {$project : {favouriteHeroes: 1, name: 1}},
          {$unwind:"$favouriteHeroes"},
          {$sort: {"favouriteHeroes.degree": 1}},
          {$group: {
            _id: "$favouriteHeroes.name",
            "players": {$push: {name: "$name", position: "$favouriteHeroes.position", degree: "$favouriteHeroes.degree"}}
          }}
        ], function(err, proficiencyData) {
        if(err) {
          reject(err);
        }
        else {
          proficiencyData.forEach(function(heroProf) {
            var sugg = {
              hero: heroProf._id,
              reasons: []
            };
            heroProf.players.forEach(function(player) {
              var profAdverb, reasonWeight;
              switch(player.degree) {
                case 1:
                  profAdverb = 'very well';
                  reasonWeight = 0.3;
                  break;
                case 2:
                  profAdverb = 'quite well';
                  reasonWeight = 0.15;
                  break;
                case 3:
                  profAdverb = 'decently';
                  reasonWeight = 0.075;
                  break;
              }
              sugg.reasons.push({
                label: player.name + ' can play it ' + profAdverb + ' (' + player.position + ')',
                weight: reasonWeight
              });
            });
            suggestions.push(sugg);
          });
          resolve(suggestions);
        }
      });
    });

    return pickSuggPromise;
  };

  ProficiencyModule.prototype.getBanSuggestion = function(picks, bans) {
    return Promise.resolve([]);
  };
};
ProficiencyModule.prototype = new AbstractPredictionModule();

module.exports = ProficiencyModule;
