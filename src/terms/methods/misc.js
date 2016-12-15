'use strict';

const miscMethods = (Terms) => {

  const methods = {
    term: function (n) {
      return this.terms[n];
    },
    first: function () {
      let t = this.terms[0];
      return new Terms([t]);
    },
    last: function () {
      let t = this.terms[this.terms.length - 1];
      return new Terms([t]);
    },
    endPunctuation: function () {
      return this.last().terms[0].endPunctuation();
    },
    canBe: function (tag) {
      tag = tag || '';
      tag = tag.replace(/^#/, '');
      //atleast one of these
      for (let i = 0; i < this.terms.length; i++) {
        if (!this.terms[i].term.canBe(tag)) {
          return false;
        }
      }
      return true;
    },
    index: function() {
      let parent = this.parentTerms;
      let first = this.terms[0];
      if (!parent || !first) {
        return null; //maybe..
      }
      for(let i = 0; i < parent.terms.length; i++) {
        if (first === parent.terms[i]) {
          return i;
        }
      }
      return null;
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = miscMethods;
