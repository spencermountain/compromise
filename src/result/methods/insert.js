'use strict';
// const Terms = require('../index');
// console.log(Terms.build)

const insertMethod = (Text) => {

  const methods = {

    /**append/prepend */
    insertBefore: function (str) {
      this.list.forEach((ts) => {
        ts.insertBefore(str)
      })
      return this
    },
    insertAfter: function (str) {
      this.list.forEach((ts) => {
        ts.insertAfter(str)
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

module.exports = insertMethod;
