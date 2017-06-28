(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('accommodationsController', accommodationsController);

  function accommodationsController (visitService) {
    visitService.visited('accomodations');
  }
})();
