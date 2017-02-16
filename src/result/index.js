'use strict';
//a Text is an array of termLists
class Text {
  constructor(arr, lexicon, reference, tagSet) {
    this.list = arr || [];
    this.reference = reference;
    this.tagSet = tagSet;
  }
  //getter/setters
  /** did it find anything? */
  get found() {
    return this.list.length > 0;
  }
  /** how many Texts are there?*/
  get length() {
    return this.list.length;
  }
  get isA() {
    return 'Text';
  }
  get parent() {
    return this.reference || this;
  }
  set parent(r) {
    this.reference = r;
    return this;
  }
  all() {
    return this.parent;
  }
  index() {
    return this.list.map((ts) => ts.index());
  }
  data() {
    return this.list.map((ts) => {
      return {
        normal: ts.out('normal'),
        text: ts.out('text')
      };
    });
  }
  debug(opts) {
    return out(this, 'debug', opts);
  }
  get whitespace() {
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
}

module.exports = Text;
Text = require('./methods/array')(Text);
Text = require('./methods/loops')(Text);
Text = require('./methods/match')(Text);
Text = require('./methods/out')(Text);
Text = require('./methods/sort')(Text);
Text = require('./methods/split')(Text);
Text = require('./methods/tag')(Text);
Text = require('./methods/normalize')(Text);

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
