'use strict';

const renderMethods = (Terms) => {

  const methods = {

    plaintext: function () {
      return this.terms.reduce((str, t, i) => {
        // if (i === 0) {
        //   str += t.text + t.whitespace.after;
        // } else if (i === this.terms.length - 1) {
        //   str += t.whitespace.before + t.text
        // } else {
        str += t.whitespace.before + t.text + t.whitespace.after;
        // }
        return str;
      }, '');
    },

    normal: function () {
      return this.terms.filter((t) => t.text).map((t) => t.normal).join(' ');
    },

    check: function () {
      this.terms.forEach((t) => {
        t.render.check();
      });
    }
  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = renderMethods;
