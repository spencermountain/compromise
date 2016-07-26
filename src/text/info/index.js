'use strict';
//nearly every inspection method is over at /sentence/info
module.exports = {

  terms: (t) => {
    let arr = [];
    t.sentences.forEach((s) => {
      s.terms.forEach((term) => {
        arr.push(term);
      });
    });
    return arr;
  }
};
