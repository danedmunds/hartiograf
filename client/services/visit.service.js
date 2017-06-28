(function () {

  'use strict';

  angular
    .module('hartiografApp')
    .service('visitService', visitService);

  function visitService ($rootScope, $http, $q) {
    this.visited = visited;
    this.getAllVisits = getAllVisits;

    function visited (page) {
      if (!$rootScope.id) {
        return
      }

      $http.post('/api/v1/rsvps/' + $rootScope.id + '/visits', { page: page }).then(
        function successCallback(response) {
          // nothing
          console.log('success ' + page)
        },
        function errorCallback(response) {
          // nothing
          console.log('fail ' + page)
        }
      )
    };

    function getAllVisits (auth) {
      return $q(function (resolve, reject) {
        $http.get('/api/v1/visits', {
          headers: {
            'Authorization': 'Basic ' + auth
          }
        }).then(
          function successCallback(response) {
            resolve(response.data.map(function (element) {
              return {
                guests: element.guests,
                visits: element.visits.map(function (visit) {
                  return {
                    page: visit.page,
                    date: new Date(visit.date)
                  }
                })
              }
            }))
          },
          function errorCallback(response) {
            reject(response)
          }
        )
      })
    }
  }
})();
