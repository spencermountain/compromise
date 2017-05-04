'use strict';
//this methods are simply loops around each termList object.
const methods = [
  'toTitleCase',
  'toUpperCase',
  'toLowerCase',
  'toCamelCase',

  'hyphenate',
  'dehyphenate',
  'trim',

  'insertBefore',
  'insertAfter',
  'insertAt',

  'replace',
  'replaceWith',

  'delete',
  'lump',

  'tagger',

  // 'tag',
  'unTag',
];

const addMethods = (Text) => {
  methods.forEach((k) => {
    Text.prototype[k] = function () {
      for(let i = 0; i < this.list.length; i++) {
        this.list[i][k].apply(this.list[i], arguments);
      }
      return this;
    };
  });

  //add an extra optimisation for tag method
  Text.prototype.tag = function() {
    //fail-fast optimisation
    if (this.list.length === 0) {
      return this;
    }
    for(let i = 0; i < this.list.length; i++) {
      this.list[i].tag.apply(this.list[i], arguments);
    }
    return this;
  };
};

module.exports = addMethods;
