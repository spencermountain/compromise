'use strict';

const hyphenMethods = (Text) => {

  const methods = {

    /** replace whitespace with hyphens*/
    hyphenate: function () {
      this.forEach((ts) => {
        ts.hyphenate();
      });
      return this;
    },

    /** replace hyphens with whitespace*/
    deHyphenate: function () {
      this.forEach((ts) => {
        ts.deHyphenate();
      });
      return this;
    },


  };
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};
module.exports = hyphenMethods;
