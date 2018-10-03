'use strict';
//tag word as noun if we know nothing about it, still.

//tags that dont really count
const nothing = {
  TitleCase: true,
  UpperCase: true,
  CamelCase: true,
  Hyphenated: true,
  StartBracket: true,
  EndBracket: true,
  Comma: true,
  ClauseEnd: true,
};
//are the tags basically empty
const gotNothing = function(t) {
  //fail-fast
  if (t.tags.Noun || t.tags.Verb || t.tags.Adjective) {
    return false;
  }
  let tags = Object.keys(t.tags);
  if (tags.length === 0) {
    return true;
  }
  if (tags.filter(tag => !nothing[tag]).length === 0) {
    return true;
  }
  return false;
};

//in last-ditch, try to match 'rewatch' -> 'watch' in the lexicon
const tryRoot = function(t) {
  if (/^(re|un)-?[^aeiou]./.test(t.normal) === true) {
    let str = t.normal.replace(/^(re|un)-?/, '');
    if (t.world.words.hasOwnProperty(str) === true) {
      let tag = t.world.words[str];
      if (tag === 'Infinitive' || tag === 'PresentTense' || tag === 'PastTense' || tag === 'Gerund') {
        return tag;
      }
    }
  }
  return null;
};

const noun_fallback = function(s) {
  for (let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i];
    //fail-fast
    if (t.tags.Noun || t.tags.Verb) {
      continue;
    }
    //ensure it only has the tag 'Term'
    if (gotNothing(t)) {
      //ensure it's atleast word-looking
      if (t.isWord() === false) {
        continue;
      }
      let rootTag = tryRoot(t);
      if (rootTag !== null) {
        t.tag(rootTag, 'root-tag-match');
        continue;
      }
      t.tag('Noun', 'noun-fallback');
    }
  }
  return s;
};

module.exports = noun_fallback;
