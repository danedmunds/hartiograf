(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('shuttleController', shuttleController);

  function shuttleController ($rootScope, visitService) {
    $rootScope.breadcrumb = 'Shuttle';
    visitService.visited('shuttle');
  }
})();
