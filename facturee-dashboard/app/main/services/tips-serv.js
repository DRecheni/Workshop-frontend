'use strict';
angular.module('main')
  .service('Tip', function (
    Parse,
    ModelConverter
  ) {

    const def = {
      text: { type: String },
    }

    const Tip = ModelConverter.patchObject("Tip", def)

    Tip.getFive = function (target, key) {
      return new Parse.Query(this)
        .limit(5)
        .find()
        .then(
          (res) => target[key] = res
        )
    }

    return Tip

  });
