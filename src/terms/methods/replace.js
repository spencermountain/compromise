'use strict';

const replaceMethods = (Terms) => {
  const methods = {

    /**swap this for that */
    replace: function (reg, str) {
      //in this form, we 'replaceWith'
      if (str === undefined) {
        return this.replaceWith(reg)
      }
      let ts = this.match(reg)
      ts.replaceWith(str)
      return this
    },
    /**swap this for that */
    replaceWith: function (str) {
      let ts = Terms.fromString(str)
      this.terms = ts.terms
      return this
    }

  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = replaceMethods;
