'use strict';
//supported Text.to() transformation methods
module.exports = {

  normal: (t) => {
    t.sentences = t.sentences.map((s) => {
      return s.to('normal');
    });
    return t;
  },

  Exclamation: (t) => {
    t.sentences = t.sentences.map((s) => {
      //don't turn questions into statements
      if (s.is('Question')) {
        return s;
      }
      return s.to('Exclamation');
    });
    return t;
  },
  Statement: (t) => {
    t.sentences = t.sentences.map((s) => {
      //don't turn questions into statements
      if (s.is('Question')) {
        return s;
      }
      return s.to('Statement');
    });
    return t;
  }

};
