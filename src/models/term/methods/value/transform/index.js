'use strict';
let value = {
  /** return an numeric version like an integer/float, like 44, or 308, or an ordinal like '1st', '308th' */
  number: (t) => {
    let num = t.info('Number');
    t.text = '' + num;
    t.tagAs('Numeric');
    return t;
  },
  /** return an textual version, like 'fourty four', or 'three hundred and eight' - or an ordinal string like 'first''*/
  textvalue: (t) => {
    let num = t.info('Textual');
    t.text = '' + num;
    t.tagAs('TextValue');
    return t;
  },
  /** turn an ordinal into a cardinal - 1 to '1st', 308 to '308th' */
  cardinal: (t) => {
    let num = t.info('Cardinal');
    t.text = '' + num;
    t.tagAs('Cardinal');
    return t;
  },
  /** turn a cardinal into an ordinal - '1st' to 1, '308th' to 308  */
  ordinal: (t) => {
    console.log(t.normal);
    let num = t.info('Ordinal');
    t.text = '' + num;
    t.tagAs('Ordinal');
    return t;
  }
};
module.exports = value;
