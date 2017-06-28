(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('visitsController', visitsController);

  function visitsController (visitService) {
    var vm = this;
    vm.getAllVisits = function () {
      visitService.getAllVisits(vm.password).then(
        function success(visits) {
          vm.data = visits
        },
        function failure() {
          console.log('Failed to retrieve visits')
        }
      )
    }
  }
})();
