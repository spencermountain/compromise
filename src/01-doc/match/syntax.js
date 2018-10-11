const parseToken = require('./parseToken');

//split-up by (these things)
const byParentheses = function(str) {
  let arr = str.split(/(\(.*?\)[?+*]*)/);
  arr = arr.map(s => s.trim());
  return arr;
};

const byWords = function(arr) {
  let words = [];
  arr.forEach((a) => {
    //keep brackets lumped together
    if (/^[[^_/]?\(/.test(a[0])) {
      words.push(a);
      return;
    }
    let list = a.split(' ');
    list = list.filter(w => w);
    words = words.concat(list);
  });
  return words;
};

//
const syntax = function(str) {
  let tokens = byParentheses(str);
  tokens = byWords(tokens);
  tokens = tokens.map(parseToken);
  return tokens;
};
module.exports = syntax;
