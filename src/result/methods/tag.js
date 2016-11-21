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

  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};

module.exports = splitMethods;
