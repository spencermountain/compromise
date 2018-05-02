'use strict';
//decide if an apostrophe s is a contraction or not
// 'spencer's nice' -> 'spencer is nice'
// 'spencer's house' -> 'spencer's house'

const singleQuotes = [
  ['\u0027', '\u0027'], // Straight Single Quotes
  ['\u2018', '\u2019'], // Comma Single Quotes
  ['\u201B', '\u2019'], // Curly Single Quotes Reversed
  ['\u201A', '\u2019'], // Low Curly Single Quotes
  ['\u2035', '\u2032'], // Prime Single Quotes Alt
  ['\u0060', '\u00B4'] // Prime Single Quotes
];

const quoteRegex = {};
singleQuotes.forEach(quote => {
  quoteRegex[quote[0]] = new RegExp(quote[1] + '[^' + quote[1] + '\\w]*$');
});

// Get all types of single quote.
const apostrophes = '\'‘’‛‚‵′`´';

// [^\w]* match 0 or more of any char that is NOT alphanumeric
const afterWord = new RegExp('([a-z]s[' + apostrophes + '])\\W*$');
const apostrophe = new RegExp('s?[' + apostrophes + ']s?$');
const trailers = new RegExp('[^' + apostrophes + '\\w]+$');

//these are always contractions
const blacklist = [
  'it\'s',
  'that\'s'
]

  // Compensate for different `'`s in the blacklist
  .map(item => new RegExp(
    item.replace('\'', '[' + apostrophes + ']')
  ));

// A possessive means `'s` describes ownership
// Not a contraction, like it's -> `it is`
const is_possessive = function(terms, text, index) {
  const thisWord = terms.get(index);
  const nextWord = terms.get(index + 1);
  const stepWord = terms.get(index + 2);

  //our booleans:
  // `blacklist` are always contractions, not possessive
  const inBlacklist = blacklist.map(r => text.match(r)).find(m => m);
  // If no apostrophe s or s apostrophe
  const hasApostrophe = apostrophe.test(text);
  // "spencers'" - this is always possessive - eg "flanders'"
  const hasPronoun = thisWord.tags.Pronoun;

  if (inBlacklist || hasPronoun || !hasApostrophe) {
    return false;
  }
  if (afterWord.test(text) || nextWord === undefined) {
    return true;
  }
  // Next word is 'house'
  if (nextWord.tags.Noun === true || thisWord.tags.ClauseEnd === true) {
    return true;
  }
  //rocket's red glare
  if (stepWord !== undefined && nextWord.tags.Adjective && stepWord.tags.Noun) {
    return true;
  }
  return false;
};

// Tag each term as possessive, if it should
const possessiveStep = function(ts) {
  let expectingClosers = [];
  for(let i = 0; i < ts.length; i++) {
    const term = ts.get(i);
    let text = term.text;

    // First detect open quotes before detecting apostrophes
    if (typeof quoteRegex[text[0]] !== 'undefined') {
      // Add the expected closing quotes to our inspection array.
      expectingClosers[expectingClosers.length] = quoteRegex[text[0]];
      text = text.slice(1);
    }

    // Pre checking for quotes. e.g: Carlos'.’. -> Carlos'.’
    text = text.replace(trailers, '');

    // If the string ends with an expected closer.
    const closer = expectingClosers.map(regex => regex.test(text)).findIndex(e => e);
    if (closer !== -1) {
      text = text.replace(expectingClosers[closer], '');
      delete expectingClosers[closer];
    }

    // Post checking for quotes. e.g: Carlos'. -> Carlos'
    text = text.replace(trailers, '');

    if (is_possessive(ts, text, i)) {
      // If it's not already a noun, co-erce it to one
      if (!term.tags['Noun']) {
        term.tag('Noun', 'possessive_pass');
      }
      term.tag('Possessive', 'possessive_pass');

      // If it's been detected as a `Contraction`
      if (term.tags.Contraction === true) {
        // Remove the `Contraction` tag and silent_terms
        term.unTag('Contraction');
        ts.terms.splice(i + 1, 1);
        term.silent_term = '';
      }
    }
  }
  return ts;
};
module.exports = possessiveStep;
