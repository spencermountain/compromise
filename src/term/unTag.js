'use strict';
//set a term as a particular Part-of-speech
const path = require('./paths');
const log = path.log;
const tagset = path.tags;

//remove a tag from a term
const unTagOne = (term, tag, reason) => {
  if (term.tag[tag]) {
    log.tell('   --' + tag + ' ' + (reason || ''));
    delete term.tag[tag];
  }
};

const unTagAll = (term, tag, reason) => {
  if (!term || !tag) {
    return;
  }
  unTagOne(term, tag, reason);
  if (tagset[tag]) {
    let not = tagset[tag].not || [];
    for(let i = 0; i < not.length; i++) {
      unTagOne(term, not[i], reason);
      //and also their dependents
      let killAlso = tagset[not[i]].children || [];
      for(let o = 0; o < killAlso.length; o++) {
        unTagOne(term, killAlso[o], reason);
      }
    }
  }
  return;
};
module.exports = unTagAll;
