'use strict';
const contraction = /^([a-z]+)'([a-z][a-z]?)$/i;
const possessive = /[a-z]s'$/i;

const allowed = {
  re: 1,
  ve: 1,
  ll: 1,
  t: 1,
  s: 1,
  d: 1,
  m: 1
};

/** interpret a terms' contraction */
const splitContraction = t => {
  //handle this irregular one (shared trailing n)
  if (t.normal === 'can\'t') {
    return {
      start: 'can',
      end: 'n\'t'
    };
  }
  let parts = t.normal.match(contraction);
  if (parts && parts[1] && allowed[parts[2]] === 1) {
    //handle n't
    if (parts[2] === 't' && parts[1].match(/[a-z]n$/)) {
      parts[1] = parts[1].replace(/n$/, '');
      parts[2] = 'n\'t'; //dunno..
    }
    //fix titlecase
    if (t.tags.TitleCase === true) {
      parts[1] = parts[1].replace(/^[a-z]/, x => x.toUpperCase());
    }
    return {
      start: parts[1],
      end: parts[2]
    };
  }
  // "flanders' house"
  if (possessive.test(t.text) === true) {
    return {
      start: t.normal.replace(/s'?$/, ''),
      end: ''
    };
  }
  return null;
};
module.exports = splitContraction;
