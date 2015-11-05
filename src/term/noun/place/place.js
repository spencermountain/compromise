'use strict';
const Noun = require('../noun.js');

const Place = class Place extends Noun {
constructor(str) {
  super(str);
  this.pos = 'Place';
}
};

module.exports = Place;
