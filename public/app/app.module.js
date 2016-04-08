(function() {
  angular.module('4T1T', ['ngRoute', 'toastr'])
   .run(function($rootScope, auth, $location) {
     $rootScope.$on('$routeChangeStart', function (event, next) {
       console.log("CHANGE LOCATION");
        if (!auth.isAuthed() && !next.isLogin) {
            //$location.path('/login');
            console.log(next);
        }
    });
   });
})();
