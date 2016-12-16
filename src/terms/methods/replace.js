'use strict';
const mutate = require('../mutate');

const replaceMethods = (Terms) => {
  const methods = {

    /**swap this for that */
    replace: function (str1, str2) {
      //in this form, we 'replaceWith'
      if (str2 === undefined) {
        return this.replaceWith(str1);
      }
      this.match(str1).replaceWith(str2);
      return this;
    },


    /**swap this for that */
    replaceWith: function (str, tag) {
      let ts = Terms.fromString(str);
      if (tag) {
        ts.tagAs(tag, 'user-given');
      }
      let index = this.index();
      this.parentTerms = mutate.deleteThese(this.parentTerms, this);
      let parent = mutate.insertAt(this.parentTerms, index, ts);
      this.terms = ts.terms;
      this.parentTerms = parent;
      return ts;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = replaceMethods;
