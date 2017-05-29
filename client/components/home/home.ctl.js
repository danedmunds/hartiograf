(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('homeController', homeController);

  function homeController ($http, $rootScope) {
    delete $rootScope.breadcrumb;
    var vm = this;
    vm.blah = 'blah';
  }
})();
