const lib = require('./lib');

const stitchIn = function(original, index, termList) {
  let afterId = original[index].next;
  //stitch our first term in
  original[index].next = termList[0].id;
  //stich the back in
  termList[termList.length - 1].next = afterId;
};

const stretchPhrase = function(phrase, termList) {
  phrase.length += termList.length;
  return phrase;
};

const addTermsAfter = function(phrase, termList) {
  let original = phrase.terms();
  let index = termList.length - 1;
  stitchIn(original, index, termList);
  phrase = stretchPhrase(phrase, termList);
  return phrase;
};


module.exports = addTermsAfter;
