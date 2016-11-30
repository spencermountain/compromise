'use strict';
const twistArticle = require('./twistArticle');

//inflect a term or termlist
const toSingular = function (options) {
  options = options || {};
  this.list = this.list.map((ts) => {
    let len = ts.terms.length;
    for (let i = 0; i < len; i++) {
      let t = ts.terms[i];
      if (t.tag.Noun && t.noun.hasPlural()) {
        t.text = t.noun.singular() || t.text;
        t.unTag('Plural', 'toSingular()');
        t.tagAs('Singular', 'toSingular()');
        //also twist the determiner, eg -'a' to 'the'
        if (!options.leave_article) {
          ts = twistArticle.singular(ts, i);
        }
      }
    }
    return ts;
  });
  return this.all();
};

module.exports = toSingular;
