(function() {
  angular.module('4T1T')
    .controller('PredictionsCtrl', predictionsCtrl);

    predictionsCtrl.$inject = ['toastr', 'Heroes', 'Suggestions'];
    function predictionsCtrl(toastr, Heroes, Suggestions) {
      var vm = this;

      vm.newHeroInfo = {};
      vm.suggestions = {};

      Heroes.get()
        .success(function(data) {
          vm.newHeroInfo.allHeroes = data;
        });

      vm.choiceInfo = {
        yours: [
          {
            label: 'Bans',
            choiceType: 'bans',
            team: 'yours'
          },
          {
            label: 'Picks',
            choiceType: 'picks',
            team: 'yours'
          }
        ],
        enemy: [
          {
            label: 'Picks',
            choiceType: 'picks',
            team: 'enemy'
          },
          {
            label: 'Bans',
            choiceType: 'bans',
            team: 'enemy'
          }
        ]
      };

      vm.picksAndBans = {
        picks: {
          yours: [],
          enemy: []
        },
        bans: {
          yours: [],
          enemy: []
        }
      };

      vm.updateSuggestions = function() {
        Suggestions.getPicks(vm.picksAndBans)
          .success(function(picks) {
            vm.suggestions.picks = picks;
          });
        Suggestions.getBans(vm.picksAndBans)
          .success(function(bans) {
            vm.suggestions.bans = bans;
          });
      };

      vm.addChoice = function(choiceType, team, hero) {
        if(vm.picksAndBans[choiceType][team].length < 5) {
          vm.picksAndBans[choiceType][team].push(hero);
          vm.updateSuggestions();
        }
        else {
          toastr.warning('Cannot add more than 5 heroes');
        }
      };

      vm.deleteChoice = function(choiceType, team, hero) {
        var i;
        for(i=0; i < vm.picksAndBans[choiceType][team].length; i+=1) {
          if(vm.picksAndBans[choiceType][team][i].hero === hero) {
            vm.picksAndBans[choiceType][team].splice(i, 1);
            break;
          }
        }
      };
    };
})();
