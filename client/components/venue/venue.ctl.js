(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('venueController', venueController);

  function venueController ($rootScope, visitService) {
    $rootScope.breadcrumb = 'Venue';
    visitService.visited('venue');
  }
})();
