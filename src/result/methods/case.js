'use strict';
// const Terms = require('../index');
// console.log(Terms.build)

const caseMethods = (Text) => {

  const methods = {

    toTitleCase: function () {
      this.list.forEach((ts) => {
        ts.toTitleCase()
      })
      return this
    },

  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = caseMethods;
