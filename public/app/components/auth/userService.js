(function() {
  angular.module('4T1T')
    .service('user', userService);

  function userService() {
    var self = this;

    self.login = function(name, password) {
      return $http.post('/api/authentication', {
        name: name,
        password: password
      });
    };
  };
})();
