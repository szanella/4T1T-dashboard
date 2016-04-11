(function() {
  angular.module('4T1T')
    .filter('roleLabel', rolesFilter);

    rolesFilter.$inject = ['Roles']
    function rolesFilter(Roles) {
      return function(roleId) {
        return Roles.getRoleLabel(roleId);
      }
    }
})();
