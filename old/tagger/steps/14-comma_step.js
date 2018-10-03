'use strict';
//-types of comma-use-
// PlaceComma - Hollywood, California
// List       - cool, fun, and great.
// ClauseEnd  - if so, we do.

//like Toronto, Canada
const isPlaceComma = (ts, i) => {
  let t = ts.terms[i];
  let nextTerm = ts.terms[i + 1];
  //'australia, canada' is a list
  if (nextTerm && t.tags.Place && !t.tags.Country && nextTerm.tags.Country) {
    return true;
  }
  return false;
};

//adj, noun, or verb
const mainTag = (t) => {
  if (t.tags.Adjective) {
    return 'Adjective';
  }
  if (t.tags.Noun) {
    return 'Noun';
  }
  if (t.tags.Verb) {
    return 'Verb';
  }
  return null;
};


//take the first term with a comma, and test to the right.
//the words with a comma must be the same pos.
const isList = (ts, i) => {
  let start = i;
  let tag = mainTag(ts.terms[i]);
  //ensure there's a following comma, and its the same pos
  //then a Conjunction
  let sinceComma = 0;
  let count = 0;
  let hasConjunction = false;
  for(i = i + 1; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //are we approaching the end
    if (count > 0 && t.tags.Conjunction) {
      hasConjunction = true;
      continue;
    }
    //found one,
    if (t.tags[tag]) {
      //looks good. keep it going
      if (t.tags.Comma) {
        count += 1;
        sinceComma = 0;
        continue;
      }
      if (count > 0 && hasConjunction) { //is this the end of the list?
        ts.slice(start, i).tag('List');
        return;
      }
    }
    sinceComma += 1;
    //have we gone too far without a comma?
    if (sinceComma > 5) {
      return;
    }
  }
  return;
};

const commaStep = function(ts) {
  //tag the correct punctuation forms
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    let punct = t.getPunctuation();
    if (punct === ',') {
      t.tag('Comma', 'comma-step');
      continue;
    }
    if (punct === ';' || punct === ':') {
      t.tag('ClauseEnd', 'clause-punt');
      continue;
    }
    //support elipses
    if (t.whitespace.after.match(/^\.\./)) {
      t.tag('ClauseEnd', 'clause-elipses');
      continue;
    }
    //support ' - ' clause
    if (ts.terms[i + 1] && ts.terms[i + 1].whitespace.before.match(/ - /)) {
      t.tag('ClauseEnd', 'hypen-clause');
      continue;
    }
  }

  //disambiguate the commas now
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (t.tags.Comma) {
      //if we already got it
      if (t.tags.List) {
        continue;
      }
      //like 'Hollywood, California'
      if (isPlaceComma(ts, i)) {
        continue;
      }
      //like 'cold, wet hands'
      isList(ts, i);
      //otherwise, it's a phrasal comma, like 'you must, if you think so'
      t.tags.ClauseEnd = true;
    }
  }
  return ts;
};

module.exports = commaStep;
