'use strict';
// const Terms = require('../index');
// console.log(Terms.build)

const caseMethods = (Text) => {

  const methods = {

    /**He is nice -> He Is Nice */
    toTitleCase: function () {
      this.list.forEach((ts) => {
        ts.toTitleCase();
      });
      return this;
    },
    /**He is nice -> HE IS NICE */
    toUpperCase: function () {
      this.list.forEach((ts) => {
        ts.toUpperCase();
      });
      return this;
    },
    /**He is nice -> he is nice */
    toLowerCase: function () {
      this.list.forEach((ts) => {
        ts.toLowerCase();
      });
      return this;
    },
    /**He is nice -> HeIsNice */
    toCamelCase: function () {
      this.list.forEach((ts) => {
        ts.toTitleCase();
        ts.terms.forEach((t) => {
          t.whitespace.before = '';
          t.whitespace.after = '';
        });
      });
      return this;
    },

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = caseMethods;
