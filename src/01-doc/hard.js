const build = require('../build');

module.exports = {
  prepend: function(str) {
    let phrases = build(str, this.pool());
    let phrase = phrases[0]; //assume it's one sentence, for now
    this.list.forEach((p) => {
      phrase = phrase.clone();
      p.prepend(phrase);
    });
    return this;
  },
  append : function(str) {
    let phrases = build(str, this.pool());
    let phrase = phrases[0]; //assume it's one sentence, for now
    this.list.forEach((p) => {
      phrase = phrase.clone();
      p.append(phrase);
    });
    return this;
  },

};
