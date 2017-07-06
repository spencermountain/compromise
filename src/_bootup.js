const ourLex = require('./lexicon');
const ourTags = require('./tagset');
const unpackLex = require('./lexicon/unpack');

const Compromise = function(lex, tagset) {
  this.lexicon = lex.lexicon;
  this.firstIndex = lex.firstIndex;
  this.tagset = tagset;
};

const methods = {
  addWords: function(userLex) {
    if (typeof userLex === 'string') {
      userLex = unpackLex(userLex);
    }
  }
};
Object.keys(methods).forEach(k => {
  Compromise.prototype[k] = methods[k];
});

const nlp = new Compromise(ourLex, {});
console.log(nlp);
