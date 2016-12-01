'use strict';
const predict = require('./predict');
const toInfinitive = require('./toInfinitive');
const toNegative = require('./toNegative');
const toPositive = require('./toPositive');
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
  /**inflection*/
  toPlural: function () {
    if (pluralMap[this.normal]) {
      return pluralMap[this.normal];
    }
    if (this.tag.PresentTense) {
      return this.text.replace(/s$/, '');
    }
    return this.text;
  },
  toSingular: function () {
    if (singularMap[this.normal]) {
      return singularMap[this.normal];
    }
    return this.text;
  },

  /**negative/positive*/
  toNegative: function () {
    return toNegative(this);
  },
  toPositive: function () {
    return toPositive(this);
  },

  /**conjugation*/
  infinitive: function () {
    return toInfinitive(this);
  },
  conjugation: function () {
    return predict(this);
  },
  conjugate: function () {
    return conjugate(this);
  },
  pastTense: function () {
    return conjugate(this).PastTense;
  },
  presentTense: function () {
    return conjugate(this).PresentTense;
  },
  futureTense: function () {
    return conjugate(this).FutureTense;
  }
};
