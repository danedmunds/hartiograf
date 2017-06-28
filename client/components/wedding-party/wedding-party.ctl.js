(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('weddingPartyController', weddingPartyController);

  function weddingPartyController (visitService) {
    visitService.visited('wedding-party');
  }
})();
