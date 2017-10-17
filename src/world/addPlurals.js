'use strict';
//put singular->plurals in world, the reverse in cache,
//and both forms in the lexicon
const addPlurals = function(obj) {
  Object.keys(obj).forEach((sing) => {
    let plur = obj[sing];
    this.plurals[sing] = plur;
    //add them both to the lexicon
    this.words[plur] = this.words[plur] || 'Plural';
    this.words[sing] = this.words[sing] || 'Singular';
    //denormalize them in cache.toPlural
    this.cache.toSingular[plur] = sing;
  });
  return obj;
};
module.exports = addPlurals;
