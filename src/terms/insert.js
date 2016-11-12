'use strict';

const insertMethods = (Terms) => {

  const methods = {
    append: function (str) {
      let terms = Terms.tokenize(str)
        // console.log(terms)
      return this
    },
  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = insertMethods;
