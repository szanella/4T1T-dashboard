function AbstractPredictionModule() {}

AbstractPredictionModule.prototype.getPickSuggestion = function(picks, bans) {
  throw("Using abstract implementation of getPickSuggestion");
};

AbstractPredictionModule.prototype.getBanSuggestion = function(picks, bans) {
  throw("Using abstract implementation of getBanSuggestion");
};

module.exports = AbstractPredictionModule;
