'use strict';
const twistArticle = require('./twistArticle');

//inflect a term or termlist
const toSingular = function(r) {
  this.list = this.list.map((ts) => {
    for(let i = 0; i < ts.terms.length; i++) {
      let t = ts.terms[i];
      if (t.tag.Noun && t.noun.hasPlural()) {
        t.text = t.noun.toSingular();
        t.unTag('Plural', 'toSingular()');
        t.tagAs('Singular', 'toSingular()');
        //also twist the determiner, eg -'a' to 'the'
        ts = twistArticle.toSingular(ts, i);
      }
    }
    return ts;
  });
  return this.parent();
};

module.exports = toSingular;
