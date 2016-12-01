'use strict';
const Terms = require('../paths').Terms

const replaceMethods = (Text) => {

  const methods = {
    /** remove this subset, and insert this new thing in there */
    replace: function(reg) {

      return this;
    },
  };
  //put them on Result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};
module.exports = replaceMethods;
