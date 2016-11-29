'use strict';
const Terms = require('../../terms');

const splitMethods = (Result) => {

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
      for (let i = 0; i < this.list.length; i++) {
        if (!this.list[i].canBe(tag)) {
          return false
        }
      }
      return true
    },

    /** only tag this selection if it's consistent */
    tagMaybe: function (tag) {
      if (this.canBe(tag)) {
        this.tag(tag)
      }
    }
  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};

module.exports = splitMethods;
