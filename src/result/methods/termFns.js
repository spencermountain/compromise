'use strict';
const Terms = require('../../terms');

const termLoops = (Text) => {

  const methods = {

    mapTerms: function (fn) {
      return this.terms().list.map((ts) => {
        return fn(ts.terms[0]);
      });
    },
    forEachTerms: function(fn) {
      this.terms().list.forEach((ts) => {
        return fn(ts.terms[0]);
      });
      return this;
    },
    filterTerms: function (fn) {
      let list = [];
      this.list.forEach((ts) => {
        let terms = ts.terms.filter(fn);
        if (terms.length) {
          list.push(new Terms(terms, this.lexicon, this.parent, this.parentTerms));
        }
      });
      let parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

  };

  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = termLoops;
