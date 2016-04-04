(function() {
  angular.module('4T1T')
    .controller('MemberCtrl', memberCtrl);

    memberCtrl.$inject = ['$scope', 'Members', '$routeParams'];
    function memberCtrl($scope, Members, $routeParams) {
      var vm = this;
      //retrieve the members
      Members.getSingle($routeParams.member_id)
        .success(function(data) {
          vm.member = data;

          vm.member.favouriteHeroes = vm.member.favouriteHeroes || {};
          vm.member.favByRole = {
            'safelane': vm.member.favouriteHeroes.filter(function(hero) {return hero.position === 'safelane'}),
            'mid': vm.member.favouriteHeroes.filter(function(hero) {return hero.position === 'mid'}),
            'support': vm.member.favouriteHeroes.filter(function(hero) {return hero.position === 'support'}),
            'offlane': vm.member.favouriteHeroes.filter(function(hero) {return hero.position === 'offlane'}),
            'roaming': vm.member.favouriteHeroes.filter(function(hero) {return hero.position === 'roaming'}),
            'jungle': vm.member.favouriteHeroes.filter(function(hero) {return hero.position === 'jungle'})
          };
        });
    };
})();
