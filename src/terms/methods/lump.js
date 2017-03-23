'use strict';
const combine = require('../../tagger/lumper/combine');
const mutate = require('../mutate');


const lumpMethods = (Terms) => {

  const methods = {

    //turn these terms into 1 term, with shared tags
    lump: function () {
      let index = this.index();

      //collect the tags up
      let tags = {};
      this.terms.forEach((t) => {
        Object.keys(t.tag).forEach((tag) => tags[tag] = true);
      });

      //lump the whole-thing together
      if (this.parentTerms === this) {
        //merge-together our current match into one term
        let len = this.terms.length;
        for(let i = 0; i < len; i++) {
          combine(this, 0);
        }
        let lumped = this.terms[0];
        lumped.tag = tags;
        this.terms = [lumped];
        return this;
      }

      //otherwise lump just part of it
      this.parentTerms = mutate.deleteThese(this.parentTerms, this);
      //merge-together our current match into one term
      let len = this.terms.length;
      for(let i = 0; i < len; i++) {
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
