'use strict';

const renderMethods = (Terms) => {

  const methods = {

    plaintext: function () {
      return this.terms.reduce((str, t) => {
        str += t.whitespace.before + t.text + t.whitespace.after;
        return str;
      }, '');
    },

    normal: function () {
      return this.terms.filter((t) => t.text).map((t) => t.normal).join(' ');
    },

    root: function () {
      return this.terms.filter((t) => t.text).map((t) => t.normal).join(' ').toLowerCase();
    },

    check: function () {
      this.terms.forEach((t) => {
        t.render.check();
      });
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = renderMethods;
