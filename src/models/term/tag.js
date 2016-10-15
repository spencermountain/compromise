'use strict';
//set a term as a particular Part-of-speech
const log = require('../../logger');
const tagset = require('../../tags');

//check if the term is compatible with a pos tag.
const canBe = (term, tag) => {
  //already compatible..
  if (term.tag[tag]) {
    return true;
  }
  //unknown tag..
  if (!tagset[tag]) {
    //huh? sure, go for it.
    return true;
  }
  //consult tagset's incompatible tags
  let not = tagset[tag].not;
  let tags = Object.keys(term.tag);
  for(let i = 0; i < tags.length; i++) {
    if (not.indexOf(tags[i]) !== -1) {
      return false;
    }
  }
  return true;
};

const set_tag = function(term, tag, reason) {
  tag = tag || '';
  tag = tag.replace(/^#/, '');
  //fail-fast
  if (!term || !tag || term.tag[tag]) {
    return;
  }
  log.tagAs(term, tag, reason);
  //reset term, if necessary
  if (canBe(term, tag) === false) {
    log.tell('forgetting tags for ' + term.normal);
    term.tag = {};
  }
  term.tag[tag] = true;
  if (!tagset[tag]) {
    // console.warn('unknown tag ' + tag + ' - ' + reason);
    term.tag[tag] = true;
    return;
  }
  //also set tags by deduction
  let tags = tagset[tag].is;
  for (let i = 0; i < tags.length; i++) {
    if (!term.tag[tags[i]]) {
      log.tagAs(term, tags[i], ' - - deduction-' + tag);
      term.tag[tags[i]] = true;
    }
  }
  return;
};

module.exports = {
  set_tag: set_tag,
  canBe: canBe
};
