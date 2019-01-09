'use strict';
//regs-
const numericCardinal = /^\$?[0-9,](\.[0-9])?/;
const isOrdinal = /[0-9](st|nd|rd|th)$/;
// const hasText = /^[a-z]/;

const value_step = function(ts) {
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (t.tags.Value === true) {
      //ordinal/cardinal
      if (t.tags.Ordinal === undefined && t.tags.Cardinal === undefined) {
        if (numericCardinal.test(t.normal) === true) {
          t.tag('Cardinal', 'cardinal-val-regex');
          t.tag('NumericValue', 'NumericValue-regex');
        } else if (isOrdinal.test(t.normal) === true) {
          t.tag('Ordinal', 'ordinal-value-regex');
          t.tag('NumericValue', 'NumericValue-regex');
        }
      }
    }
  }
  //5 books
  ts.match('#Cardinal [#Plural]').tag('Unit', 'cardinal-plural');
  //5th book
  ts.match('#Ordinal [#Singular]').tag('Unit', 'ordinal-singular');
  //1 book
  ts.match('(one|first|1|1st) [#Singular]').tag('Unit', 'one-singular');
  return ts;
};

module.exports = value_step;
