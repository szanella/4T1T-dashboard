(function() {
  angular.module('4T1T')
    .directive('roleColumn', roleColumn);

    function roleColumn() {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/components/members/roleColumn.html',
        scope: {
          role: '@',
          heroes: '='
        },
        controller: RoleColumnCtrl,
        controllerAs: 'vm',
        bindToController: true,
        link: link
      };

      function link(scope, element, attrs) {};
    };

    RoleColumnCtrl.$inject = [];
    function RoleColumnCtrl() {};
})();
