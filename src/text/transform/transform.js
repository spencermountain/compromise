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
      if (s.is('Exclamation')) {
        return s;
      }
      return s.to('Exclamation');
    });
    return t;
  }

};
