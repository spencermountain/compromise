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
  infinitive: function() {
    return toInfinitive(this);
  },
  conjugation: function() {
    return predict(this);
  },
  conjugate: function() {
    return conjugate(this);
  },
  pastTense: function() {
    return conjugate(this).PastTense;
  },
  presentTense: function() {
    return conjugate(this).PresentTense;
  },
  futureTense: function() {
    return conjugate(this).FutureTense;
  }
};
