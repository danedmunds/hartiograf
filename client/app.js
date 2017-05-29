'use strict';

angular
  .module('hartiografApp', ['ngMaterial', 'ui.router', 'ngCookies'])
  .config(function ($provide, $urlRouterProvider, $stateProvider, $httpProvider,
    $mdThemingProvider, $locationProvider) {

    // $mdThemingProvider.theme('default')
    //   .primaryPalette('teal');

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
      });
  })
  .run(function($cookies, $location, $rootScope) {
    // http://localhost:8080/#!/home?token=2311&id=2312312
    var token = $location.search().token || $cookies.get('token');
    if (token) {
      $cookies.put('token', token);
      $rootScope.isAuthenticated = true;
    }

    var id = $location.search().id || $cookies.get('id');
    if (id) {
      $cookies.put('id', id);
      $rootScope.id = id
    }
  })
