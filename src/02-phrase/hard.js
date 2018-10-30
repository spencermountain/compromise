const join = require('./join');
// const insertAfter = require('./insert/after');
module.exports = {

  //accept a phrase object and put it at the end
  append: function(phrase, doc) {
    join(this, phrase, doc);
    return this;
  },
  prepend: function(phrase, doc) {
    return join(phrase, this, doc);
  },
  // prepend: function(phrase) {
  //   let terms = this.terms();
  //   let newTerms = phrase.terms();
  //   //add us to the end of new phrase
  //   newTerms[newTerms.length - 1].next = this.start;
  //
  //   //hook-up previous word, in parent
  //   if (terms[0].prev) {
  //     let before = this.pool.get(terms[0].prev);
  //     before.next = newTerms[0].id;
  //   }
  //   //hook it up the two 'prev' ids, too
  //   this.terms()[0].prev = newTerms[0].id;
  //
  //   //include it in our phrase
  //   this.start = newTerms[0].id;
  //   this.length += phrase.length;
  //   return this;
  // },
  insertAt: function(termsList, id, doc) {
    insertAfter(this, termsList, id);
    //repair all parents, too
    // console.log(doc.parent());
    return this;
  }
};
