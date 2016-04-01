(function() {
  angular.module('4T1T')
    .controller('MembersCtrl', membersCtrl);

    membersCtrl.$inject = ['$scope', 'Members'];
    function membersCtrl($scope, Members) {
      var vm = this;

      //retrieve the members
      Members.get()
        .success(function(data) {
          vm.members = data;
        });

      vm.newMember = {};
      vm.createMember = function() {
        console.log("called");
        if (!$.isEmptyObject(vm.newMember)) {
          Members.create(vm.newMember)
            .success(function(data) {
              vm.newMember = {}; // clear the form so our user is ready to enter another
              vm.members = data; // assign our new list of todos
            });
        }
      };
    };
})();
