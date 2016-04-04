(function() {
  angular.module('4T1T')
    .controller('HeroesCtrl', heroesCtrl);

    heroesCtrl.$inject = ['$scope', '$q', 'Heroes', 'toastr'];
    function heroesCtrl($scope, $q, Heroes, toastr) {
      var vm = this;

      //Pagination related variables
      vm.currentPage = 0;
      vm.itemsPerPage = 10;

      vm.goToPage = function(page) {
        if(page < vm.pages.length) {
          vm.currentPage = page;
          vm.loadHeroes(page).then(
            function(data) {
              vm.heroes = data;
            },
            function(data) {
              toastr.error('Error', data);
            }
          );
        }
      };

      vm.loadHeroes = function (page) {
        var deferred = $q.defer();
        if(page !== undefined) {
          Heroes.getPaginated(page, vm.itemsPerPage).success(deferred.resolve).error(deferred.reject);
        }
        else {
          Heroes.get().success(deferred.resolve).error(deferred.reject);
        }
        return deferred.promise;
      };

      vm.loadHeroes().then(
        function(data) {
          var nPages, i;
          vm.heroes = data.slice(0, vm.itemsPerPage);
          nPages = Math.ceil(data.length / vm.itemsPerPage);
          vm.pages = [];
          for(i=0; i < nPages; i+=1) {
            vm.pages.push(i);
          }
        },
        function(data) {
          toastr.error('Error', data);
        }
      );

      //Stuff to create new hero
      vm.newHero = {};
      vm.createHero = function() {
        if (!$.isEmptyObject(vm.newHero)) {
          Heroes.create(vm.newHero)
            .success(function(data) {
              vm.newHero = {};
              vm.heroes = data;
              toastr.success('Hero added');
            });
        }
      };


    };
})();
