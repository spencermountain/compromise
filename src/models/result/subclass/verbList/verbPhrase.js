'use strict';
const Terms = require('../paths').Terms;
const parse = require('./parse');

class VerbPhrase extends Terms {
  constructor(arr, context) {
    super(arr, context);
    this.parts = parse(this);
  }

}
module.exports = VerbPhrase;
