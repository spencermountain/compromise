const defaultData = require('./_data');
const defaultTags = require('./tags');
const unpack = {
  words : require('efrt-unpack'),
  conjugations : require('./conjugations'),
  plurals : require('./plurals'),
  tags : require('./addTags'),
};

//  ¯\_(:/)_/¯
const clone = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

class World {
  constructor() {
    this.lexicon = {};
    this.plurals = {};
    this.conjugations = {};
    this.tags = defaultTags;
    this.plugin(defaultData);
  }
  //augment our world with this new one
  plugin(x) {
    let obj = x;
    if (typeof x === 'string') {
      obj = JSON.parse(x);
    }
    if (obj.words) {
      let words = unpack.words(obj.words);
      this.lexicon = Object.assign(this.lexicon, words);
    }
    if (obj.plurals) {
      let plurals = unpack.plurals(obj.plurals);
      this.plurals = Object.assign(this.plurals, plurals);
    }
    if (obj.conjugations) {
      let conjugations = unpack.conjugations(obj.conjugations);
      this.conjugations = Object.assign(this.conjugations, conjugations); //merge this one properly
    }
    if (obj.tags) {
      let tags = unpack.tags(obj.tags);
      this.tags = Object.assign(this.tags, tags);
    }
  }

  stats() {
    return {
      words: Object.keys(this.lexicon).length,
      plurals: Object.keys(this.plurals).length,
      conjugations: Object.keys(this.conjugations).length,
    };
  }
}
//who really knows about this one.
World.prototype.clone = function() {
  let w2 = new World();
  w2.lexicon = clone(this.lexicon);
  w2.plurals = clone(this.plurals);
  w2.conjugations = clone(this.conjugations);
  w2.tags = clone(this.tags);
  return w2;
};
module.exports = World;
