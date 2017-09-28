//lexicon in compressed form
const pckd = require('./compressed/_compressed');
const unpack = require('compromise-unpack');
const buildOut = require('./buildOut');
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

let lex = unpack({
  words: pckd
}).words;

uncompressed.forEach(obj => addToLex(lex, obj));

lex = buildOut(lex);

//hard-code these, ¯\_(ツ)_/¯
lex['is'] = ['Copula', 'PresentTense'];
lex['are'] = ['Copula', 'PresentTense'];
lex['was'] = ['Copula', 'PastTense'];
lex['will be'] = ['Copula', 'FutureTense'];
lex['close'] = 'Adjective';
lex['can'] = 'Modal';

// console.log(lex['mark']);

//collect first-of-multi words for quicker lookup
let firstWords = indexFirst(lex);

module.exports = {
  lexicon: lex,
  firstWords: firstWords
};
