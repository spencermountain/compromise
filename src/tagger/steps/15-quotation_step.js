'use strict';

const quotemarks = {
    '\u0022': {close: '\u0022', tag: 'StraightDoubleQuotes'},
    '\uFF02': {close: '\uFF02', tag: 'StraightDoubleQuotesWide'},
    '\u0027': {close: '\u0027', tag: 'StraightSingleQuotes'},

    '\u201C': {close: '\u201D', tag: 'CommaDoubleQuotes'},
    '\u2018': {close: '\u2019', tag: 'CommaSingleQuotes'},

    '\u201F': {close: '\u201D', tag: 'CurlyDoubleQuotesReversed'},
    '\u201B': {close: '\u2019', tag: 'CurlySingleQuotesReversed'},

    '\u201E': {close: '\u201D', tag: 'LowCurlyDoubleQuotes'},
    '\u2E42': {close: '\u201D', tag: 'LowCurlyDoubleQuotesReversed'},

    '\u201A': {close: '\u2019', tag: 'LowCurlySingleQuotes'},

    '\u00AB': {close: '\u00BB', tag: 'AngleDoubleQuotes'},
    '\u2039': {close: '\u203A', tag: 'AngleSingleQuotes'},

    // Prime 'non quotation'
    '\u2035': {close: '\u2032', tag: 'PrimeSingleQuotes'},
    '\u2036': {close: '\u2033', tag: 'PrimeDoubleQuotes'},
    '\u2037': {close: '\u2034', tag: 'PrimeTripleQuotes'},

    // Prime 'quotation' variation
    '\u301D': {close: '\u301E', tag: 'PrimeDoubleQuotes'},
    '\u0060': {close: '\u00B4', tag: 'PrimeSingleQuotes'},

    '\u301F': {close: '\u301E', tag: 'LowPrimeDoubleQuotesReversed'}
};

//tag a inline quotation as such
const quotation_step = ts => {
  // Isolate the text so it doesn't change.
  const terms = ts.terms.slice(0).map(e => e.text);

  for (let i = 0; i < terms.length; i++) {
    let t = ts.terms[i];
    if (
      typeof quotemarks[t.text[0]] === 'object' && (
        // TODO: not `'twas` or similar
        true
      )
    ) {
      const quote = quotemarks[t.text[0][0]];
      const endQuote = new RegExp(quote.close + '[;:,.]?$');

      t.tag('OpenQuotation', 'quotation_open');

      //look for the ending
      for (let o = 0; o < ts.terms.length; o++) {
        // max-length don't go-on forever
        if (!ts.terms[i + o] || o > 28) {
          break;
        }

        if (endQuote.test(terms[i + o]) === true) {
          terms[i + o] = terms[i + o].replace(endQuote, '');
          ts.terms[i + o].tag('CloseQuotation', 'quotation_close');
          ts.slice(i, i + o + 1).tag(quote.tag, 'quotation_step');
          break;
        }
      }
    }
  }
  return ts;
};
module.exports = quotation_step;
