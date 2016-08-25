'use strict';
const Terms = require('../paths').Result;
const parse = require('./parse');

class VerbPhrase extends Terms {
  constructor(arr, context) {
    super(arr, context);
    this.parts = parse(arr);
  }

}
module.exports = VerbPhrase;
