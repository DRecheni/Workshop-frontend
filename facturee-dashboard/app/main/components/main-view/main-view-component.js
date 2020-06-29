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
      $http,
      $timeout,
      Tip
    ) {
      let ctrl = this
      ctrl.displayTips = false
      Tip.getFive(ctrl, 'tips').then(() => $timeout(()=> ctrl.displayTips = true, 1))

      new Parse.Cloud.run('fa_home_image')
        .then(res => {
          console.log(res)
          ctrl.imgUrl = res.image
        })
        .catch(e => console.log(e))

      ctrl.saveTip = (tip) => {
        if (!tip) toastr.error(`Type a tip first!`)
        Parse.Object.saveAll(new Tip({ text: tip }))
          .then(() => {
            toastr.success(`Tip saved!`)
            ctrl.displayTips = false
            $timeout(()=> ctrl.displayTips = true, 1)
          })
          .catch(e => console.log(`Error: ${e}`))
      }

    }
  });
