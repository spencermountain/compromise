'use strict';
const Text = require('../../text');
const ContractionCl = require('./contraction');
const findPossible = require('./findPossible');
//the Contractions() subset class

const methods = {
  contract: function() {
    this.list.forEach(ts => ts.contract());
    return this;
  },
  expand: function() {
    this.list.forEach(ts => ts.expand());
    return this;
  },
  contracted: function() {
    this.list = this.list.filter(ts => {
      return ts.contracted;
    });
    return this;
  },
  expanded: function() {
    this.list = this.list.filter(ts => {
      return !ts.contracted;
    });
    return this;
  }
};

const find = function(r, n) {
  //find currently-contracted
  let found = r.match('#Contraction #Contraction #Contraction?');
  found.list = found.list.map(ts => {
    let c = new ContractionCl(ts.terms, ts.world, ts.refText, ts.refTerms);
    c.contracted = true;
    return c;
  });
  //find currently-expanded
  let expanded = findPossible(r);
  expanded.list.forEach(ts => {
    let c = new ContractionCl(ts.terms, ts.world, ts.refText, ts.refTerms);
    c.contracted = false;
    found.list.push(c);
  });
  found.sort('chronological');
  //get nth element
  if (typeof n === 'number') {
    found = found.get(n);
  }
  return found;
};

module.exports = Text.makeSubset(methods, find);
