(function() {
  angular.module('4T1T')
    .controller('MemberCtrl', memberCtrl);

  memberCtrl.$inject = ['$scope', 'Members', 'Heroes', '$routeParams', 'toastr'];
  function memberCtrl($scope, Members, Heroes, $routeParams, toastr) {
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
    vm.newPasswordData = {};

    //retrieve the members
    Members.getSingle($routeParams.member_id)
      .success(function(data) {
        vm.member = data;
        vm.member.favouriteHeroes = vm.member.favouriteHeroes || {};
        updateFavHeroes(vm.member.favouriteHeroes);
      });

    //retrieve all the heroes
    Heroes.get()
      .success(function(data) {
        vm.allHeroes = data;
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

    vm.addHeroToFavourites = function(heroData) {
      if(heroData.hero && heroData.degree) {
        Members.addHeroToFavourites(vm.member._id, heroData)
        .success(function(data) {
          updateFavHeroes(data);
        });
      }
    };

    vm.deleteHeroFromFavourites = function(role, hero) {
      Members.deleteHeroFromFavourites(vm.member._id, role, hero)
      .success(function(data) {
        updateFavHeroes(data);
      });
    };

    vm.setPassword = function(password) {
      Members.setPassword(vm.member._id, vm.newPasswordData)
      .success(function(data) {
        toastr.success('Password successfully updated', 'Success');
      })
      .error(function(data) {
        toastr.error('Error updating the password', 'Error');
      });
    };
  };
})();
