'use strict';
//set a term as a particular Part-of-speech
const path = require('./paths');
const log = path.log;
const tagset = path.tags;
const unTag = require('./unTag');


const makeCompatible = (term, tag, reason) => {
  if (!tagset[tag]) {
    return;
  }
  //find incompatible tags
  let not = tagset[tag].not || [];
  for (let i = 0; i < not.length; i++) {
    unTag(term, not[i], reason);
  }
};

const tag_one = (term, tag, reason) => {
  //ignore if already tagged
  if (term.tag[tag]) {
    return;
  }
  reason = reason || '';
  //clean first
  makeCompatible(term, tag, reason);
  // unTag(term, tag, reason);
  log.tagAs(term, tag, reason);
  term.tag[tag] = true;
};

const tagAll = function (term, tag, reason) {
  if (!term || !tag || typeof tag !== 'string') {
    // console.log(tag)
    return;
  }
  tag = tag || '';
  tag = tag.replace(/^#/, '');
  tag_one(term, tag, reason);
  //find assumed-tags
  if (tagset[tag]) {
    let tags = tagset[tag].parents || [];
    for (let i = 0; i < tags.length; i++) {
      tag_one(term, tags[i], '-');
    }
  }
};


module.exports = tagAll;
// console.log(tagset['Person']);
