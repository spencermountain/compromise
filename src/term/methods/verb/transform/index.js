'use strict';
const transform = {
  pasttense: (t) => {
    let obj = t.info('Conjugations');
    console.log(obj);
    t.text = obj.Past || t.text;
    return t;
  }
};
module.exports = transform;
