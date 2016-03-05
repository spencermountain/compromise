'use strict';
const Noun = require('../noun.js');
const places = require('../../../data/places.js');
const fns = require('../../../fns.js');
//make cities/countries easy to lookup
let countries = fns.toObj(places.countries);
let cities = fns.toObj(places.cities);


const Place = class Place extends Noun {
constructor(str, tag) {
  super(str);
  this.tag = tag;
  this.pos['Place'] = true;

  this.title = null;
  this.city = null;
  this.region = null; //'2nd-tier' (state/province/county/whatever)
  this.country = null;
  this.parse();
}
root() {
  return this.title || this.normal;
}

parse() {
  //parse a comma-described place like "toronto, ontario"
  let terms = this.normal.split(' ');
  this.title = terms[0];
  for(let i = 0; i < terms.length; i++) {
    let t = terms[i];
    if (cities[t]) {
      this.city = fns.titlecase(t);
    } else if (countries[t]) {
      this.country = fns.titlecase(t);
    } else if (this.city !== null) { //if we already got the city..
      this.region = fns.titlecase(t);
    } else { //it's part of the title
      this.title += ' ' + t;
    }
  }

}
};
Place.fn = Place.prototype;
module.exports = Place;

// console.log(new Place('Toronto, Ontario, Canada'));
