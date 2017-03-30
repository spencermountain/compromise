'use strict';
'use strict';
const log = require('../paths').log;
const path = 'tagger/value';
//regs-
const cardinal = /^[0-9]([0-9]+,)*?(\.[0-9])$/;
const hasText = /^[a-z]/;

const value_step = function(ts) {
  log.here(path);
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (t.tags.Value === true) {
      //ordinal/cardinal
      if (t.tags.Ordinal === undefined && t.tags.Cardinal === undefined) {
        if (cardinal.test(t.normal) === true) {
          t.tag('Cardinal', 'ordinal-regex');
        } else {
          t.tag('Cardinal', 'cardinal-regex');
        }
      }
      //text/number
      if (t.tags.TextValue === undefined && t.tags.NumericValue === undefined) {
        if (hasText.test(t.normal) === true) {
          t.tag('TextValue', 'TextValue-regex');
        } else {
          t.tag('NumericValue', 'NumericValue-regex');
        }
      }
    }
  }
  return ts;
};

module.exports = value_step;
