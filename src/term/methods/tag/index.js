'use strict';
const setTag = require('./setTag');
const unTag = require('./unTag');
const canBe = require('./canBe');
const tagset = require('../../paths').tags;

const addMethods = (Term) => {

  const methods = {
    /** set the term as this part-of-speech */
    tag: function(tag, reason) {
      setTag(this, tag, reason);
    },
    /** remove this part-of-speech from the term*/
    unTag: function(tag, reason) {
      unTag(this, tag, reason);
    },

    /** is this tag compatible with this word */
    canBe: function (tag) {
      return canBe(this, tag);
    },

  };

  //hook them into term.prototype
  Object.keys(methods).forEach((k) => {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;
