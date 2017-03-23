'use strict';
const p = require('../paths');
const split = require('../contraction/split');
const tries = require('../../tries');
const tagConflicts = require('../../tags/conflicts')

const lexicon = p.lexicon;
const log = p.log;
const path = 'tagger/lexicon';

const check_lexicon = (str, sentence) => {
  //check a user's custom lexicon
  let custom = sentence.lexicon || {};
  if (custom[str]) {
    return custom[str];
  }
  if (lexicon[str]) {
    return lexicon[str];
  }
  let tag = tries.lookup(str);
  if (tag) {
    return tag;
  }
<<<<<<< HEAD
  return null;
=======
  return array.length == 0 ? null : remove_conflicts(array);
};

//remove conflicts - first tags always take priority, therefore custom lexicon first, then built in, then tries
const remove_conflicts = (tagArray) => {
  for (let i = 0; i < tagArray.length; i++) {
  let currentTag = tagArray[i];
  if(currentTag == null) continue;

  let conflicts = tagConflicts(currentTag);
  
  for(let s=i; s< tagArray.length; s++){
      if(conflicts.indexOf(tagArray[s])>-1){
        tagArray[s] = null;
      }
    }
  }

  return tagArray.filter((t) => t !== null);;
>>>>>>> e109c691... ensure that terms do not get tagged with conflicted tags
};

const lexicon_pass = function (ts) {
  log.here(path);
  let found;
  //loop through each term
  for (let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //basic term lookup
    found = check_lexicon(t.normal, ts);
    if (found) {
      t.tagAs(found, 'lexicon-match');
      continue;
    }
    found = check_lexicon(t.text, ts);
    if (found) {
      t.tagAs(found, 'lexicon-match-text');
      continue;
    }
    //support contractions (manually)
    let parts = split(t);
    if (parts && parts.start) {
      found = check_lexicon(parts.start.toLowerCase(), ts);
      if (found) {
        t.tagAs(found, 'contraction-lexicon');
        continue;
      }
    }
    //support silent_term matches
    found = check_lexicon(t.silent_term, ts);
    if (t.silent_term && found) {
      t.tagAs(found, 'silent_term-lexicon');
      continue;
    }
    //multiple-words / hyphenation
    let words = t.normal.split(/[ -]/);
    if (words.length > 1) {
      found = check_lexicon(words[words.length - 1], ts);
      if (found) {
        t.tagAs(found, 'multiword-lexicon');
        continue;
      }
    }
  }
  return ts;
};

module.exports = lexicon_pass;
