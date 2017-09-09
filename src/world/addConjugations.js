//in World.proto..
const addConjugations = function(conjugations) {
  Object.keys(conjugations || {}).forEach(k => {
    this.conjugations[k] = conjugations[k];
    //add them both to the lexicon, too
    // let plural = plurals[k];
    this.words[k] = this.words[k] || 'Infinitive';
    // this.words[plural] = this.words[plural] || 'Plural';
  });
};
module.exports = addConjugations;
