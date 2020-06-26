'use strict';
angular.module('main')
  .component('mainView', {
    templateUrl: 'main/components/main-view/main-view-component.html',
    restrict: 'EA',
    transclude: true,
    bindings: {
      content: '=', // bind via attribute
    },
    controllerAs: 'ctrl', // enable controllerAs syntax
    controller: function (
      $scope,
      $state,
      $http
      
    ) {
      let ctrl = this

      // Tips.getFive(ctrl, 'tips')

      new Parse.Cloud.run('fa_home_image')
        .then(res => {
          console.log(res)
          ctrl.imgUrl = res.image
        })
        .catch(e => console.log(e))

      ctrl.saveTip = (tip) => {
        Parse.Object.saveAll(new Tip({ text: tip }))
          .then(() => toastr.success(`Tip saved!`))
          .catch(e => console.log(`Error: ${e}`))
      }

    }
  });
