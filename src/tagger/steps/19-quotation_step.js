'use strict';
const startQuote = /^["'\u201B\u201C\u2033\u201F\u2018]/;
const endQuote = /.["'\u201D\u2036\u2019]([;:,.])?$/;

//tag a inline quotation as such
const quotation_step = ts => {
  for (let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (startQuote.test(t.text) === true) {
      //look for the ending
      for (let o = 0; o < ts.terms.length; o++) {
        //max-length- don't go-on forever
        if (!ts.terms[i + o] || o > 28) {
          break;
        }
        if (endQuote.test(ts.terms[i + o].text) === true) {
          ts.slice(i, i + o + 1).tag('Quotation', 'quotation_step');
          i += o;
          break;
        }
      }
    }
  }
  return ts;
};
module.exports = quotation_step;
