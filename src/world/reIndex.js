

//add plural nouns to words
const addNouns = function(w) {
  if (w.plurals) {
    Object.keys(w.plurals).forEach((sing) => {
      w.words[sing] = 'Singular';
      w.words[w.plurals[sing]] = 'Plural';
    });
  }
};

//add verb conjugations to words
const addVerbs = function(w) {
  if (w.conjugations) {
    Object.keys(w.conjugations).forEach((inf) => {
      w.words[inf] = 'Infinitive';
      Object.keys(w.conjugations[inf]).forEach((tag) => {
        let word = w.conjugations[inf][tag];
        w.words[word] = tag;
      });
    });
  }
};

const reIndex = function(w) {
  addNouns(w);
  addVerbs(w);
};
module.exports = reIndex;
