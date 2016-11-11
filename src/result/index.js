'use strict';

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
  get count() {
    return this.list.length;
  }
  get terms() {
    return this.list.reduce((arr, ts) => {
      return arr.concat(ts.terms.filter((t) => t.sel));
    }, []);
  }
  all() {
    return this.parent || this;
  }
}

const selectFns = require('./selection');
Result = selectFns(Result);

const inspectFns = require('./inspect');
Result = inspectFns(Result);

const renderFns = require('./render');
Result = renderFns(Result);

/** different presentation logic for this result*/
Result.prototype.render = require('./render');
/** fixup transforms**/
Result.prototype.normalize = require('./normalize');
/** **/
Result.prototype.ngram = require('./inspect/ngram');
/** **/
Result.prototype.topk = require('./inspect/topk');

module.exports = Result;

const Contractions = require('./contractions');
Result.prototype.contractions = function() {
  return new Contractions(this.list);
};
//add tag-namespaced methods
const Values = require('./values');
Result.prototype.values = function() {
  return new Values(this.list);
};
const Adjectives = require('./adjectives');
Result.prototype.adjectives = function() {
  return new Adjectives(this.list);
};
const Adverbs = require('./adverbs');
Result.prototype.adverbs = function() {
  return new Adverbs(this.list);
};
const Nouns = require('./nouns');
Result.prototype.nouns = function() {
  return new Nouns(this.list);
};
const Verbs = require('./verbs');
Result.prototype.verbs = function() {
  return new Verbs(this.list);
};
const People = require('./people');
Result.prototype.people = function() {
  return new People(this.list);
};
const Sentences = require('./sentences');
Result.prototype.sentences = function() {
  return new Sentences(this.list);
};
const Statements = require('./statements');
Result.prototype.statements = function() {
  return new Statements(this.list);
};
const Questions = require('./questions');
Result.prototype.questions = function() {
  return new Questions(this.list);
};
