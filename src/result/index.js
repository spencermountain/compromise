'use strict';
//a result is an array of termLists
class Result {
  constructor(arr, lexicon, parent) {
      this.list = arr || [];
      this.parent = parent;
    }
    //getter/setters
    /** did it find anything? */
  get found() {
      return this.list.length > 0;
    }
    /** how many results are there?*/
  get length() {
    return this.list.length;
  }
}

module.exports = Result;
Result = require('./methods/misc')(Result);
Result = require('./methods/tag')(Result);
Result = require('./methods/sort')(Result);
Result = require('./methods/match/match')(Result);
Result = require('./methods/match/remove')(Result);
Result = require('./methods/match/replace')(Result);
Result = require('./methods/match/split')(Result);
Result = require('./methods/match/insert')(Result);
Result = require('./methods/build/render')(Result);
Result.prototype.topk = require('./methods/build/topk');
Result.prototype.ngram = require('./methods/build/ngram');
Result.prototype.normalize = require('./methods/normalize');

const subset = {
    adjectives: require('./subset/adjectives'),
    adverbs: require('./subset/adverbs'),
    contractions: require('./subset/contractions'),
    nouns: require('./subset/nouns'),
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
  Result.prototype[k] = function () {
    return new subset[k](this.list);
  };
})
