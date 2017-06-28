(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('homeController', homeController);

  function homeController ($rootScope, visitService) {
    delete $rootScope.breadcrumb;
    visitService.visited('home');
  }
})();
