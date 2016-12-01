'use strict';

module.exports = {
  /**negative/positive*/
  toNegative: function () {
    this.term.insertAfter('not')
    return this;
  },
  toPositive: function () {
    return this
  },
}
