'use strict';
const tagger = require('../../tagger');

const miscMethods = Terms => {
  const methods = {
    tagger: function() {
      tagger(this);
      return this;
    },
    firstTerm: function() {
      return this.terms[0];
    },
    lastTerm: function() {
      return this.terms[this.terms.length - 1];
    },
    all: function() {
      return this.parent;
    },
    data: function() {
      return {
        text: this.out('text'),
        normal: this.out('normal')
      };
    },
    term: function(n) {
      return this.terms[n];
    },
    first: function() {
      let t = this.terms[0];
      return new Terms([t], this.world, this.refText, this.refTerms);
    },
    last: function() {
      let t = this.terms[this.terms.length - 1];
      return new Terms([t], this.world, this.refText, this.refTerms);
    },
    slice: function(start, end) {
      let terms = this.terms.slice(start, end);
      return new Terms(terms, this.world, this.refText, this.refTerms);
    },
    index: function() {
      let parent = this.parentTerms;
      let first = this.terms[0];
      if (!parent || !first) {
        return null; //maybe..
      }
      for (let i = 0; i < parent.terms.length; i++) {
        if (first === parent.terms[i]) {
          return i;
        }
      }
      return null;
    },
    termIndex: function() {
      let first = this.terms[0];
      let ref = this.refText || this;
      if (!ref || !first) {
        return null; //maybe..
      }
      let n = 0;
      for (let i = 0; i < ref.list.length; i++) {
        let ts = ref.list[i];
        for (let o = 0; o < ts.terms.length; o++) {
          if (ts.terms[o] === first) {
            return n;
          }
          n += 1;
        }
      }
      return n;
    },
    //number of characters in this match
    chars: function() {
      return this.terms.reduce((i, t) => {
        i += t.whitespace.before.length;
        i += t.text.length;
        i += t.whitespace.after.length;
        return i;
      }, 0);
    },
    //just .length
    wordCount: function() {
      return this.terms.length;
    },
    /** punctuation */
    setPunctuation: function(punct) {
      let last = this.terms[this.terms.length - 1];
      last.setPunctuation(punct);
    },
    getPunctuation: function() {
      let lastTerm = this.last().terms[0];
      if (!lastTerm) {
        return '';
      }
      return lastTerm.getPunctuation() || '';
    },
    //this has term-order logic, so has to be here
    toCamelCase: function() {
      this.toTitleCase();
      this.terms.forEach((t, i) => {
        if (i !== 0) {
          t.whitespace.before = '';
        }
        t.whitespace.after = '';
      });
      this.tag('#CamelCase', 'toCamelCase');
      return this;
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach(k => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = miscMethods;
