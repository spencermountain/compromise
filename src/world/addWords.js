const normalize = require('../term/methods/normalize/normalize').normalize;
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
    //multi-word cache
    if (wordReg.test(word) === true) {
      let arr = word.split(wordReg);
      this.cache.firstWords[arr[0]] = true;
    }
  });

  return words;
};
module.exports = addWords;
