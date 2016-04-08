(function() {
  angular.module('4T1T')
    .service('user', userService);

  userService.$inject = ['$http'];
  function userService($http) {
    var self = this;

    self.login = function(name, password) {
      return $http.post('/api/authenticate', {
        name: name,
        password: password
      });
    };
  };
})();
