'use strict';
const Terms = require('./paths').Terms
const tokenize = require('./tokenize');

//a result is an array of termLists
class Result {
  constructor(arr, parent) {
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
  get terms() {
    return this.list.reduce((arr, ts) => {
      return arr.concat(ts.terms);
    }, []);
  }
  static fromString(str) {
    let sentences = tokenize(str)
    let list = sentences.map((s) => Terms.fromString(s))
    let r = new Result(list)
      //give each ts a ref to the result
    r.list.forEach((ts) => {
      ts.parent = r;
    });
    return r
  }
}

Result = require('./methods/misc')(Result);
Result = require('./methods/tag')(Result);
Result = require('./methods/match/match')(Result);
Result = require('./methods/match/remove')(Result);
Result = require('./methods/match/replace')(Result);
Result = require('./methods/match/split')(Result);
Result = require('./methods/match/insert')(Result);
Result = require('./methods/build/render')(Result);
Result.prototype.topk = require('./methods/build/topk');
Result.prototype.ngram = require('./methods/build/ngram');
Result.prototype.normalize = require('./methods/normalize');

module.exports = Result;
const subset = {
    adjectives: require('./subset/adjectives'),
    adverbs: require('./subset/adverbs'),
    contractions: require('./subset/contractions'),
    nouns: require('./subset/nouns'),
    people: require('./subset/people'),
    values: require('./subset/values'),
    verbs: require('./subset/verbs'),
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
