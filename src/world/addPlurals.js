//in World.proto..
const addPlurals = function(plurals) {
  Object.keys(plurals || {}).forEach(k => {
    this.plurals[k] = plurals[k];
    //add them both to the lexicon, too
    let plural = this.words[k];
    this.words[k] = this.words[k] || 'Singular';
    this.words[plural] = this.words[plural] || 'Plural';
  });
};
module.exports = addPlurals;
