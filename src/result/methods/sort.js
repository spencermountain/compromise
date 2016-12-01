'use strict';
const Terms = require('../../terms');

const sortMethod = (Text) => {

  const methods = {

    /**reorder result.list alphabetically */
    sortAlpha: function () {
      this.list = this.list.sort((a, b) => {
        if (a.plaintext() > b.plaintext()) {
          return 1
        }
        return -1
      })
      return this
    },

    /**reverse the order of result.list */
    reverse: function () {
      this.list = this.list.reverse()
      return this
    },


    unique: function () {
      let obj = {}
      this.list = this.list.filter((ts) => {
        let str = ts.normal()
        if (obj[str]) {
          return false
        }
        obj[str] = true
        return true
      })
      return this
    }
  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = sortMethod;
