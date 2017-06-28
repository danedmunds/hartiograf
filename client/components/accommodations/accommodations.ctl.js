(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('accommodationsController', accommodationsController);

  function accommodationsController ($rootScope, visitService) {
    $rootScope.breadcrumb = 'Accommodations';
    visitService.visited('accomodations');
  }
})();
