(function() {
  angular.module('4T1T')
    .service('Degrees', degreesService);

  degreesService.$inject = [];
  function degreesService() {
    var self = this;

    self.degrees =  [
      {
        value: 1,
        classSuffix: 'success'
      },
      {
        value: 2,
        classSuffix: 'warning'
      },
      {
        value: 3,
        classSuffix: 'danger'
      }
    ];

    self.get = function() {
      return self.degrees;
    };

    self.getDegreeClassSuffix = function(value) {
      var degree = self.degrees.filter(function(degree) {
        return degree.value === value;
      })[0];
      return degree?degree.classSuffix:null;
    }
  };
})();
