'use strict';
const twistArticle = require('./twistArticle');

//inflect a term or termlist
const toPlural = function() {
  this.list = this.list.map((ts) => {
    for(let i = 0; i < ts.terms.length; i++) {
      let t = ts.terms[i];
      if (t.tag.Noun && t.noun.hasPlural()) {
        t.text = t.noun.toPlural();
        t.unTag('Singular', 'toPlural()');
        t.tagAs('Plural', 'toPlural()');
        //also twist the determiner, eg -'a' to 'the'
        ts = twistArticle.toPlural(ts, i);
      }
    }
    return ts;
  });
  return this.parent();
};

module.exports = toPlural;
