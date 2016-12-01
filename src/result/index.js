'use strict';
//a Text is an array of termLists
class Text {
  constructor(arr, lexicon, parent) {
      this.list = arr || [];
      this.parent = parent;
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
}

module.exports = Text;
Text = require('./methods/misc')(Text);
Text = require('./methods/tag')(Text);
Text = require('./methods/sort')(Text);
Text = require('./methods/match/match')(Text);
Text = require('./methods/match/remove')(Text);
Text = require('./methods/match/replace')(Text);
Text = require('./methods/match/split')(Text);
Text = require('./methods/match/insert')(Text);
Text = require('./methods/build/render')(Text);
Text.prototype.topk = require('./methods/build/topk');
Text.prototype.ngram = require('./methods/build/ngram');
Text.prototype.normalize = require('./methods/normalize');

const subset = {
    adjectives: require('./subset/adjectives'),
    adverbs: require('./subset/adverbs'),
    contractions: require('./subset/contractions'),
    nouns: require('./subset/nouns'),
    dates: require('./subset/dates'),
    people: require('./subset/people'),
    values: require('./subset/values'),
    verbs: require('./subset/verbs'),
    subjects: require('./subset/subjects'),
    sentences: require('./subset/sentences'),
    statements: require('./subset/sentences/statements'),
    questions: require('./subset/sentences/questions'),
  }
  //term subsets
Object.keys(subset).forEach((k) => {
  Text.prototype[k] = function () {
    return new subset[k](this.list);
  };
})
