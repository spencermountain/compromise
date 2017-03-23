'use strict';
const combine = require('../../tagger/lumper/combine');
const mutate = require('../mutate');

const lumpMethods = (Terms) => {

  const methods = {

    //turn these terms into 1 term, with shared tags
    lump: function () {
      let index = this.index();
      //delete from parent
      this.parentTerms = mutate.deleteThese(this.parentTerms, this);
      //collect the tags
      let tags = {};
      this.terms.forEach((t) => {
        Object.keys(t.tag).forEach((tag) => tags[tag] = true);
      });
      //merge-together our current match into one term
      for(let i = 0; i < this.terms.length; i++) {
        combine(this, 0);
      }
      let lumped = this.terms[0];
      lumped.tag = tags;
      //put it back (in the same place)
      this.parentTerms.terms = mutate.insertAt(this.parentTerms.terms, index, lumped);
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
