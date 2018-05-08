'use strict';
angular.module('main')
.component('login', {
  template: '<h1>HELLO WORLD</h1>',
  restrict: 'EA',
  transclude: true,
  bindings: {
    content: '=', // bind via attribute
  },
  controllerAs: 'ctrl', // enable controllerAs syntax
  controller: function (
    $scope,
    $state
  ) {



    this.doLogin = function () {
      $state.go("app.main")
    }

  }
});
