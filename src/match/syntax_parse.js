'use strict';
// parse a search lookup term find the regex-like syntax in this term
const fns = require('../fns.js');
// flags:
// {
//   pos: true,
//   optional: true,
//   one_of: true,
//   alias: true,
//   leading: true,
//   trailing: true,
//   any_one: true,
//   any_many: true,
// }


const parse_term = function(term, i) {
  term = term || '';
  term = term.trim();
  let signals = {};
  //order matters!

  //leading ^ flag
  if (fns.startsWith(term, '^')) {
    term = term.substr(1, term.length);
    signals.leading = true;
  }
  //trailing $ flag means ending
  if (fns.endsWith(term, '$')) {
    term = term.replace(/\$$/, '');
    signals.trailing = true;
  }
  //optional flag
  if (fns.endsWith(term, '?')) {
    term = term.replace(/\?$/, '');
    signals.optional = true;
  }

  //pos flag
  if (fns.startsWith(term, '[') && fns.endsWith(term, ']')) {
    term = term.replace(/\]$/, '');
    term = term.replace(/^\[/, '');
    signals.pos = true;
  }
  //one_of options flag
  if (fns.startsWith(term, '(') && fns.endsWith(term, ')')) {
    term = term.replace(/\)$/, '');
    term = term.replace(/^\(/, '');
    signals.one_of = true;
  }
  //alias flag
  if (fns.startsWith(term, '~')) {
    term = term.replace(/^\~/, '');
    term = term.replace(/\~$/, '');
    signals.alias = true;
  }
  //addition flag
  if (fns.startsWith(term, '+')) {
    term = term.replace(/^\+/, '');
    term = term.replace(/\+$/, '');
    signals.extra = true;
  }

  //a period means anything
  if (term === '.') {
    signals.any_one = true;
  }
  //a * means anything
  if (term === '*') {
    signals.any_many = true;
  }
  return {
    term,
    signals,
    i
  };
};
// console.log(parse_term('(one|1) (two|2)'));


//turn a match string into an array of objects
const parse_all = function(regs) {
  regs = regs || [];
  return regs.map(parse_term);
};
// console.log(parse_all(''));

module.exports = parse_all;
