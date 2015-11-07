'use strict';
const Noun = require('../noun.js');

const Place = class Place extends Noun {
constructor(str, tag) {
  super(str);
  this.tag = tag;
  this.pos = 'Place';
}
};

module.exports = Place;
