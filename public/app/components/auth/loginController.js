(function() {
  angular.module('4T1T')
    .controller('LoginCtrl', loginCtrl);

    loginCtrl.$inject = ['user', 'toastr'];
    function loginCtrl(user, toastr) {
      var vm = this;
      vm.loginData = {}

      vm.login = function() {
        user.login(vm.loginData.name, vm.loginData.password)
        .success(function(data) {
          toastr.success("Logged in");
          $location.path('/');
        })
        .error(function(err) {
          toastr.error(err);
        });
      }
     };
})();
