(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('venueController', venueController);

  function venueController ($http, $rootScope) {
    $rootScope.breadcrumb = 'Venue';

    var vm = this;
    vm.blah = 'blah';
  }
})();
