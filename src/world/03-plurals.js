
const addWords = function(plurals, lex) {
  let keys = Object.keys(plurals);
  for(let i = 0; i < keys.length; i += 1) {
    let k = keys[i];
    lex[k] = 'Singular';
    lex[plurals[k]] = 'Plural';
  }
};

const unpackPlurals = function(str, lexicon) {
  const plurals = str.split(/,/g).reduce((h, s) => {
    let arr = s.split(/\|/g);
    if (arr.length === 3) {
      h[arr[0] + arr[1]] = arr[0] + arr[2];
    } else if (arr.length === 2) {
      h[arr[0]] = arr[0] + arr[1];
    } else {
      h[arr[0]] = arr[0];
    }
    return h;
  }, {});
  //add them both to our lexicon..
  addWords(plurals, lexicon);
  return plurals;
};
module.exports = unpackPlurals;
