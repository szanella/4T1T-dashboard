(function() {
  angular.module('4T1T')
    .controller('HeroCtrl', heroCtrl);

    heroCtrl.$inject = ['$scope', 'Members', '$routeParams'];
    function heroCtrl($scope, Heroes, $routeParams) {
      var vm = this;
      //retrieve the members
      Hero.getSingle($routeParams.hero_id)
        .success(function(data) {
          vm.hero = data;
        });
    };
})();
