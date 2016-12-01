'use strict';
const Terms = require('../../terms');

const splitMethods = (Text) => {

  const methods = {

    /**tag all the terms in this result as something */
    tag: function (tag, reason) {
      this.terms().forEach((t) => {
        t.tagAs(tag, reason);
      });
      return this;
    },
    /**remove a tag in all the terms in this result (that had it) */
    unTag: function (tag, reason) {
      this.terms().forEach((t) => {
        t.unTag(tag, reason);
      });
      return this;
    },

    /** see if these terms can become this tag*/
    canBe: function (tag) {
      this.list.forEach((ts) => {
        ts.terms = ts.terms.filter((t) => {
          return t.term.canBe(tag)
        })
      })
      return this
    },

  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = splitMethods;
