'use strict';
angular.module('main')
.component('navBar', {
  templateUrl: 'main/components/nav-bar/nav-bar-component.html',
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
    // retrieve some info via dependency injection
    this.currentState = $state.current.name;
  }
});
