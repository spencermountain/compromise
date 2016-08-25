'use strict';
//
const parse = function(arr) {
  let parts = {
    auxillaries: [],
    adverbs: [],
    negation: null,
    particle: null,
    prefix: null,
    root: null
  };

  for(let i = 0; i < arr.length; i++) {
    let t = arr.get(i);
    //auxillaries like 'will have'
    if (t.tag.Auxillary) {
      parts.auxillaries.push(t.normal);
      continue;
    }
    //adverbs like 'quickly'
    if (t.tag.Adverb) {
      parts.adverbs.push(t.normal);
      continue;
    }
    //otherwise, it's the root
    parts.root = t;
    console.log(t.tag);
  }
  console.log('-');
  console.log(parts);
  return parts;
};

module.exports = parse;
