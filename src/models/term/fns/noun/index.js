'use strict';

module.exports = {
  toPlural : function() {
    this.text = this.text + 's';
    return this;
  },
  toSingular : function() {
    this.text = this.text.replace(/s$/, '');
    return this;
  }
};
