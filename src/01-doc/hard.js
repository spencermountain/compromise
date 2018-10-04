const build = require('../build');

module.exports = {
  //add these terms to the end
  append : function(str) {
    let phrases = build(str, this.pool());
    let phrase = phrases[0]; //assume it's one sentence, for now
    this.list.forEach((p) => {
      phrase = phrase.clone();
      // let appendTo = p.terms()[p.length - 1];
      // console.log(appendTo);
      p.append(phrase);
    });
    return this;
  },
  //add these terms to the front
  prepend: function(str) {
    //words we're prepending to
    let targets = [];
    let starts = [];
    this.list.forEach((p) => {
      let term = p.pool.get(p.start);
      starts.push(p.start);
      if (term.prev) {
        targets.push(term.prev);
      }
    });
    //compose the object
    let phrase = build(str, this.pool())[0]; //assume it's one sentence, for now
    //add it to each target
    this.list.forEach((p) => {
      p.prepend(phrase.clone());
    });
    //grow our ancestors out, as-well
    let parents = this.parents();
    parents.forEach((doc) => {
      doc.list.forEach((p) => {
        //change the start id of this one
        if (starts.includes(p.start)) {
          p.start = this.pool().get(p.start).prev;
          p.length += phrase.length;
        } else if (p.hasTerm(targets)) { //grow this phrase
          p.length += phrase.length;
        }
      });
    });
    return this;
  },

};
