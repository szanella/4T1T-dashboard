(function() {
  angular.module('4T1T')
    .controller('LoginCtrl', loginCtrl);

    loginCtrl.$inject = ['user', 'toastr', '$location'];
    function loginCtrl(user, toastr, $location) {
      var vm = this;
      vm.loginData = {}

      vm.login = function() {
        user.login(vm.loginData.name, vm.loginData.password)
        .success(function(data) {
          if(data.success) {
            toastr.success(data.message);
            $location.path('/');
          }
          else {
            toastr.error(data.message);
          }
        })
        .error(function(err) {
          toastr.error(err);
        });
      }
     };
})();
