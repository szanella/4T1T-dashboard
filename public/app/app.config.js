(function() {
  angular.module('4T1T')
    .config(function(toastrConfig) {
      angular.extend(toastrConfig, {
          autoDismiss: true,
          timeOut: 3000
        });
    });
})();
