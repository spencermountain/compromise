//lexicon in compressed form
const pckd = require('./_lexicon');
const efrt = require('efrt');
const buildUp = require('./buildUp');
const indexFirst = require('./firstWords');

const uncompressed = [
  //(order matters)
  require('./uncompressed/abbreviations'),
  require('./uncompressed/irregularPlurals').lexicon,
  require('./uncompressed/irregularVerbs').lexicon,
  require('./uncompressed/irregularAdjectives').lexicon,
  require('./uncompressed/orgWords'),
  require('./uncompressed/numbers').lexicon,
  require('./uncompressed/misc')
];

const addToLex = function(lex, obj) {
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    if (lex[keys[i]] === undefined) {
      lex[keys[i]] = obj[keys[i]];
    }
  }
};

let lex = efrt.unpack(pckd);

uncompressed.forEach(obj => addToLex(lex, obj));
// console.log(Object.keys(lex).length);
lex = buildUp(lex);
// console.log(lex.early);
// console.log(Object.keys(lex).length);

//collect first-of-multi words for quicker lookup
let firstWords = indexFirst(lex);

module.exports = {
  lexicon: lex,
  firstWords: firstWords
};
