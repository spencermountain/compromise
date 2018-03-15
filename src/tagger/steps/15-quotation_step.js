'use strict';

const quotemarks = {
  '\u0022': {
    close: '\u0022',
    tag: 'StraightDoubleQuotes'
  },
  '\uFF02': {
    close: '\uFF02',
    tag: 'StraightDoubleQuotesWide'
  },
  '\u0027': {
    close: '\u0027',
    tag: 'StraightSingleQuotes'
  },

  '\u201C': {
    close: '\u201D',
    tag: 'CommaDoubleQuotes'
  },
  '\u2018': {
    close: '\u2019',
    tag: 'CommaSingleQuotes'
  },

  '\u201F': {
    close: '\u201D',
    tag: 'CurlyDoubleQuotesReversed'
  },
  '\u201B': {
    close: '\u2019',
    tag: 'CurlySingleQuotesReversed'
  },

  '\u201E': {
    close: '\u201D',
    tag: 'LowCurlyDoubleQuotes'
  },
  '\u2E42': {
    close: '\u201D',
    tag: 'LowCurlyDoubleQuotesReversed'
  },

  '\u201A': {
    close: '\u2019',
    tag: 'LowCurlySingleQuotes'
  },

  '\u00AB': {
    close: '\u00BB',
    tag: 'AngleDoubleQuotes'
  },
  '\u2039': {
    close: '\u203A',
    tag: 'AngleSingleQuotes'
  },

  // Prime 'non quotation'
  '\u2035': {
    close: '\u2032',
    tag: 'PrimeSingleQuotes'
  },
  '\u2036': {
    close: '\u2033',
    tag: 'PrimeDoubleQuotes'
  },
  '\u2037': {
    close: '\u2034',
    tag: 'PrimeTripleQuotes'
  },

  // Prime 'quotation' variation
  '\u301D': {
    close: '\u301E',
    tag: 'PrimeDoubleQuotes'
  },
  '\u0060': {
    close: '\u00B4',
    tag: 'PrimeSingleQuotes'
  },

  '\u301F': {
    close: '\u301E',
    tag: 'LowPrimeDoubleQuotesReversed'
  }
};

// Open quote match black list.
const blacklist = [
  'twas'
];

// Convert the close quote to a regex.
Object.keys(quotemarks).forEach((open) => {
  quotemarks[open].regex = new RegExp(quotemarks[open].close + '[;:,.]*$');
  quotemarks[open].open = open;
});

// Improve open match detection.
const startQuote = new RegExp(
  '^[' + Object.keys(quotemarks).join('') + ']+' +
  '(?!' + blacklist.join('|') + ')'
);

//tag a inline quotation as such
const quotation_step = ts => {
  // Isolate the text so it doesn't change.
  const terms = ts.terms.slice(0).map(e => e.text);
  for (let i = 0; i < terms.length; i++) {
    let t = ts.terms[i];
    if (startQuote.test(t.text)) {
      // Get the match and split it into groups
      let quotes = t.text.match(startQuote).shift().split('');
      // Get close and tag info.
      quotes = quotes.map(mark => quotemarks[mark]);
      // Look for the ending
      for (let o = 0; o < ts.terms.length; o++) {
        // max-length don't go-on forever
        if (!ts.terms[i + o] || o > 28) {
          break;
        }
        // Find the close.
        const index = quotes.findIndex(q => q.regex.test(terms[i + o]));
        if (index !== -1) {
          // Remove the found
          const quote = quotes.splice(index, 1).pop();
          terms[i + o] = terms[i + o].replace(quote.regex, '');

          if (quote.regex.test(ts.terms[i + o].normal)) {
            ts.terms[i + o].normal.replace(quote.regex, '');
          }
          // Tag the things.
          t.tag('StartQuotation', 'quotation_open');
          ts.terms[i + o].tag('EndQuotation', 'quotation_close');
          ts.slice(i, i + o + 1).tag(quote.tag, 'quotation_step');
          // Compensate for multiple close quotes ('"Really"')
          o -= 1;
          if (!quotes.length) {
            break;
          }
        } // has index
      } // for subset
    } // open quote
  } // for all terms
  return ts;
};
module.exports = quotation_step;
