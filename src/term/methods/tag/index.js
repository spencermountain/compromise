'use strict';
const setTag = require('./setTag');
const unTag = require('./unTag');
const tagset = require('./paths').tags;

const addMethods = (Term) => {

  const methods = {
    /** set the term as this part-of-speech */
    tagAs: function(tag, reason) {
      setTag(this, tag, reason);
    },
    /** remove this part-of-speech from the term*/
    unTag: function(tag, reason) {
      unTag(this, tag, reason);
    },

    /** is this tag compatible with this word */
    canBe: function (tag) {
      tag = tag || '';
      tag = tag.replace(/^#/, '');
      let not = tagset[tag].not || [];
      for (let i = 0; i < not.length; i++) {
        if (this.tag[not[i]]) {
          return false;
        }
      }
      return true;
    },

  };

  //hook them into term.prototype
  Object.keys(methods).forEach((k) => {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;
