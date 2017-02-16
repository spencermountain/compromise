'use strict';
/** say where in the original output string they are found*/

const findOffset = (parent, term) => {
  let sum = 0;
  for(let i = 0; i < parent.list.length; i++) {
    for(let o = 0; o < parent.list[i].terms.length; o++) {
      let t = parent.list[i].terms[o];
      if (t.uid === term.uid) {
        return sum;
      } else {
        sum += t.whitespace.before.length + t._text.length + t.whitespace.after.length;
      }
    }
  }
  return null;
};

//map over all-dem-results
const allOffset = (r) => {
  let parent = r.all();
  return r.list.map((ts) => {
    return {
      text: ts.out('text'),
      normal: ts.out('normal'),
      offset: findOffset(parent, ts.terms[0]),
      length: ts.out('text').length
    };
  });
};
module.exports = allOffset;
