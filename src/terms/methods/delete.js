'use strict';
const mutate = require('../mutate');

const deleteMethods = (Terms) => {

  const methods = {

    delete: function (reg) {
      //don't touch parent if empty
      if (!this.found) {
        return this;
      }
      //remove all selected
      if (!reg) {
        this.parentTerms = mutate.deleteThese(this.parentTerms, this);
        return this;
      }
      //only remove a portion of this
      let found = this.match(reg);
      if (found.found) {
        let r = mutate.deleteThese(this, found);
        return r;
      }
      return this;
    },


    //like match, but remove them from original
    // pluck: function (reg) {
    //   let found = this.match(reg);
    //   //remove them from `this`
    //   let index = 0;
    //   let lookFor = found.terms[index];
    //   this.terms = this.terms.filter((t) => {
    //     if (t === lookFor) {
    //       index += 1;
    //       lookFor = found.terms[index];
    //       return false;
    //     }
    //     return true;
    //   });
    //   return found;
    // }

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = deleteMethods;
