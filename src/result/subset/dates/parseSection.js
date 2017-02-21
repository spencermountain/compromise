'use strict';
//
const sections = {
  start: 'start',
  end: 'end',
  middle: 'middle',
  beginning: 'start',
  ending: 'end',
  midpoint: 'middle',
  midst: 'middle',
};
const parseSection = (r) => {
  let known = '(' + Object.keys(sections).join('|') + ')';
  let m = r.match(`the? ${known} of`);
  if (m.found) {
    let str = m.match(known).out('normal');
    return sections[str];
  }
  return null;
};
module.exports = parseSection;
