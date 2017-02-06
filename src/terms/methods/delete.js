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
      return this.parentTerms;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = deleteMethods;
