'use strict';
//
const parse = function(arr) {
  let parts = {
    auxillaries: [],
    adverbs: [],
    negation: null,
    particle: null,
    root: null
  };
  for(let i = 0; i < arr.length; i++) {
    let t = arr.get(i);
    //tag 'not'
    if (t.tag.Negative) {
      parts.negation = t;
      continue;
    }
    //auxillaries like 'will have'
    if (t.tag.Auxillary) {
      parts.auxillaries.push(t);
      continue;
    }
    //adverbs like 'quickly'
    if (t.tag.Adverb) {
      parts.adverbs.push(t);
      continue;
    }
    //particles like 'up'
    if (t.tag.Particle) {
      parts.particle = t;
      continue;
    }
    //otherwise, it's the root
    if (t.tag.Verb) {
      parts.root = t;
    }
  }
  return parts;
};

module.exports = parse;
