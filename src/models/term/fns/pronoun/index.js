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
      return pluralMap[this.normal];
    }
    return this.text;
  },
  toSingular : function() {
    if (singularMap[this.normal]) {
      return singularMap[this.normal];
    }
    return this.text;
  }
};
