//lexicon in compressed form
const pckd = require('./_lexicon');
const efrt = require('efrt');
const blastOut = require('./blastOut');
const uncompressed = [
  require('./uncompressed/misc'),
  require('./uncompressed/abbreviations'),
  require('./uncompressed/irregularPlurals').lexicon,
  require('./uncompressed/orgWords')
];

const addToLex = function(lex, obj) {
  console.log(obj);
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    lex[keys[i]] = obj[keys[i]];
  }
};

let lex = efrt.unpack(pckd);

uncompressed.forEach(obj => addToLex(lex, obj));

// console.log(lex);
console.log(Object.keys(lex).length);
lex = blastOut(lex);
console.log(Object.keys(lex).length);

let multi = {};

module.exports = {
  lexicon: lex,
  multiples: multi
};
