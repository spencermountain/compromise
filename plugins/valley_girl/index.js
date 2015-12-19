
// This mixin adds the word 'like' before every article
var mixin = {
  Text: {
    valley_girl : function() {
      this.sentences.forEach(function(s) {
        s.addBefore(0, 'So basically,');
        for(var i = 0; i < s.terms.length; i++) {
          if (s.terms[i].pos['Determiner']) {
            s.addBefore(i, 'like,');
            i++;
          }
        }
      });
      return this;
    }
  }
};

module.exports = mixin;

/////
// Usage:
////
const nlp_compromise = require('../../src/index');
var t = nlp_compromise.text('it is a cool library.');
nlp_compromise.mixin(mixin);
t.valley_girl();
console.log(t.text());
// "So basically, it is like, a cool library."
