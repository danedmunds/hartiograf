(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('homeController', homeController);

  function homeController (visitService) {
    visitService.visited('home');
  }
})();
