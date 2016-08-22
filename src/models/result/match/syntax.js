'use strict';
// parse a search lookup term find the regex-like syntax in this term
const fns = require('../../fns.js');

//turn 'regex-like' search string into parsed json
const parse_term = function(term, i) {
  term = term || '';
  term = term.toLowerCase().trim();
  let reg = {};
  //order matters..

  //leading ^ flag
  if (fns.startsWith(term, '^')) {
    term = term.substr(1, term.length);
    reg.starting = true;
  }
  //trailing $ flag means ending
  if (fns.endsWith(term, '$')) {
    term = term.replace(/\$$/, '');
    reg.ending = true;
  }
  //optional flag
  if (fns.endsWith(term, '?')) {
    term = term.replace(/\?$/, '');
    reg.optional = true;
  }

  //pos flag
  if (fns.startsWith(term, '[') && fns.endsWith(term, ']')) {
    term = term.replace(/\]$/, '');
    term = term.replace(/^\[/, '');
    reg.tag = term.split(/\|/g).map((str) => fns.titleCase(str));
    term = null;
  }
  //one_of options flag
  if (fns.startsWith(term, '(') && fns.endsWith(term, ')')) {
    term = term.replace(/\)$/, '');
    term = term.replace(/^\(/, '');
    reg.oneOf = term.split(/\|/g).map((str) => str.toLowerCase());
    term = null;
  }
  //alias flag
  if (fns.startsWith(term, '~')) {
    term = term.replace(/^\~/, '');
    term = term.replace(/\~$/, '');
    reg.alias = true;
  }
  //addition flag
  if (fns.startsWith(term, '+')) {
    term = term.replace(/^\+/, '');
    term = term.replace(/\+$/, '');
    reg.extra = true;
  }

  //a period means any one term
  if (term === '.') {
    reg.anyOne = true;
    term = null;
  }
  //a * means anything until sentence end
  if (term === '*') {
    reg.greedy = true;
    term = null;
  }
  reg.normal = term;
  return reg;
};
// console.log(parse_term('(one|1) (two|2)'));


//turn a match string into an array of objects
const parse_all = function(reg) {
  reg = reg.split(/ +/);
  return reg.map(parse_term);
};
// console.log(parse_all(''));

module.exports = parse_all;
