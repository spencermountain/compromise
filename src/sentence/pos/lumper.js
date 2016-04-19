'use strict';
let friendlies = [
  ['Noun', 'Abbreviation'],
  ['Abbreviation', 'Noun'],
];

const should_chunk = function(a, b) {
  if (!a || !b) {
    return false;
  }
  //if A has a comma, don't chunk it, (unless it's a  date)
  if (a.has_comma() && !a.pos.Date) {
    return false;
  }
  //don't chunk non-word things with word-things
  if (a.is_word() === false || b.is_word() === false) {
    return false;
  }
  //dont chunk these pos
  const dont_chunk = [
    'Expression',
    'Phrasal'
  ];
  for(let i = 0; i < dont_chunk.length; i++) {
    if (a.pos[dont_chunk[i]] || b.pos[dont_chunk[i]]) {
      return false;
    }
  }
  //dont chunk contractions (again)
  if (a.expansion || b.expansion) {
    return false;
  }
  if (a.tag === b.tag) {
    return true;
  }
  for(let i = 0; i < friendlies.length; i++) {
    let f = friendlies[i];
    if (a.pos[f[0]] && b.pos[f[1]]) {
      return true;
    }
  }
  //matching nouns
  // if (a.pos['Noun'] && b.pos['Noun']) {
  //   return true;
  // }
  return false;
};

//turn [noun, noun..] into [noun..]
const chunk_neighbours = function(terms) {
  let new_terms = [];
  let last_one = null;
  for(let i = 0; i < terms.length; i++) {
    let t = terms[i];
    //if the tags match (but it's not a hidden contraction)
    if (should_chunk(last_one, t)) {
      let space = last_one.whitespace.trailing + t.whitespace.preceding;
      new_terms[new_terms.length - 1].text += space + t.text;
      new_terms[new_terms.length - 1].normalize();
      new_terms[new_terms.length - 1].whitespace.trailing = t.whitespace.trailing;
      new_terms[new_terms.length - 1].whitespace.preceding = last_one.whitespace.preceding;
    } else {
      new_terms.push(t);
    }
    last_one = t;
  }
  return new_terms;
};

module.exports = chunk_neighbours;
