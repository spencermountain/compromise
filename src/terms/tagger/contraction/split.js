'use strict';

const allowed = {
  're': true,
  've': true,
  'll': true,
  't': true,
  's': true,
  'd': true,
  'm': true
};
/** interpret a terms' contraction */
const splitContraction = (t) => {
  let parts = t.text.match(/^([a-z]+)'([a-z][a-z]?)$/i);
  if (parts && parts[1] && allowed[parts[2]]) {
    //handle n't
    if (parts[2] === 't' && parts[1].match(/[a-z]n$/)) {
      parts[1] = parts[1].replace(/n$/, '');
      parts[2] = 'n\'t'; //dunno..
    }
    //fix titlecase
    if (t.tag.TitleCase) {
      parts[1] = parts[1].replace(/^[a-z]/, (x) => x.toUpperCase());
    }
    return {
      start: parts[1],
      end: parts[2]
    };
  }
  // "flanders' house"
  parts = t.text.match(/[a-z]s'$/i);
  if (parts) {
    return {
      start: t.normal.replace(/s'?$/, ''),
      end: ''
    };
  }
  return null;
};
module.exports = splitContraction;
