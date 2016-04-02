(function() {
  angular.module('4T1T')
    .directive('header', header);

    function header() {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/shared/header/header.html',
        scope: {
          activeOption: '@'
        },
        controller: HeaderCtrl,
        controllerAs: 'vm',
        bindToController: true,
        link: link
      };

      function link(scope, element, attrs) {};
    };

    HeaderCtrl.$inject = ['$scope'];
    function HeaderCtrl($scope) {
      var vm = this, i;

      vm.options = [
        {
          id: 'members',
          label: 'Members',
          url: '/members',
          active: false
        },
        {
          id: 'heroes',
          label: 'Heroes',
          url: '/heroes',
          active: false
        }
      ];

      //set the active option
      if(vm.activeOption) {
        for(i=0; i < vm.options.length; i+=1) {
          vm.options[i].active = vm.options[i].id === vm.activeOption;
        }
      }
    };
})();
