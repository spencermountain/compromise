//collect the first-words of multiple-word-terms, for quicker lookup
const reIndex = function(lex) {
  let firstWords = {};
  let keys = Object.keys(lex);
  const hasSpace = / /;
  for (let i = 0; i < keys.length; i++) {
    if (hasSpace.test(keys[i]) === true) {
      let words = keys[i].split(/ /g);
      firstWords[words[0]] = firstWords[words[0]] || [];
      let str = words.slice(1).join(' ');
      firstWords[words[0]][str] = true;
    }
  }
  return firstWords;
};
module.exports = reIndex;
