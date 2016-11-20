'use strict';
const Term = require('../../term');
const fns = require('../paths').fns


const transforms = (Terms) => {

  const methods = {

    insertAt: function (text, i) {
      let term = new Term(text, this.context);
      this.terms.splice(i + 1, 0, term);
      return this;
    },
    clone: function () {
      let terms = this.terms.map((t) => {
        return t.clone();
      });
      return new Terms(terms, this.context);
    },

    remove: function (reg) {
      if (!reg) {
        this.terms.forEach((t) => {
          t.remove();
        });
        return this;
      }
      let foundTerms = []
        //this is pretty shit code..
      let mtArr = this.match(reg).list;
      mtArr.forEach((ms) => {
        ms.terms.forEach((t) => {
          foundTerms.push(t)
        })
      })
      let terms = this.terms.filter((t) => {
        for (let i = 0; i < foundTerms.length; i++) {
          if (t === foundTerms[i]) {
            return false;
          }
        }
        return true;
      });
      return new Terms(terms, this.context);
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

module.exports = transforms;;
