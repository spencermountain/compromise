'use strict';

const methods = {
  text: function (ts) {
    return ts.terms.reduce((str, t) => {
      str += t.out('text');
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
  },

  html: function (ts) {
    return ts.terms.map((t) => t.render.html()).join(' ');
  },
  check: function(ts) {
    ts.terms.forEach((t) => {
      t.out('check');
    });
  }
};
methods.plaintext = methods.text;
methods.normalize = methods.normal;
methods.normalized = methods.normal;
methods.tags = methods.terms;


const renderMethods = (Terms) => {
  Terms.prototype.out = function(str) {
    if (methods[str]) {
      return methods[str](this);
    }
    return methods.text(this);
  };
  //check method
  Terms.prototype.check = function () {
    return methods.check(this);
  };
  return Terms;
};

module.exports = renderMethods;
