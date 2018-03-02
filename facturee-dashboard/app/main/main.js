'use strict';



angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ngParse'
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {



  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      template: '<ion-view view-title="main"></ion-view>',
      // templateUrl: 'main/templates/<someTemplate>.html',
      // controller: 'SomeCtrl as ctrl'
    });
})
.config(function (ParseProvider,Config, $windowProvider) {

  const MY_PARSE_APP_ID = Config.ENV.appId;
  const MY_PARSE_JS_KEY = Config.ENV.JSKey;
  const SERVER_URL = Config.ENV.serverURL;

  var $window = $windowProvider.$get();


  $window.Parse.serverURL = SERVER_URL;
  ParseProvider.initialize(MY_PARSE_APP_ID,MY_PARSE_JS_KEY);


});
