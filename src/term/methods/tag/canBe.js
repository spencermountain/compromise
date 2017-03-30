'use strict';
const path = require('../../paths');
const tagset = path.tags;

//recursively-check compatibility of this tag and term
const canBe = function(term, tag) {
  //fail-fast
  if (tagset[tag] === undefined) {
    return true;
  }
  //loop through tag's contradictory tags
  let enemies = tagset[tag].enemy || [];
  for (let i = 0; i < enemies.length; i++) {
    if (term.tags[enemies[i]] === true) {
      return false;
    }
  }
  if (tagset[tag].is !== undefined) {
    return canBe(term, tagset[tag].is); //recursive
  }
  return true;
};

module.exports = canBe;
