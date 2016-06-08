
// This mixin adds an exclamation mark!
var my_mixin = {
  Term: {
    fun : function() {
      this.text += '!';
      this.rebuild(); //(good practice)
      return this;
    }
  }
};
module.exports = my_mixin;

/////
////  Usage:
/////
// var nlp_compromise = require('../../src/index');
// nlp_compromise.mixin(my_mixin);
// var t = nlp_compromise.term('work');
// t.fun();
// console.log(t.text);
// // "work!"
