'use strict';

const methods = {
  text: function (ts) {
    return ts.terms.reduce((str, t) => {
      str += t.whitespace.before + t.text + t.whitespace.after;
      return str;
    }, '');
  },

  normal: function (ts) {
    let terms = ts.terms.filter((t) => {
      return t.text;
    });
    terms = terms.map((t) => {
      return t.normal; //+ punct;
    });
    return terms.join(' ');
  },

  /** no punctuation, fancy business **/
  root: function (ts) {
    return ts.terms.filter((t) => t.text).map((t) => t.normal).join(' ').toLowerCase();
  }
};
methods.plaintext = methods.text;
methods.normalize = methods.normal;
methods.normalized = methods.normal;


const renderMethods = (Terms) => {
  Terms.prototype.out = function(str) {
    if (methods[str]) {
      return methods[str](this);
    }
    return null;
  };
  //check method
  Terms.prototype.check = function () {
    this.terms.forEach((t) => {
      t.render.check();
    });
  };
  return Terms;
};

module.exports = renderMethods;
