const MAX = 4;

//find terms in the lexicon longer than one word (like 'hong kong')
const findMultiWords = function(ts, i, world) {
  let lex = world.words;
  let start = ts.terms[i].normal;
  let nextTerms = ts.terms.slice(i + 1, MAX).map((t) => t.normal);
  //try biggest first
  for(let k = MAX; k > 0; k -= 1) {
    let howAbout = start + ' ' + nextTerms.slice(0, k).join(' ');
    if (lex.hasOwnProperty(howAbout) === true) {
      ts.slice(i, i + k + 1).tag(lex[howAbout], 'multi-lexicon-' + howAbout);
      return k;
    }
  }
  return 0;
};

//try multiple-word matches in the lexicon (users and default)
const lexiconMulti = ts => {
  let firstWords = ts.world.cache.firstWords || {};
  for (let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //try multi words from user-lexicon
    if (firstWords.hasOwnProperty(t.normal) === true) {
      let jump = findMultiWords(ts, i, ts.world);
      i += jump;
      continue;
    }
  }
  return ts;
};
module.exports = lexiconMulti;
