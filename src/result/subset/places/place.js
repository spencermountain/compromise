'use strict';
const Terms = require('../../paths').Terms;

class Place extends Terms {
  constructor(arr, lexicon, parent) {
    super(arr, lexicon, parent);
    this.city = this.match('#City');
    this.country = this.match('#Country');
  }
  get isA() {
    return 'Place';
  }
  root() {
    return this.city.root();
  }
}
module.exports = Place;
