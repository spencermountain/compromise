'use strict';

module.exports = {
  toPlural : function() {
    return this.text + 's';
  },
  toSingular : function() {
    return this.text.replace(/s$/, '');
  }
};
