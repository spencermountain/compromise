'use strict';
const normalize = require('./normalize').normalize;
const denormalize = require('./normalize').denormalize;

let mixin = {
  Term: {
    normalize : function() {
      this.text = normalize(this.text);
      return this;
    },
    denormalize : function() {
      this.text = denormalize(this.text);
      return this;
    }
  }
};
module.exports = mixin;
// const nlp = require('../../src/index');
// nlp.mixin(mixin);
//
// let w = nlp.term('Jørgen Fróði Čukić');
// console.log(w.normalize().text);
// //"Jorgen Frooi cukic"
