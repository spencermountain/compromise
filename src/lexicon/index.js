//lexicon in compressed form
const pckd = require('./_lexicon');
const efrt = require('efrt');
const blastOut = require('./blastOut');
const uncompressed = [
  //(order matters)
  require('./uncompressed/abbreviations'),
  require('./uncompressed/irregularPlurals').lexicon,
  require('./uncompressed/irregularVerbs').lexicon,
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
lex = blastOut(lex);

uncompressed.forEach(obj => addToLex(lex, obj));

//collect first-of-multi words for quicker lookup
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

module.exports = {
  lexicon: lex,
  firstWords: firstWords
};
