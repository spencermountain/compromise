'use strict';
let value = {
  /** return an numeric version like an integer/float, like 44, or 308, or an ordinal like '1st', '308th' */
  Number: (t) => {
    return t;
  },
  /** return an textual version, like 'fourty four', or 'three hundred and eight' - or an ordinal string like 'first''*/
  Word: (t) => {
    return t;
  },
  /** turn an ordinal into a cardinal - 1 to '1st', 308 to '308th' */
  Cardinal: (t) => {
    return t;
  },
  /** turn a cardinal into an ordinal - '1st' to 1, '308th' to 308  */
  Ordinal: (t) => {
    t.text += 'th';
    return t;
  }
};
module.exports = value;
