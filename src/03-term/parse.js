const normalize = require('./normalize');
//punctuation regs-  are we having fun yet?
const before = /^(\s|-+|\.\.+|\/|"|\u0022|\uFF02|\u0027|\u201C|\u2018|\u201F|\u201B|\u201E|\u2E42|\u201A|\u00AB|\u2039|\u2035|\u2036|\u2037|\u301D|\u0060|\u301F)+/u;
const after = /(\s+|-+|\.\.+|"|\u0022|\uFF02|\u0027|\u201D|\u2019|\u201D|\u2019|\u201D|\u201D|\u2019|\u00BB|\u203A|\u2032|\u2033|\u2034|\u301E|\u00B4)+$/u;
const afterSoft = /(\s+|-+|\.\.+|"|\u0022|\uFF02|\u0027|\u201D|\u2019|\u201D|\u2019|\u201D|\u201D|\u2019|\u00BB|\u203A|\u2032|\u2033|\u2034|\u301E|\u00B4)+[,;.!? ]*$/u;
const minusNumber = /^( *)-(\$|€|¥|£)?([0-9])/;

//seperate the 'meat' from the trailing/leading whitespace.
//works in concert with ./src/text/tokenize.js
const parseTerm = (str) => {
  let preText = '';
  let postText = '';
  //get before punctuation/whitespace
  //mangle 'far - fetched', but don't mangle '-2'
  let m = str.match(minusNumber);
  if (m !== null) {
    preText = m[1];
    str = str.replace(/^ */, '');
  } else {
    m = str.match(before);
    if (m !== null) {
      preText = str.match(before)[0];
      str = str.replace(before, '');
    }
  }
  //get after punctuation/whitespace
  m = str.match(afterSoft);
  if (m !== null) {
    str = str.replace(after, '');
    postText = m[0];
  }
  return {
    text: str,
    normal: normalize(str),
    preText: preText,
    postText: postText,
  };
};
module.exports = parseTerm;
