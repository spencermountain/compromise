'use strict';

const removeMethods = (Terms) => {

  const methods = {

    remove: function (reg) {
      //actually remove selected terms
      if (reg) {
        this.select(reg)
      }
      this.terms = this.terms.filter((t) => !t.sel) //bye!
      return this.all()
    },


    //like match, but remove them from original
    // pluck: function (reg) {
    //   let found = this.match(reg)
    //     //remove them from `this`
    //   let index = 0
    //   let lookFor = found.terms[index]
    //   this.terms = this.terms.filter((t) => {
    //     if (t === lookFor) {
    //       index += 1
    //       lookFor = found.terms[index]
    //       return false
    //     }
    //     return true
    //   })
    //   return found
    // }

  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = removeMethods;;
