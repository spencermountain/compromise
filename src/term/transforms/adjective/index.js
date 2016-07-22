'use strict';
let adjective = {
  Noun: (t) => {
    t.text += 'ness';
    return t;
  }
};
module.exports = adjective;
