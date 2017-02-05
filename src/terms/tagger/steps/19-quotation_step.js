'use strict';
const log = require('../paths').log;
const path = 'tagger/person_step';

const tagSlice = function(ts, start, end) {
  ts.terms.slice(start, end + 1).forEach((t) => {
    console.log(t.text);
    t.tagAs('Quotation', 'quotation_step');
  });
};

//tag a inline quotation as such
const quotation_step = (ts) => {
  log.here(path);
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (t.text.match(/^["']/)) {
      //look for the ending
      for(let o = 0; o < ts.terms.length; o++) {
        //max-length- don't go-on forever
        if (!ts.terms[i + o] || o > 8) {
          break;
        }
        if (ts.terms[i + o].text.match(/.["']([;:,.])$/)) {
          tagSlice(ts, i, o + i);
          i += o;
        }
      }
    }
  }
  // (a.text.match(/^["']/) && !b.text.match(/["']/) && c.text.match(/["']$/)),
  return ts;
};
module.exports = quotation_step;
