'use strict';
let adjective = {
  /** turn the adjective into a noun - 'quick'->'quickness' */
  noun: (t) => {
    t.text += 'ness';
    return t;
  }
};
module.exports = adjective;
