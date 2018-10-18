const checkNegative = require('./01-negative');
const checkApostrophe = require('./02-apostrophe-s');
const checkIrregulars = require('./03-irregulars');
const Term = require('../../03-term/Term');

//stitch these words into our sentence
const addTerms = function(term, phrase, arr, pool) {
  //apply the first word to our term
  let first = arr.shift();
  term.implicit = first;
  let terms = arr.map((str) => {
    let t = new Term('');
    t.implicit = str;
    pool.add(term);
    return t;
  });
  phrase.addAt(term.id, terms);
//stitch it in there
// terms[terms.length - 1].next = term.next;
// term.next = terms[0].id;
// console.log(terms);
};

//
const contractions = function(doc) {
  doc.list.forEach((p) => {
    let terms = p.terms();
    for(let i = 0; i < terms.length; i += 1) {
      let term = terms[i];
      let found = checkNegative(term);
      if (found === null) {
        found = checkApostrophe(term);
        if (found === null) {
          found = checkIrregulars(term);
        }
      }
      if (found !== null) {
        addTerms(term, p, found, p.pool);
      }
    }
  });
  return doc;
};
module.exports = contractions;
