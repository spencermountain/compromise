'use strict';
let value = {
  Ordinal: (t) => {
    t.text += 'th';
    return t;
  }
};
module.exports = value;
