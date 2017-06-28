(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('shuttleController', shuttleController);

  function shuttleController (visitService) {
    visitService.visited('shuttle');
  }
})();
