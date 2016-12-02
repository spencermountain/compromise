'use strict';
const mutate = require('../mutate');

const removeMethods = (Terms) => {

  const methods = {

    remove: function (reg) {
      if (!reg) {
        this.parentTerms = mutate.deleteThese(this.parentTerms, this)
        return this
      }
      let found = this.match(reg)
      this.parentTerms = mutate.deleteThese(this.parentTerms, found)
      return this
    },


    //like match, but remove them from original
    pluck: function (reg) {
      let found = this.match(reg)
        //remove them from `this`
      let index = 0
      let lookFor = found.terms[index]
      this.terms = this.terms.filter((t) => {
        if (t === lookFor) {
          index += 1
          lookFor = found.terms[index]
          return false
        }
        return true
      })
      return found
    }

  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = removeMethods;;;
