'use strict';
const Terms = require('../paths').Terms

const insertMethods = (Text) => {

  const methods = {
    /** add these terms to the end */
    append: function (str) {
      this.list.forEach((ts) => {
        ts.append(str)
      })
      return this;
    },
  };
  //put them on Result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};
module.exports = insertMethods;
