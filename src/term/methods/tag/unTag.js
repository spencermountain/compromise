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

const unTagDeep = (term, tag, reason) => {
  if (!term || !tag) {
    return;
  }
  //support '*' flag - remove all-tags
  if (tag === '*') {
    term.tag = {};
    return;
  }
  //remove this tag
  unTagOne(term, tag, reason);
  //remove decendents too
  if (tagset[tag]) {
    //this should probably be recursive, instead of just 2-deep..
    let killAlso = tagset[tag].children || [];
    for (let o = 0; o < killAlso.length; o++) {
      //remove its child
      unTagOne(term, killAlso[o], reason);
      //remove grandchildren too
      let kill2 = tagset[killAlso[o]].children || [];
      for (let i2 = 0; i2 < kill2.length; i2++) {
        unTagOne(term, kill2[i2], reason);
      }
    }
  }
  return;
};
module.exports = unTagDeep;
