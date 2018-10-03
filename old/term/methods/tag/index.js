'use strict';
const setTag = require('./setTag');
const unTag = require('./unTag');
const canBe = require('./canBe');

//symbols used in sequential taggers which mean 'do nothing'
//.tag('#Person #Place . #City')
const ignore = {
  '.': true
};
const addMethods = (Term) => {

  const methods = {
    /** set the term as this part-of-speech */
    tag: function(tag, reason) {
      if (ignore[tag] !== true) {
        setTag(this, tag, reason);
      }
    },
    /** remove this part-of-speech from the term*/
    unTag: function(tag, reason) {
      if (ignore[tag] !== true) {
        unTag(this, tag, reason);
      }
    },
    /** is this tag compatible with this word */
    canBe: function (tag) {
      tag = tag || '';
      if (typeof tag === 'string') {
        //everything can be '.'
        if (ignore[tag] === true) {
          return true;
        }
        tag = tag.replace(/^#/, '');
      }
      return canBe(this, tag);
    }
  };

  //hook them into term.prototype
  Object.keys(methods).forEach((k) => {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;
