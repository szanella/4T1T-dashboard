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
              var profAdverb;
              switch(player.degree) {
                case 1:
                  profAdverb = 'very well';
                  break;
                case 2:
                  profAdverb = 'quite well';
                  break;
                case 3:
                  profAdverb = 'decently';
                  break;
              }
              sugg.reasons.push(player.name + ' can play it ' + profAdverb + ' (' + player.position + ')');
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
    return [{
      hero: 'Outworld Devourer',
      reason: 'cuz fuq dat guy'
    }];
  };
};
ProficiencyModule.prototype = new AbstractPredictionModule();

module.exports = ProficiencyModule;
