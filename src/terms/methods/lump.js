'use strict';
const combine = require('../../tagger/lumper/combine');

const lumpMethods = (Terms) => {

  const methods = {

    lump: function () {
      //for (let t = 0; t <= this.terms.length; t++) {
      while(this.terms.length>1)
      {
        combine(this, 0);
      }

      return this;
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = lumpMethods;
