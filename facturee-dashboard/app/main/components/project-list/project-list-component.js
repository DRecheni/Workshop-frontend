'use strict';
angular.module('main')
.component('projectList', {
  templateUrl: 'main/components/project-list/project-list-component.html',
  restrict: 'EA',
  transclude: true,
  bindings: {
    content: '=', // bind via attribute
  },
  controllerAs: 'ctrl', // enable controllerAs syntax
  controller: function (
    $scope,
    $state,
    Parse
  ) {
    // retrieve some info via dependency injection
    this.currentState = $state.current.name;
  }
});
