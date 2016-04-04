(function() {
  angular.module('4T1T')
    .factory('Heroes', heroesService);

    heroesService.$inject = ['$http'];
    function heroesService($http) {
      return {
        get : function() {
          return $http.get('/api/heroes');
        },
        getPaginated : function(offset, limit) {
          return $http.get('/api/heroes?offset=' + offset + '&limit=' + limit);
        },
        getSingle : function(id) {
          return $http.get('/api/heroes/' + id);
        },
        create : function(heroData) {
          return $http.post('/api/heroes', heroData);
        },
        delete : function(id) {
          return $http.delete('/api/heroes/' + id);
        }
      };
    };
})();
