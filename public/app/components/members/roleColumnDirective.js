(function() {
  angular.module('4T1T')
    .directive('roleColumn', roleColumn);

    function roleColumn() {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/components/members/roleColumn.html',
        scope: {
          role: '=',
          heroes: '=',
          editMode: '=',
          toggleEditMode: '&',
          addHeroToFavourites: '&',
          deleteHeroFromFavourites: '&',
          newHeroInfo: '='
        },
        controller: RoleColumnCtrl,
        controllerAs: 'vm',
        bindToController: true,
        link: link
      };

      function link(scope, element, attrs) {};
    };

    RoleColumnCtrl.$inject = [];
    function RoleColumnCtrl() {
      var vm = this;

      vm.newHero = {
        role: vm.role.id
      };

      vm.eraseNewHero = function() {
        vm.newHero.hero = null;
        vm.newHero.degree = null;
      };

      vm.addHeroAndErase = function() {
        vm.addHeroToFavourites({heroData: angular.copy(vm.newHero)});
        vm.eraseNewHero();
      }
    };
})();
