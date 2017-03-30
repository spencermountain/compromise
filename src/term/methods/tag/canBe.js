'use strict';
const path = require('../../paths');
const tagset = path.tags;

//
const checkTag = function(term, tag) {
  //fail-fast
  if (tagset[tag] === undefined) {
    return true;
  }
  //loop through tag's contradictions
  let enemies = tagset[tag].enemy || [];
  for (let i = 0; i < enemies.length; i++) {
    if (term.tags[enemies[i]] === true) {
      return false;
    }
  }
  if (tagset[tag].is) {
    return checkTag(term, tagset[tag].is); //recursive
  }
  return true;
};

const canBe = (term, tag) => {
  tag = tag || '';
  tag = tag.replace(/^#/, '');
  return checkTag(term, tag);
};
module.exports = canBe;
