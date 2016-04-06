(function() {
  angular.module('4T1T')
    .controller('MemberCtrl', memberCtrl);

  memberCtrl.$inject = ['$scope', 'Members', '$routeParams'];
  function memberCtrl($scope, Members, $routeParams) {
    var vm = this;
    vm.editMode = false;
    vm.roles = [
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

    //retrieve the members
    Members.getSingle($routeParams.member_id)
      .success(function(data) {
        vm.member = data;
        vm.member.favouriteHeroes = vm.member.favouriteHeroes || {};
        updateFavHeroes(vm.member.favouriteHeroes);
      });

    function degreeCompare(a, b) {
      return a.degree - b.degree;
    }

    function updateFavHeroes(fav) {
      vm.member.favouriteHeroes = fav;
      vm.member.favouriteHeroes.sort(degreeCompare);

      vm.member.favByRole = {};
      vm.roles.forEach(function(role) {
        vm.member.favByRole[role.id] = vm.member.favouriteHeroes.filter(function(hero) {return hero.position === role.id;});
      });
    }

    vm.toggleEditMode = function() {
      vm.editMode = !vm.editMode;
    };

    vm.deleteHeroFromFavourites = function(role, hero) {
      Members.deleteHeroFromFavourites(vm.member._id, role, hero)
      .success(function(data) {
        updateFavHeroes(data);
      });
    }
  };
})();
