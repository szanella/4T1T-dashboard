(function() {
  angular.module('4T1T')
    .controller('HeroesCtrl', heroesCtrl);

    heroesCtrl.$inject = ['$scope', 'Heroes'];
    function heroesCtrl($scope, Heroes) {
      var vm = this;

      Heroes.get()
        .success(function(data) {
          vm.heroes = data;
        });

      vm.newHero = {};
      vm.createHero = function() {
        if (!$.isEmptyObject(vm.newHero)) {
          Heroes.create(vm.newHero)
            .success(function(data) {
              vm.newHero = {};
              vm.heroes = data;
            });
        }
      };
    };
})();
