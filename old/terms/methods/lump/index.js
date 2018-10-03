'use strict';
const combine = require('./combine');
const mutate = require('../../mutate');

//merge-together our current match into one term
const combineThem = function(ts, tags) {
  let len = ts.terms.length;
  for(let i = 0; i < len; i++) {
    combine(ts, 0);
  }
  let lumped = ts.terms[0];
  lumped.tags = tags;
  return lumped;
};

const lumpMethods = (Terms) => {

  Terms.prototype.lump = function () {
    //collect the tags up
    let index = this.index();
    let tags = {};
    this.terms.forEach((t) => {
      Object.keys(t.tags).forEach((tag) => tags[tag] = true);
    });
    //just lump the whole-thing together
    if (this.parentTerms === this) {
      let lumped = combineThem(this, tags);
      this.terms = [lumped];
      return this;
    }
    //otherwise lump just part of it. delete/insert.
    this.parentTerms = mutate.deleteThese(this.parentTerms, this);
    //merge-together our current match into one term
    let lumped = combineThem(this, tags);
    //put it back (in the same place)
    this.parentTerms.terms = mutate.insertAt(this.parentTerms.terms, index, lumped);
    return this;
  };

  return Terms;
};

module.exports = lumpMethods;
