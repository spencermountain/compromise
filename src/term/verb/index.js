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
      return pluralMap[this.normal];
    }
    if (this.tag.PresentTense) {
      return this.text.replace(/s$/, '');
    }
    return this.text;
  },
  toSingular : function() {
    if (singularMap[this.normal]) {
      return singularMap[this.normal];
    }
    return this.text;
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
