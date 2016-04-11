(function() {
  angular.module('4T1T')
    .service('Roles', rolesService);

  rolesService.$inject = [];
  function rolesService() {
    var self = this;

    self.roles =  [
      {
        label: 'Safelane',
        id: 'safelane'
      },
      {
        label: 'Mid',
        id: 'mid'
      },
      {
        label: 'Support',
        id: 'support'
      },
      {
        label: 'Offlane',
        id: 'offlane'
      },
      {
        label: 'Roaming',
        id: 'roaming'
      },
      {
        label: 'Jungle',
        id: 'jungle'
      }
    ];

    self.get = function() {
      return self.roles;
    };

    self.getRoleLabel = function(id) {
      var role = self.roles.filter(function(role) {
        return role.id === id;
      })[0];
      return role?role.label:null;
    }
  };
})();
