(function() {
  angular.module('4T1T')
    .controller('MembersCtrl', membersCtrl);

    membersCtrl.$inject = ['$scope', 'Members', 'toastr', 'user'];
    function membersCtrl($scope, Members, toastr, user) {
      var vm = this;

      //retrieve the members
      Members.get()
        .success(function(data) {
          vm.members = data;
        });

      user.login('John', 'ayy')
      .success(function(data) {
        toastr.success("ayyy");
      })
      .error(function(err) {
        toastr.error(err);
      });
      vm.newMember = {};
      vm.createMember = function() {
        if(true) {
          toastr.warning('I see you trying to mess up the database, do something useful!', 'Hey you');
        }
        else {
          if (!$.isEmptyObject(vm.newMember)) {
            Members.create(vm.newMember)
              .success(function(data) {
                vm.newMember = {}; // clear the form so our user is ready to enter another
                vm.members = data; // assign our new list of todos
              });
          }
        }
      };
    };
})();
