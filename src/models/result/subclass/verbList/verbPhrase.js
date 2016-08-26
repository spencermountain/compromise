'use strict';
const Terms = require('../paths').Terms;
const parse = require('./parse');

class VerbPhrase extends Terms {
  constructor(arr, context) {
    super(arr, context);
    this.parts = parse(this);
  }
  conjugate() {
    console.log(this.parts.root);
  }
}
module.exports = VerbPhrase;
