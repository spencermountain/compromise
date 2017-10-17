'use strict';

//recursively-check compatibility of this tag and term
const canBe = function(term, tag) {
  const tagset = term.world.tags;
  //fail-fast
  if (tagset[tag] === undefined) {
    return true;
  }
  //loop through tag's contradictory tags
  let enemies = tagset[tag].notA || [];
  for (let i = 0; i < enemies.length; i++) {
    if (term.tags[enemies[i]] === true) {
      return false;
    }
  }
  if (tagset[tag].isA !== undefined) {
    return canBe(term, tagset[tag].isA); //recursive
  }
  return true;
};

module.exports = canBe;
