'use strict';
const Terms = require('../../paths').Terms;
const contract = require('./contract');
const expand = require('./expand');

const ContractionCl = function(arr, world, original) {
  Terms.call(this, arr, world, original);
};

//Inherit properties
ContractionCl.prototype = Object.create(Terms.prototype);

ContractionCl.prototype.data = function() {
  let expanded = expand(this.clone());
  let contracted = contract(this.clone());
  return {
    text: this.out('text'),
    normal: this.out('normal'),
    expanded: {
      normal: expanded.out('normal'),
      text: expanded.out('text')
    },
    contracted: {
      normal: contracted.out('normal'),
      text: contracted.out('text')
    },
    isContracted: Boolean(this.contracted)
  };
};
ContractionCl.prototype.expand = function() {
  return expand(this);
};
ContractionCl.prototype.contract = function() {
  return contract(this);
};
module.exports = ContractionCl;
