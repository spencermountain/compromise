'use strict';
// knowing if something is inside a quotation is important grammatically
//set all the words inside quotations marks as pos['Quotation']=true
// verbatim change of narration only, 'scare quotes' don't count.

const startQuote = function(s) {
  return s.match(/^["\u201C]./);
};
const endQuote = function(s) {
  return s.match(/.["\u201D]$/);
};

//find the next quotation terminator
const quotation_ending = function(terms, start) {
  for(let i = start; i < terms.length; i++) {
    if (endQuote(terms[i].text)) {
      return i;
    }
  }
  return null;
};

//set these terms as quotations
const tagQuotation = function(terms, start, stop) {
  for(let i = start; i <= stop; i++) {
    if (!terms[i]) {
      break;
    }
    terms[i].pos['Quotation'] = true;
  }
};

//hunt
const quotation_pass = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    if (startQuote(terms[i].text)) {
      let end = quotation_ending(terms, [i]);
      if (end !== null) {
        tagQuotation(terms, i, end);
        return terms;
      }
    }
  }
  return terms;
};

module.exports = quotation_pass;
