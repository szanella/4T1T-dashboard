(function() {
  angular.module('4T1T')
    .controller('HeroCtrl', heroCtrl);

    heroCtrl.$inject = ['$scope', 'Heroes', '$routeParams'];
    function heroCtrl($scope, Heroes, $routeParams) {
      var vm = this;
      //retrieve the members
      Heroes.getSingle($routeParams.hero_id)
        .success(function(data) {
          console.log("Loaded hero");
          vm.hero = data;
        });
    };
})();
