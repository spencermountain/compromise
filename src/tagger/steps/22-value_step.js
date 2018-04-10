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
    //text/number
    // if (t.tags.TextValue === undefined && t.tags.NumericValue === undefined) {
    //   if (hasText.test(t.normal) === true) {
    //     t.tag('TextValue', 'TextValue-regex');
    //   } else {
    //     t.tag('NumericValue', 'NumericValue-regex');
    //   }
    // }
    }
  }
  //5 books
  ts.match('#Cardinal #Plural').lastTerm().tag('Unit', 'cardinal-plural');
  //5th book
  ts.match('#Ordinal #Singular').lastTerm().tag('Unit', 'ordinal-singular');
  return ts;
};

module.exports = value_step;
