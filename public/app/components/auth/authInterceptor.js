(function() {
  angular.module('4T1T')
    .factory('authInterceptor', authInterceptor);

  function authInterceptor(auth) {
    return {
      request: function(config) {
        var token = auth.getToken();
        if(config.url.indexOf('/api/authenticate') === 0 && token) {
          config.headers['x-access-token'] = token;
        }

        return config;
      },
      response: function(res) {
        if(res.config.url.indexOf('/api/authenticate') === 0 && res.data.token) {
          auth.saveToken(res.data.token);
        }

        return res;
      }
    };
  }
})();
