'use strict';
angular.module('main')
.constant('Config', {

  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    'serverURL': 'http://localhost:1337/1',
    'appId': 'myAppId',
    'JSKEy': 'Z4BaU4AU37Fari86Kra1osNa9czGhmRhAe6fXPqS'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});
