(function() {
  angular.module('4T1T')
    .factory('Members', membersService);

    membersService.$inject = ['$http'];
    function membersService($http) {
      return {
        get : function() {
          return $http.get('/api/members');
        },
        getSingle : function(id) {
          return $http.get('/api/members/' + id);
        },
        create : function(memberData) {
          return $http.post('/api/members', memberData);
        },
        addHeroToFavourites : function(member_id, heroData) {
          return $http.post('/api/members/' + member_id + '/heroes/', heroData);
        },
        delete : function(id) {
          return $http.delete('/api/members/' + id);
        },
        deleteHeroFromFavourites : function(member_id, role, hero) {
          return $http.delete('/api/members/' + member_id + '/heroes/' + role + '/' + hero);
        }
      };
    };
})();
