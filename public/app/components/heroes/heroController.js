(function() {
  angular.module('4T1T')
    .controller('HeroCtrl', heroCtrl);

    heroCtrl.$inject = ['$scope', 'Heroes', '$routeParams'];
    function heroCtrl($scope, Heroes, $routeParams) {
      var vm = this;
      vm.newHero = {};
      vm.newHeroInfo = {};
      vm.editMode = false;
      //retrieve the members
      Heroes.getSingle($routeParams.hero_id)
        .success(function(data) {
          vm.hero = data;
          Heroes.getPlayers($routeParams.hero_id)
            .success(function(data) {
              vm.hero.players = data.players;
            });
        });

      Heroes.get()
        .success(function(data) {
          vm.newHeroInfo.allHeroes = data;
        });

      vm.eraseNewHero = function() {
        vm.newHero = {};
      };

      vm.addGoodWithAndErase = function() {
        if(vm.newHero.hero) {
          Heroes.addGoodWith(vm.hero._id, angular.copy(vm.newHero))
            .success(function(data) {
              vm.hero.goodWith = data;
            });
          vm.eraseNewHero();
        }
      };

      vm.addGoodAgainstAndErase = function() {
        if(vm.newHero.hero) {
          Heroes.addGoodAgainst(vm.hero._id, angular.copy(vm.newHero))
            .success(function(data) {
              vm.hero.goodAgainst = data;
            });
          vm.eraseNewHero();
        }
      };

      vm.removeGoodWith = function(name) {
        Heroes.removeGoodWith(vm.hero._id, name)
          .success(function(data) {
            vm.hero.goodWith = data;
          });
      };

      vm.removeGoodAgainst = function(name) {
        Heroes.removeGoodAgainst(vm.hero._id, name)
          .success(function(data) {
            vm.hero.goodAgainst = data;
          });
      };

      vm.toggleEditMode = function() {
        vm.editMode = !vm.editMode;
      };
    };
})();
