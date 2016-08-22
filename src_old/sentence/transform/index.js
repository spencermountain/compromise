'use strict';
const transform = {
  question: (s) => {
    s.terminator = '?'; //todo: actually try this
    return s;
  },
  statement: (s) => {
    s.terminator = '.'; //todo: actually try this
    return s;
  }
};
module.exports = transform;
