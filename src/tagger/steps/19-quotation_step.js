'use strict';
const log = require('../paths').log;
const path = 'tagger/quotation_step';
const startQuote = /^["'\u201B\u201C\u2033\u201F\u2018]/;
const endQuote = /.["'\u201D\u2036\u2019]([;:,.])?$/;

const tagSlice = function(ts, start, end) {
  ts.terms.slice(start, end + 1).forEach((t) => {
    t.tag('Quotation', 'quotation_step');
  });
};

//tag a inline quotation as such
const quotation_step = (ts) => {
  log.here(path);
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (startQuote.test(t.text) === true) {
      //look for the ending
      for(let o = 0; o < ts.terms.length; o++) {
        //max-length- don't go-on forever
        if (!ts.terms[i + o] || o > 8) {
          break;
        }
        if (endQuote.test(ts.terms[i + o].text) === true) {
          tagSlice(ts, i, o + i);
          i += o;
          break;
        }
      }
    }
  }
  return ts;
};
module.exports = quotation_step;
