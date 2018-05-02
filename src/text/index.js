'use strict';
//a Text is an array of termLists
const getters = require('./getters');

function Text(arr, world, original) {
  this.list = arr || [];
  if (typeof world === 'function') {
    world = world();
  }
  this.world = () => {
    return world;
  };
  this.original = original;
  //apply getters
  let keys = Object.keys(getters);
  for (let i = 0; i < keys.length; i++) {
    Object.defineProperty(this, keys[i], {
      get: getters[keys[i]]
    });
  }
}
module.exports = Text;

Text.addMethods = function(cl, obj) {
  let fns = Object.keys(obj);
  for (let i = 0; i < fns.length; i++) {
    cl.prototype[fns[i]] = obj[fns[i]];
  }
};

//make a sub-class of this class easily
Text.makeSubset = function(methods, find) {
  let Subset = function(arr, world, original) {
    Text.call(this, arr, world, original);
  };
  //inheritance
  Subset.prototype = Object.create(Text.prototype);
  Text.addMethods(Subset, methods);
  Subset.find = find;
  return Subset;
};

//apply instance methods
require('./methods/misc')(Text);
require('./methods/loops')(Text);
require('./methods/match')(Text);
require('./methods/out')(Text);
require('./methods/sort')(Text);
require('./methods/split')(Text);
require('./methods/normalize')(Text);
require('./subsets')(Text);

//apply subset methods
const subset = {
  acronyms: require('../subset/acronyms'),
  adjectives: require('../subset/adjectives'),
  adverbs: require('../subset/adverbs'),
  contractions: require('../subset/contractions'),
  dates: require('../subset/dates'),
  nouns: require('../subset/nouns'),
  people: require('../subset/people'),
  sentences: require('../subset/sentences'),
  terms: require('../subset/terms'),
  possessives: require('../subset/possessives'),
  values: require('../subset/values'),
  verbs: require('../subset/verbs'),
  ngrams: require('../subset/ngrams'),
  startGrams: require('../subset/ngrams/startGrams'),
  endGrams: require('../subset/ngrams/endGrams')
};
Object.keys(subset).forEach(k => {
  Text.prototype[k] = function(num, arg) {
    let sub = subset[k];
    let m = sub.find(this, num, arg);
    return new subset[k](m.list, this.world, this.parent);
  };
});
//aliases
Text.prototype.words = Text.prototype.terms;
