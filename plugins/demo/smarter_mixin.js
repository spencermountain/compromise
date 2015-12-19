
// This mixin adds a 'So basically,' before every sentence
var mixin = {
  Text: {
    so_basically : function() {
      this.sentences.forEach(function(s) {
        s.terms = s.terms.forEach(function(t) {});
      });
      return this;
    }
  }
};

/////
// Usage:
////
const nlp_compromise = require('../../src/index');
nlp_compromise.mixin(mixin);
var t = nlp_compromise.term('work');
t.fun();
console.log(t.text);
// "work!"
