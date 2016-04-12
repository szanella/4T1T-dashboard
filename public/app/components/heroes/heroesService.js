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
        getPlayers : function(id) {
          return $http.get('/api/heroes/' + id + '/players');
        },
        create : function(heroData) {
          return $http.post('/api/heroes', heroData);
        },
        addGoodWith : function(id, heroData) {
          return $http.post('/api/heroes/' + id + '/goodwith', heroData);
        },
        addGoodAgainst : function(id, heroData) {
          return $http.post('/api/heroes/' + id + '/goodagainst', heroData);
        },
        delete : function(id) {
          return $http.delete('/api/heroes/' + id);
        },
        removeGoodWith : function(id, name) {
          return $http.delete('/api/heroes/' + id + '/goodwith/' + name);
        },
        removeGoodAgainst : function(id, name) {
          return $http.delete('/api/heroes/' + id + '/goodagainst/' + name);
        }
      };
    };
})();
