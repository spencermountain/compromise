'use strict';

const miscMethods = (Terms) => {

  const methods = {
    plaintext: function() {
      return this.terms.reduce((str, t) => {
        str += t.plaintext();
        return str;
      }, '');
    },
    normal: function() {
      return this.terms.filter((t) => t.text).map((t) => t.normal).join(' ');
    }
  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = miscMethods;
