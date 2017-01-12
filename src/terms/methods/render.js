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
      let terms = this.terms.filter((t) => {
        return t.text;
      });
      terms = terms.map((t) => {
        return t.normal; //+ punct;
      });
      return terms.join(' ');
    },

    /** no punctuation, fancy business **/
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
