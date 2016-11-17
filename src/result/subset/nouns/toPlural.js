'use strict';
const twistArticle = require('./twistArticle');

//inflect a term or termlist
const toPlural = function(options) {
  options = options || {};
  this.list = this.list.map((ts) => {
    for(let i = 0; i < ts.terms.length; i++) {
      let t = ts.terms[i];
      if (t.tag.Noun && t.noun.hasPlural()) {
        t.text = t.noun.plural();
        t.unTag('Singular', 'toPlural()');
        t.tagAs('Plural', 'toPlural()');
        //also twist the determiner, eg -'a' to 'the'
        if (!options.leave_article) {
          ts = twistArticle.plural(ts, i);
        }
      }
    }
    return ts;
  });
  return this.all();
};

module.exports = toPlural;
