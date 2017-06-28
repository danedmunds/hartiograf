(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('rsvpController', rsvpController);

  function rsvpController ($http, $scope, $rootScope, $mdToast, visitService) {
    visitService.visited('rsvp');

    $scope.submitCaption = 'Submit';

    var vm = this;
    vm.inTransit = false;
    vm.retrieveRsvp = retrieveRsvp;
    vm.submitRsvp = submitRsvp;

    $rootScope.breadcrumb = 'RSVP';

    if ($rootScope.id) {
      retrieveRsvp();
    }

    function retrieveRsvp () {
      $http.get('/api/v1/rsvps/' + $rootScope.id)
      .then(function successCallback(response) {
          vm.data = response.data;
        }, function errorCallback(response) {
          $mdToast.show(
            $mdToast.simple()
              .textContent('Failed to load your RSVP, please try reloading. If issue persists please contact us!')
              .hideDelay(10000)
          );
      });
    }

    function submitRsvp () {
      vm.inTransit = true;
      $scope.submitCaption = 'Sending...';

      $http.put('/api/v1/rsvps/' + $rootScope.id, vm.data)
      .then(function successCallback(response) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Submitted!')
            .parent(angular.element('#toastContainer'))
            .hideDelay(3000)
        );
        vm.inTransit = false;
        $scope.form.$setPristine();
        $scope.submitCaption = 'Submit';
      }, function errorCallback(response) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Submission failed :(')
            .parent(angular.element('#toastContainer'))
            .hideDelay(3000)
        );
        vm.inTransit = false;
        $scope.submitCaption = 'Submit';
      });
    }
  }
})();
