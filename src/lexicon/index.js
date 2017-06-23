//lexicon in compressed form
const pckd = require('./_lexicon');
const efrt = require('efrt');
const blastOut = require('./blastOut');
const indexFirst = require('./indexFirst');

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
    lex[keys[i]] = obj[keys[i]];
  }
};

let lex = efrt.unpack(pckd);

// console.log(lex.quick);
// console.log(Object.keys(lex).length);
lex = blastOut(lex);
// console.log(Object.keys(lex).length);

uncompressed.forEach(obj => addToLex(lex, obj));

//collect first-of-multi words for quicker lookup
let firstWords = indexFirst(lex);

module.exports = {
  lexicon: lex,
  firstWords: firstWords
};
