'use strict';
const parse = require('./parse');
const render = require('./render');
const normalize = require('./normalize');
const methods = require('./methods');
// const func = require('./fns');

//a result is an array of termLists
class Result {
  constructor(arr) {
    this.list = arr || [];
    this.subset = null;
    this.parent = null;
  // Object.keys(func).forEach((fn) => {
  //   this[fn] = func[fn].bind(this);
  // });
  }
  /** did it find anything? */
  get found() {
    return this.list.length > 0;
  }
}

//add methods to prototype
Object.keys(methods).forEach((k) => {
  Result = methods[k](Result);
});
// /** return ad-hoc data about this result*/
Result.prototype.parse = parse;
// /** different presentation logic for this result*/
Result.prototype.render = render;
// /** fixup transforms*/
Result.prototype.normalize = normalize;
//
//
//
Result.prototype.topk = require('./methods/topk');
Result.prototype.ngram = require('./methods/ngram');
Result.prototype.combine = require('./methods/combine');
Result.prototype.toPlural = require('./methods/noun/toPlural');
Result.prototype.toSingular = require('./methods/noun/toSingular');


module.exports = Result;

const Adjectives = require('./adjectives');
Result.prototype.adjectives = function() {
  return new Adjectives(this.list);
};

//apply methods
// require('./methods').addMethods(Result);
