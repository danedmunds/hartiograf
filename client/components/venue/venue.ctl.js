(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('venueController', venueController);

  function venueController (visitService) {
    visitService.visited('venue');
  }
})();
