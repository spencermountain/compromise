'use strict';

const tagMethods = (Terms) => {

  const methods = {
    tagAs: function (tag, reason) {
      this.terms.forEach((t) => {
        t.tagAs(tag, reason);
      });
      return this
    },
    unTag: function (tag, reason) {
      this.terms.forEach((t) => {
        t.unTag(tag, reason);
      });
      return this
    },
    canBe: function (tag) {
      this.terms = this.terms.filter((t) => {
        return t.term.canBe(tag)
      })
      return this
    }
  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = tagMethods;
