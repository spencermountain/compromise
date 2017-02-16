'use strict';

const splitMethods = (Text) => {

  const methods = {

    /**tag all the terms in this result as something */
    tag: function (tag, reason) {
      this.list.forEach((ts) => {
        ts.tagAs(tag, reason, this.tagSet);
      });
      return this;
    },
    /**remove a tag in all the terms in this result (that had it) */
    unTag: function (tag, reason) {
      this.list.forEach((ts) => {
        ts.unTag(tag, reason, this.tagSet);
      });
      return this;
    },

    /** see if these terms can become this tag*/
    canBe: function (tag) {
      this.list.forEach((ts) => {
        ts.terms = ts.terms.filter((t) => {
          return t.canBe(tag, this.tagSet);
        });
      });
      return this;
    },

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = splitMethods;
