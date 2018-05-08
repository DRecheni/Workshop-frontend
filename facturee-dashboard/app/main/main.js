'use strict';



angular.module('main', [
  'ui.router',
  'ngParse',
  'ui.bootstrap'
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {



  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('app',
      {

        abstract: true,
        templateUrl: 'main/templates/layout-full.html',
        // controller: 'SomeCtrl as ctrl'
      }
    )
    .state('app.main',
      {
        url: '/',
        template: '<h1>Collio </h1>',
        // templateUrl: 'main/templates/<someTemplate>.html',
        // controller: 'SomeCtrl as ctrl'
      }
    )
    .state('appSimple',
      {

        abstract: true,
        templateUrl: "main/templates/"

      }
    );




})
.config(function (ParseProvider,Config, $windowProvider) {

  const MY_PARSE_APP_ID = Config.ENV.appId;
  const MY_PARSE_JS_KEY = Config.ENV.JSKey;
  const SERVER_URL = Config.ENV.serverURL;

  var $window = $windowProvider.$get();

  $window.Parse.serverURL = SERVER_URL;
  ParseProvider.initialize(MY_PARSE_APP_ID,MY_PARSE_JS_KEY);


});


