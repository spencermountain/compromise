'use strict';
const predict = require('./predict');
const toInfinitive = require('./toInfinitive');
const conjugate = require('./conjugate');
const toAdjective = require('./toAdjective');
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
  infinitive: function (verbose) {
    return toInfinitive(this, verbose);
  },
  conjugation: function (verbose) {
    return predict(this, verbose);
  },
  conjugate: function (verbose) {
    return conjugate(this, verbose);
  },

  pastTense: function () {
    return conjugate(this).PastTense;
  },
  presentTense: function () {
    return conjugate(this).PresentTense;
  },
  futureTense: function () {
    return conjugate(this).FutureTense;
  },

  asAdjective: function() {
    return toAdjective(this.normal);
  },

  //mutable methods
  toPastTense: function () {
    this.text = conjugate(this).PastTense;
    this.tagAs('PastTense');
    return this;
  },
  toPresentTense: function () {
    this.text = conjugate(this).Infinitive;
    this.tagAs('Infinitive');
    return this;
  },
  toFutureTense: function () {
    this.text = conjugate(this).FutureTense;
    this.tagAs('FutureTense');
    return this;
  },
};
