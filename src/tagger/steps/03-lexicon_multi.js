'use strict';
const mainLex = require('../../lexicon');

//find terms in the lexicon longer than one word (like 'hong kong')
const findMultiWords = function(ts, i, lex) {
  let want = lex.firstWords[ts.terms[i].normal];
  let str = '';
  //try 2 words, 3 words, 4 words..
  for (let add = 1; add <= 3; add++) {
    if (!ts.terms[i + add]) {
      return 0;
    }
    if (str !== '') {
      str += ' '; //(add a space)
    }
    str += ts.terms[i + add].normal;
    //perfect match here?
    if (want[str] === true) {
      let tag = lex.lexicon[ts.terms[i].normal + ' ' + str];
      ts.slice(i, i + add + 1).tag(tag, 'multi-lexicon-' + (add + 1) + '-word');
      return add;
    }
    //don't go further
    if (!ts.terms[i + add + 1]) {
      return 0;
    }
  }
  return 0;
};

//try multiple-word matches in the lexicon (users and default)
const lexiconMulti = ts => {
  let uLex = ts.lexicon || {};
  uLex.firstWords = uLex.firstWords || {};
  for (let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //try multi words from user-lexicon
    if (uLex.firstWords.hasOwnProperty(t.normal) === true) {
      let jump = findMultiWords(ts, i, uLex);
      // console.log(ts.slice(i, jump + 1).debug().out('text'));
      i += jump;
      continue;
    }
    //try main lexicon
    if (mainLex.firstWords.hasOwnProperty(t.normal) === true) {
      let jump = findMultiWords(ts, i, mainLex);
      // console.log(ts.slice(i, jump + 1).out('text'));
      i += jump;
    }
  }
  return ts;
};
module.exports = lexiconMulti;
