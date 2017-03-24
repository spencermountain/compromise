'use strict';
//set a term as a particular Part-of-speech
const path = require('./paths');
const log = path.log;
const tagset = path.tags;
const unTag = require('./unTag');

var allTags = tagset.allTags();

const makeCompatible = (term, tag, reason) => {
  if (!allTags[tag]) {
    return;
  }
  //find incompatible tags
  let not = allTags[tag].not || [];
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

    // If tag is an array - call this recursively for each entry...
    if(!!tag && tag.constructor === Array)
    {
      for (let i = 0; i < tag.length; i++)
      {
          tagAll(term, tag[i], reason);
      }
    }

    return;
  }
  tag = tag || '';
  tag = tag.replace(/^#/, '');
  tag_one(term, tag, reason);
  //find assumed-tags
  if (allTags[tag]) {
    tagAll(term, allTags[tag].parents, '-');
  }
};

module.exports = tagAll;
