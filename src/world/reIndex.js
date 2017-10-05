const hasSpace = / /;

//collect the first-words of multiple-word-terms, for quicker lookup
const multiWord = function(w) {
  let keys = Object.keys(w.words);
  for (let i = 0; i < keys.length; i++) {
    if (hasSpace.test(keys[i]) === true) {
      let words = keys[i].split(/ /g);
      if (w.firstWords[words[0]] === undefined) {
        w.firstWords[words[0]] = [];
      }
      let str = words.slice(1).join(' ');
      w.firstWords[words[0]][str] = true;
    }
  }
};

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
  multiWord(w);
  addNouns(w);
  addVerbs(w);
};
module.exports = reIndex;
