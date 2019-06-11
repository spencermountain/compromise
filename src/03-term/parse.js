const normalize = require('./normalize');
//punctuation regs-  are we having fun yet?
// const before = /^(\s|-+|\.\.+|\/|"|\u0022|\uFF02|\u0027|\u201C|\u2018|\u201F|\u201B|\u201E|\u2E42|\u201A|\u00AB|\u2039|\u2035|\u2036|\u2037|\u301D|\u0060|\u301F)+/u;
// const after = /(\s+|-+|\.\.+|"|\u0022|\uFF02|\u0027|\u201D|\u2019|\u201D|\u2019|\u201D|\u201D|\u2019|\u00BB|\u203A|\u2032|\u2033|\u2034|\u301E|\u00B4)+$/u;
// const afterSoft = /(\s+|-+|\.\.+|"|\u0022|\uFF02|\u0027|\u201D|\u2019|\u201D|\u2019|\u201D|\u201D|\u2019|\u00BB|\u203A|\u2032|\u2033|\u2034|\u301E|\u00B4)+[,;.!? ]*$/u;
// const minusNumber = /^( *)-(\$|€|¥|£)?([0-9])/;

//all punctuation marks, from https://en.wikipedia.org/wiki/Punctuation
// let punctuation = '[ \.’\'\[\(\)\{\}⟨⟩:,،、‒–—―…!.‹›«»‐-\?]';

//money = ₵¢₡₢$₫₯֏₠€ƒ₣₲₴₭₺₾ℳ₥₦₧₱₰£៛₽₹₨₪৳₸₮₩¥
let endings = /[ \.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”'";\/⁄·\&*@\•^†‡°”¡¿※#№÷×ºª%‰+−=‱¶′″‴§~_|‖¦©℗®℠™¤₳฿]+$/;
let startings = /^[ \.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”'";\/⁄·\&*@\•^†‡°”¡¿※#№÷×ºª%‰+−=‱¶′″‴§~_|‖¦©℗®℠™¤₳฿]+/;

// console.log(endings);
//seperate the 'meat' from the trailing/leading whitespace.
//works in concert with ./src/text/tokenize.js
const parseTerm = str => {
  let preText = '';
  let postText = '';
  str = str.replace(startings, found => {
    preText = found;
    return '';
  });
  str = str.replace(endings, found => {
    postText = found;
    return '';
  });
  //we went too far..
  if (str === '') {
    str = preText.replace(/[.?!]/, ''); //.trim(); //huh?
    preText = '';
  }
  return {
    text: str,
    normal: normalize(str),
    preText: preText,
    postText: postText,
  };
};
module.exports = parseTerm;
