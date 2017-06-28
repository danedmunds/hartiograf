'use strict';

angular
  .module('hartiografApp', ['ngMaterial', 'ui.router', 'ngCookies'])
  .config(function ($provide, $urlRouterProvider, $stateProvider, $httpProvider,
    $mdThemingProvider, $locationProvider) {

    // $mdThemingProvider.theme('default')
    //   .primaryPalette('deep-orange');

    // $locationProvider.html5Mode({enabled: true});

    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'components/home/home.tpl.html',
        controller: 'homeController as home'
      })
      .state('venue', {
        url: '/venue',
        templateUrl: 'components/venue/venue.tpl.html',
        controller: 'venueController as venue'
      })
      .state('accommodations', {
        url: '/accommodations',
        templateUrl: 'components/accommodations/accommodations.tpl.html',
        controller: 'accommodationsController as accommodations'
      })
      .state('shuttle', {
        url: '/shuttle',
        templateUrl: 'components/shuttle/shuttle.tpl.html',
        controller: 'shuttleController as shuttle'
      })
      .state('wedding-party', {
        url: '/wedding-party',
        templateUrl: 'components/wedding-party/wedding-party.tpl.html',
        controller: 'weddingPartyController as weddingParty'
      }).state('rsvp', {
        url: '/rsvp',
        templateUrl: 'components/rsvp/rsvp.tpl.html',
        controller: 'rsvpController as rsvp'
      }).state('visits', {
        url: '/visits',
        templateUrl: 'components/visits/visits.tpl.html',
        controller: 'visitsController as vm'
      });
  })
  .run(function($cookies, $location, $rootScope) {
    // http://localhost:8080/#!/home?id=2311
    var id = $location.search().id || $cookies.get('id');
    if (id) {
      $cookies.put('id', id);
      $rootScope.isAuthenticated = true;
      $rootScope.id = id;
    }
  })
