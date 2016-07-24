'use strict';
let adjective = {
  noun: (t) => {
    t.text += 'ness';
    return t;
  }
};
module.exports = adjective;
