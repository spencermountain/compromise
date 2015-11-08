'use strict';

const places = require('../../../data/places');
const abbreviations = require('../../../data/abbreviations');

//add Country names
let isPlace = places.countries.reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});
//add City names
places.cities.forEach(function(s) {
  isPlace[s] = true;
});
//add place abbreviations names
abbreviations.places.forEach(function(s) {
  isPlace[s] = true;
});

//these are signals too
let placeSignals = [
  'west',
  'east',
  'nort',
  'south',
  'western',
  'eastern',
  'nortern',
  'southern',
  'city',
  'town',
  'county',
  'state',
  'province',
].reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

const is_place = function(str) {
  let words = str.split();
  for(let i = 0; i < words.length; i++) {
    if (isPlace[words[i]]) {
      return true;
    }
    if (placeSignals[words[i]] && !placeSignals[str]) {
      return true;
    }
  }

  return false;
};

module.exports = is_place;
