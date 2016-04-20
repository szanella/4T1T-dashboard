(function() {
  angular.module('4T1T')
    .directive('choiceColumn', choiceColumn);

    function choiceColumn() {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/components/predictions/choiceColumn.html',
        scope: {
          choiceInfo: '=',
          heroes: '=',
          addChoice: '&',
          deleteChoice: '&',
          newHeroInfo: '='
        },
        controller: ChoiceColumnCtrl,
        controllerAs: 'vm',
        bindToController: true,
        link: link
      };

      function link(scope, element, attrs) {};
    };

    ChoiceColumnCtrl.$inject = [];
    function ChoiceColumnCtrl() {
      var vm = this;

      vm.newHero = {
        hero: null
      };

      vm.eraseNewHero = function() {
        vm.newHero.hero = null;
      };

      vm.addChoiceAndErase = function() {
        vm.addChoice({choiceType: vm.choiceInfo.choiceType, team: vm.choiceInfo.team, hero: angular.copy(vm.newHero)});
        vm.eraseNewHero();
      };
    };
})();
