const Term = require('../03-term/Term');
const Phrase = require('../02-phrase/Phrase');
const Doc = require('../01-doc/Doc');
const Pool = require('./Pool');

const splitSentences = require('./01-sentences');
const splitTerms = require('./02-words');


const build = function( text = '' ) {

  //tokenize into words
  let sentences = splitSentences(text);
  sentences = sentences.map((str) => splitTerms(str));

  //turn them into proper objects
  let pool = new Pool();
  let phrases = sentences.map((terms) => {
    terms = terms.map((str) => {
      let term = new Term(str);
      pool.add(term);
      return term;
    });

    //add next/previous ids
    terms.forEach((term, i) => {
      if (i > 0) {
        term.prev = terms[i - 1].id;
      }
      if (terms[i + 1]) {
        term.next = terms[i + 1].id;
      }
    });

    //return phrase objects
    return new Phrase(terms[0].id, terms.length, pool);
  });

  //return the whole shebang
  return new Doc(phrases);
};
module.exports = build;
