const normalize = require('../term/methods/normalize/normalize').normalize;
const inflect = require('../subset/nouns/methods/pluralize');
const conjugate = require('../subset/verbs/methods/conjugate/faster.js');
const wordReg = / /;

const cleanUp = function(str) {
  str = normalize(str);
  //extra whitespace
  str = str.replace(/\s+/, ' ');
  //remove sentence-punctuaion too
  str = str.replace(/[.\?,;\!]/g, '');
  return str;
};

//
const addWords = function(words) {
  //go through each word
  Object.keys(words).forEach((word) => {
    let tag = words[word];
    word = cleanUp(word);
    this.words[word] = tag;
    //add it to multi-word cache,
    if (wordReg.test(word) === true) {
      let arr = word.split(wordReg);
      this.cache.firstWords[arr[0]] = true;
    }

    //turn singulars into plurals
    if (tag === 'Singular') {
      let plural = inflect(word, {});
      if (plural && plural !== word) {
        this.words[plural] = 'Plural';
      }
      return;
    }
    //turn infinitives into all conjugations
    if (tag === 'Infinitive') {
      let conj = conjugate(word, this);
      Object.keys(conj).forEach((k) => {
        this.words[conj[k]] = k;
      });
    }
  });

  return words;
};
module.exports = addWords;
