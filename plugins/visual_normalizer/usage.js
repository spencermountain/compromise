'use strict';
const nlp_compromise = require('../../src/index');
// const normalize = require('./normalize').normalize;
// const denormalize = require('./normalize').denormalize;

let context = {
  Term: {
    fun : function() {
      this.text += '!';
      return this;
    }
  }
};
let nlp = new nlp_compromise(context);
let w = nlp.term('work').fun();
console.log(w.text);
// "work!"
