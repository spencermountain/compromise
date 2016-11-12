'use strict';
const Term = require('../../term');

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
      let ms = this.match(reg);
      let terms = this.terms.filter((t) => {
        for (let i = 0; i < ms.length; i++) {
          if (t === ms[i]) {
            return false;
          }
        }
        return true;
      });
      return new Terms(terms, this.context);
    }

  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = transforms;
