'use strict';
// const quotes = [ //
//   ['"', '"'],
//   ['\u0022', '\u0022'],
//   ['\uFF02', '\uFF02'],
//   ['\u0027', '\u0027'],
//   ['\u201C', '\u201D'],
//   ['\u2018', '\u2019'],
//   ['\u201F', '\u201D'],
//   ['\u201B', '\u2019'],
//   ['\u201E', '\u201D'],
//   ['\u2E42', '\u201D'],
//   ['\u201A', '\u2019'],
//   ['\u00AB', '\u00BB'],
//   ['\u2039', '\u203A'],
//   ['\u2035', '\u2032'],
//   ['\u2036', '\u2033'],
//   ['\u2037', '\u2034'],
//   ['\u301D', '\u301E'],
//   ['\u0060', '\u00B4'],
//   ['\u301F', '\u301E'],
// ];
//punctuation regs-  are we having fun yet?
const before = /^(\s|-+|\.\.+|\/|"|\u0022|\uFF02|\u0027|\u201C|\u2018|\u201F|\u201B|\u201E|\u2E42|\u201A|\u00AB|\u2039|\u2035|\u2036|\u2037|\u301D|\u0060|\u301F)+/u;
const after = /(\s+|-+|\.\.+|"|\u0022|\uFF02|\u0027|\u201D|\u2019|\u201D|\u2019|\u201D|\u201D|\u2019|\u00BB|\u203A|\u2032|\u2033|\u2034|\u301E|\u00B4)+$/u;
const minusNumber = /^( *)-(\$|€|¥|£)?([0-9])/;

//seperate the 'meat' from the trailing/leading whitespace.
//works in concert with ./src/text/tokenize.js
const build_whitespace = (str) => {
  let whitespace = {
    before: '',
    after: ''
  };
  //get before punctuation/whitespace
  //mangle 'far - fetched', but don't mangle '-2'
  let m = str.match(minusNumber);
  if (m !== null) {
    whitespace.before = m[1];
    str = str.replace(/^ */, '');
  } else {
    m = str.match(before);
    if (m !== null) {
      whitespace.before = str.match(before)[0];
      str = str.replace(before, '');
    }
  }
  //get after punctuation/whitespace
  m = str.match(after);
  if (m !== null) {
    str = str.replace(after, '');
    whitespace.after = m[0];
  }
  return {
    whitespace: whitespace,
    text: str
  };
};
module.exports = build_whitespace;
