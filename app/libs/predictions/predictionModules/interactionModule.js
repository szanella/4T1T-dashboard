var AbstractPredictionModule = require('../abstractPredictionModule');
var Hero = require('../../../models/hero');

function InteractionModule() {
  var self = this;
  AbstractPredictionModule.apply(this, Array.prototype.slice.call(arguments));

  function interactionPromise(pbStruct, basedOnWhat, basedOnFaction, interactionType, reasonPrefix, reasonWeight) {
    return new Promise(function(resolve, reject) {
      var sugg = [];
      pbStruct[basedOnWhat][basedOnFaction].forEach(function(pb) {
        Hero.findOne({name: pb}, function(err, dbHero) {
          if (err) {
            reject("Hero not found");
          }
          else {
            dbHero = dbHero.toObject();
            //find picks good with own picks
            if(dbHero[interactionType]) {
              dbHero[interactionType].forEach(function(hero) {
                var reason = {};
                reason.label = reasonPrefix + pb;
                if(hero.notes) {
                  reason.label += ' - ' + hero.notes;
                }
                reason.weight = reasonWeight;
                sugg.push({
                  hero: hero.hero,
                  reasons: [reason]
                });
              });
            }
            resolve(sugg);
          }
        });
      });
    });
  };

  InteractionModule.prototype.getPickSuggestion = function(picks, bans) {
    var pickSuggPromise, subPromises = [], pbStructure = {picks: picks, bans: bans};



    pickSuggPromise = new Promise(function(resolve, reject) {
      //picks-based subpromises
      if(picks) {
        //own-picks-based subpromise
        if(picks.yours && picks.yours.length > 0) {
          //Picks that are good with our picks
          subPromises.push(new interactionPromise(pbStructure, 'picks', 'yours', 'goodWith', 'Good pick with ', 1));
        }
        if(picks.enemy && picks.enemy.length > 0) {
          //Picks that are good against their picks
          subPromises.push(new interactionPromise(pbStructure, 'picks', 'enemy', 'badAgainst', 'Good pick against ', 1));
        }
      }

      Promise.all(subPromises).then(
        function(result) {
          var suggestions = [];
          result.forEach(function(res) {
            suggestions = suggestions.concat(res);
          });
          resolve(suggestions);
        },
        function(err) {
          reject(err);
        }
      );
    });

    return pickSuggPromise;
  };

  InteractionModule.prototype.getBanSuggestion = function(picks, bans) {
    return [{
      hero: 'Outworld Devourer',
      reason: 'cuz fuq dat guy'
    }];
  };
};
InteractionModule.prototype = new AbstractPredictionModule();

module.exports = InteractionModule;
