'use strict';

let pluralMap = {
  'he': 'they',
  'she': 'they',
  'it': 'they',
  'they': 'they',
  'this': 'those',
};
let singularMap = {
  'those': 'this',
};

module.exports = {
  toPlural : function() {
    if (pluralMap[this.normal]) {
      this.text = pluralMap[this.normal];
    }
    return this;
  },
  toSingular : function() {
    if (singularMap[this.normal]) {
      this.text = singularMap[this.normal];
    }
    return this;
  }
};
