'use strict';
//a Text is an array of termLists

const getters = {
  /** did it find anything? */
  found: function() {
    return this.list.length > 0;
  },
  parent: function() {
    return this.reference || this;
  },
  /** how many Texts are there?*/
  length: function() {
    return this.list.length;
  },
  isA: function() {
    return 'Text';
  },
  whitespace: function() {
    return {
      before: (str) => {
        this.list.forEach((ts) => {
          ts.whitespace.before(str);
        });
        return this;
      },
      after: (str) => {
        this.list.forEach((ts) => {
          ts.whitespace.after(str);
        });
        return this;
      }
    };
  }

};

function Text(arr, lexicon, reference) {
  this.list = arr || [];
  this.lexicon = lexicon;
  this.reference = reference;

  //apply getters
  let keys = Object.keys(getters);
  for(let i = 0; i < keys.length; i++) {
    Object.defineProperty(this, keys[i], {
      get: getters[keys[i]]
    });
  }

}
module.exports = Text;
require('./methods/misc')(Text);
require('./methods/loops')(Text);
require('./methods/match')(Text);
require('./methods/out')(Text);
require('./methods/sort')(Text);
require('./methods/split')(Text);
require('./methods/normalize')(Text);

const subset = {
  acronyms: require('./subset/acronyms'),
  adjectives: require('./subset/adjectives'),
  adverbs: require('./subset/adverbs'),
  clauses: require('./subset/clauses'),
  contractions: require('./subset/contractions'),
  dates: require('./subset/dates'),
  hashTags: require('./subset/hashTags'),
  nouns: require('./subset/nouns'),
  organizations: require('./subset/organizations'),
  people: require('./subset/people'),
  phoneNumbers: require('./subset/phoneNumbers'),
  places: require('./subset/places'),
  questions: require('./subset/sentences/questions'),
  quotations: require('./subset/quotations'),
  sentences: require('./subset/sentences'),
  statements: require('./subset/sentences/statements'),
  terms: require('./subset/terms'),
  topics: require('./subset/topics'),
  urls: require('./subset/urls'),
  values: require('./subset/values'),
  verbs: require('./subset/verbs'),
  ngrams: require('./subset/ngrams'),
  startGrams: require('./subset/ngrams/startGrams'),
  endGrams: require('./subset/ngrams/endGrams'),
};
//term subsets
Object.keys(subset).forEach((k) => {
  Text.prototype[k] = function (num, arg) {
    let sub = subset[k];
    let m = sub.find(this, num, arg);
    return new subset[k](m.list, this.lexicon, this.parent);
  };
});
