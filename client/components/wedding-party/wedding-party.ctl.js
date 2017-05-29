(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('weddingPartyController', weddingPartyController);

  function weddingPartyController ($http, $rootScope) {
    $rootScope.breadcrumb = 'Wedding Party';

    var vm = this;
    vm.blah = 'blah';
  }
})();
