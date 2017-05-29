(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('accommodationsController', accommodationsController);

  function accommodationsController ($rootScope) {
    var vm = this;
    vm.blah = 'blah';
    $rootScope.breadcrumb = 'Accommodations';
  }
})();
