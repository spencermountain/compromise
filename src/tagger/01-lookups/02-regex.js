const startsWith = require('./regex/startsWith');
const endsWith = require('./regex/endsWith');
const suffixList = require('./regex/suffixList');

//try each of the ^regexes in our list
const tagPrefix = function(term, world) {
  let str = term.normal;
  for(let r = 0; r < startsWith.length; r += 1) {
    if (startsWith[r][0].test(str) === true) {
      term.tag(startsWith[r][1], 'startsWith #' + r, world);
      continue;
    }
  }
};

const tagSuffix = function(term, world) {
  let str = term.normal;
  let char = str[str.length - 1];
  if (endsWith.hasOwnProperty(char) === true) {
    let regs = endsWith[char];
    for(let r = 0; r < regs.length; r += 1) {
      if (regs[r][0].test(str) === true) {
        term.tag(regs[r][1], 'endsWith #' + r, world);
        continue;
      }
    }
  }
};

//sweep-through all suffixes
const knownSuffixes = function(term, world) {
  const len = term.normal.length;
  let max = 7;
  if (len <= max) {
    max = len - 1;
  }
  for (let i = max; i > 1; i -= 1) {
    let str = term.normal.substr(len - i, len);
    if (suffixList[str.length].hasOwnProperty(str) === true) {
      let tag = suffixList[str.length][str];
      term.tag(tag, 'suffix -' + str, world);
      break;
    }
  }
};

//all-the-way-down!
const checkRegex = function(term, world) {
  tagPrefix(term, world);
  tagSuffix(term, world);
  knownSuffixes(term, world);
};
module.exports = checkRegex;
