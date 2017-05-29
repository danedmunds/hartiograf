(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .directive('toolbar', toolbar);

  function toolbar() {
    return {
      templateUrl: 'components/toolbar/toolbar.tpl.html',
      controller: toolbarController,
      controllerAs: 'toolbar'
    }
  }

  function toolbarController($scope, $window, $rootScope) {
    var magicWidth = 970;

    angular.element($window).bind('resize', checkMobile);
    $rootScope.mobileDisplay = $window.innerWidth < magicWidth;

    function checkMobile(skipDigest) {
      var old = $rootScope.mobileDisplay;
      $rootScope.mobileDisplay = $window.innerWidth < magicWidth;

      // manuall $digest required as resize event is outside of angular
      if (old != $rootScope.mobileDisplay) {
        $scope.$digest();
      }
    }
  }
})();
