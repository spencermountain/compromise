'use strict';

const replaceMethods = (Text) => {

  const methods = {
    /** remove this subset, and insert this new thing in there */
    replace: function (reg, str) {
      this.list.forEach((ts) => {
        ts.replace(reg, str);
      });
      return this.parent;
    },
    replaceWith: function (str) {
      this.list.forEach((ts) => {
        ts.replaceWith(str);
      });
      return this.parent;
    },
  };
  //put them on Result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};
module.exports = replaceMethods;
