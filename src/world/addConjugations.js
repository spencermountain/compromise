//extend our current irregular conjugations, overwrite if exists
//also, map the irregulars for easy infinitive lookup - {bought: 'buy'}
const addConjugations = function(obj) {
  Object.keys(obj).forEach((inf) => {
    this.conjugations[inf] = this.conjugations[inf] || {};
    Object.keys(obj[inf]).forEach((tag) => {
      //add this to our conjugations
      this.conjugations[inf][tag] = obj[inf][tag];
      //also denormalize to cache.toInfinitive
      this.cache.toInfinitive[obj[inf][tag]] = inf;
    });
  });
  return obj;
};
module.exports = addConjugations;
