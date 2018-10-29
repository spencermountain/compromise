module.exports = {

  // append: function(phrase) {
  //   let terms = this.terms();
  //   let newTerms = phrase.terms();
  //   //hook up the two 'next' ids
  //   let tmp = terms[terms.length - 1].next;
  //   terms[terms.length - 1].next = phrase.start;
  //   newTerms[newTerms.length - 1].next = tmp;
  //   //hook it up the two 'prev' ids, too
  //   // tmp = phrase.terms()[0].prev;
  //   // phrase.terms()[0].prev = terms[terms.length - 1].id;
  //   // newTerms[0].prev = tmp;
  //
  //   //include it in our phrase
  //   this.length += phrase.length;
  //   return this;
  // },
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
  addAt: function(id, termList) {
    let terms = this.terms();
    let index = terms.findIndex(t => t.id === id);
    if (index === -1) {
      console.warn('Could not find term with id: ' + id);
      return this;
    }
  // console.log(index);
  }
};
