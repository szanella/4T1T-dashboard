(function() {
  angular.module('4T1T')
    .config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.
          when('/', {
            templateUrl: '/app/components/home/homeView.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm'
          }).
          when('/members', {
            templateUrl: '/app/components/members/membersView.html',
            controller: 'MembersCtrl',
            controllerAs: 'vm'
          }).
          when('/members/:member_id', {
            templateUrl: '/app/components/members/memberView.html',
            controller: 'MemberCtrl',
            controllerAs: 'vm'
          }).
          when('/heroes', {
            templateUrl: '/app/components/heroes/heroesView.html',
            controller: 'HeroesCtrl',
            controllerAs: 'vm'
          }).
          when('/heroes/:hero_id', {
            templateUrl: '/app/components/heroes/heroesView.html',
            controller: 'HeroCtrl',
            controllerAs: 'vm'
          });
      }])
})();
