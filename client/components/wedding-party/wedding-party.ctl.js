(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('weddingPartyController', weddingPartyController);

  function weddingPartyController ($rootScope, visitService) {
    $rootScope.breadcrumb = 'Wedding Party';
    visitService.visited('wedding-party');
  }
})();
