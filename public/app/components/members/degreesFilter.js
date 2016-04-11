(function() {
  angular.module('4T1T')
    .filter('degreeClassSuffix', degreesFilter);

    degreesFilter.$inject = ['Degrees']
    function degreesFilter(Degrees) {
      return function(degreeValue) {
        return Degrees.getDegreeClassSuffix(degreeValue);
      }
    }
})();
