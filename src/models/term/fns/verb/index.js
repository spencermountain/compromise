'use strict';
const predict = require('./predict');
const toInfinitive = require('./toInfinitive');
const conjugate = require('./conjugate');

let pluralMap = {
  'is': 'are',
  'have': 'has'
};
let singularMap = {
  'are': 'is',
  'has': 'have'
};

module.exports = {
  toPlural : function() {
    if (pluralMap[this.normal]) {
      this.text = pluralMap[this.normal];
      return this;
    }
    if (this.tag.PresentTense) {
      this.text = this.text.replace(/s$/, '');
      return this;
    }
    return this;
  },
  toSingular : function() {
    if (singularMap[this.normal]) {
      this.text = singularMap[this.normal];
      return this;
    }
    return this;
  },
  infinitive: function() {
    return toInfinitive(this);
  },
  conjugation: function() {
    return predict(this);
  },
  conjugate: function() {
    return conjugate(this);
  }
};
