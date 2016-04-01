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
        });
    };
})();
