function PredictionHelper(modules, picks, bans) {
  var self = this;

  this.predictionModules = modules;
  this.picks = picks;
  if(bans) {
    this.bans = bans;
  }

  function incrementSuggestions(suggestions, newSugg) {
    var i, j;
    for(i=0; i < newSugg.length; i++) {
      for(j=0; j < suggestions.length; j+=1) {
        if(suggestions[j].hero === newSugg[i].hero) {
          suggestions[j].reasons = suggestions[j].reasons.concat((newSugg[i].reasons));
        }
      }
      if(j < newSugg.length) {
        suggestions.push({
          hero: newSugg[i].hero,
          reasons: newSugg[i].reasons
        });
      }
    }
  }

  function filterSuggestions(suggestions) {
    var i, j, allPickedBanned = [];
    if(self.picks) {
      allPickedBanned = allPickedBanned.concat(self.picks.yours, self.picks.enemy);
    }
    if(self.bans) {
      allPickedBanned = allPickedBanned.concat(self.bans.yours, self.bans.enemy);
    }
    for(i=0; i < suggestions.length; i+=1) {
      for(j=0; j < allPickedBanned.length; j+=1) {
        if(suggestions[i].hero === allPickedBanned[j]) {
          suggestions.splice(i, 1);
          break;
        }
      }
    }
  }
  PredictionHelper.prototype.getPickSuggestion = function() {
    var pickSuggPromise, modulePromises = [];
    pickSuggPromise = new Promise(function(resolve, reject) {
      self.predictionModules.forEach(function(module) {
        var modulePromise = new Promise(function(resolve, reject) {
          module.getPickSuggestion(self.picks, self.bans).then(
            function(result) {
              resolve(result);
            },
            function(err) {
              reject(err);
            }
          );
        });
        modulePromises.push(modulePromise);
      });

      Promise.all(modulePromises).then(
        function(suggestions) {
          var result = [];
          suggestions.forEach(function(suggestion) {
            incrementSuggestions(result, suggestion);
          });
          filterSuggestions(result);
          resolve(result);
        },
        function(err) {
          reject(err);
        }
      );
    });

    return pickSuggPromise;
  };

  PredictionHelper.prototype.getBanSuggestion = function() {
    var suggestions = [];

    this.predictionModules.forEach(function(module) {
      var moduleSuggestion = module.getBanSuggestion(self.picks, self.bans);
      incrementSuggestions(suggestions, moduleSuggestion);
    });
    filterSuggestions(suggestions);

    return suggestions;
  };
};

module.exports = PredictionHelper;
