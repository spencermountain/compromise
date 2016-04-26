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
let firstwords = [
  'west',
  'east',
  'nort',
  'south',
  'western',
  'eastern',
  'nortern',
  'southern',
  'mount',
].reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

const lastwords = [
  'city',
  'town',
  'county',
  'village',
  'province',
  'country',
  'state',
  'province',
  'mountain',
  'river',
  'valley',
  'park',
  'avenue',
  'street',
  'road', //these should maybe be somewhere else
].reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

const is_place = function(str) {
  let words = str.split(' ');

  if (words.length > 1) {
    //first words, like 'eastern'
    if (firstwords[words[0]]) {
      return true;
    }
    //last words, like 'mountain'
    if (lastwords[words[words.length - 1]]) {
      return true;
    }
  }
  for(let i = 0; i < words.length; i++) {
    if (isPlace[words[i]]) {
      return true;
    }
  }

  return false;
};

module.exports = is_place;
