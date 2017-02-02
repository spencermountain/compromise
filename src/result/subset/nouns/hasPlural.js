'use strict';
const uncountables = require('../../../data').uncountables;

//certain words can't be plural, like 'peace'
const hasPlural = function (t) {
  //end quick
  if (!t.tag.Noun) {
    return false;
  }
  if (t.tag.Plural) {
    return true;
  }
  //is it potentially plural?
  const noPlural = [
    'Pronoun',
    'Place',
    'Value',
    'Person',
    'Month',
    'WeekDay',
    'RelativeDay',
    'Holiday',
  ];
  for (let i = 0; i < noPlural.length; i++) {
    if (t.tag[noPlural[i]]) {
      return false;
    }
  }
  //terms known as un-inflectable, like 'peace'
  for (let i = 0; i < uncountables.length; i++) {
    if (t.normal === uncountables[i]) {
      return false;
    }
  }
  return true;
};

module.exports = hasPlural;
