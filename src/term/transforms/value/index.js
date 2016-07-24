'use strict';
let value = {
  ordinal: (t) => {
    t.text += 'th';
    return t;
  }
};
module.exports = value;
