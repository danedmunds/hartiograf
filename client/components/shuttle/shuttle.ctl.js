(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('shuttleController', shuttleController);

  function shuttleController ($http, $rootScope) {
    $rootScope.breadcrumb = 'Shuttle';

    var vm = this;
    vm.blah = 'blah';
  }
})();
