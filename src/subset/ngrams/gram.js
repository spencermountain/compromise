'use strict';
const Terms = require('../../paths').Terms;

//this is one-or-more terms together, sorted by frequency
const Gram = function(arr, world, original) {
  Terms.call(this, arr, world, original);
  //string to sort/uniq by
  this.key = this.out('normal');
  //bigram/trigram/etc
  this.size = arr.length;
  //number of occurances
  this.count = 1;
};

//Inherit properties
Gram.prototype = Object.create(Terms.prototype);

Gram.prototype.inc = function() {
  this.count += 1;
};

module.exports = Gram;
