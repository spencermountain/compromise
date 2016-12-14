'use strict';
const Text = require('../../index');

class HashTags extends Text {
  parse() {
    return this.mapTerms((t) => {
      return {
        text: t.text
      };
    });
  }
  static find(r){
    return r.match('#HashTag')
  }
}

module.exports = HashTags;
