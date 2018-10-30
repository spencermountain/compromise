//supported verb forms:
const forms = [
  null,
  'PastTense',
  'PresentTense',
  'Gerund',
  'Participle',
];

//put these words in our lexicon
const addWords = function(obj, lex) {
  let keys = Object.keys(obj);
  for(let i = 0; i < keys.length; i += 1) {
    let k = keys[i];
    //add infinitive
    lex[k] = 'Infinitive';
    //add other forms
    for(let f = 1; f < forms.length; f += 1) {
      if (obj[k][f] !== undefined) {
        lex[obj[k][f]] = f;
      }
    }
  }
};

//
const unpackVerbs = function(str, lexicon) {
  let verbs = str.split('|');
  const conjugations = verbs.reduce((h, s) => {
    let parts = s.split(':');
    let prefix = parts[0];
    let ends = parts[1].split(',');
    //grab the infinitive
    let inf = prefix + ends[0];
    if (ends[0] === '_') {
      inf = prefix;
    }
    h[inf] = {};
    //we did the infinitive, now do the rest:
    for (let i = 1; i < forms.length; i++) {
      let word = parts[0] + ends[i];
      if (ends[i] === '_') {
        word = parts[0];
      }
      if (ends[i]) {
        h[inf][forms[i]] = word;
      }
    }
    return h;
  }, {});
  //add them all to the lexicon
  addWords(conjugations, lexicon);
  return conjugations;
};
module.exports = unpackVerbs;
