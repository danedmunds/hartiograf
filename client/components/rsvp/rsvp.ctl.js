(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .controller('rsvpController', rsvpController);

  function rsvpController ($http, $scope, $rootScope, $mdToast) {
    $scope.submitCaption = 'Submit';

    var vm = this;
    vm.inTransit = false;
    vm.retrieveRsvp = retrieveRsvp;
    vm.submitRsvp = submitRsvp;

    $rootScope.breadcrumb = 'RSVP';

    retrieveRsvp();

    function retrieveRsvp () {
      $http.get('/api/v1/rsvps/' + $rootScope.id)
      .then(function successCallback(response) {
          vm.data = response.data;
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
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
