const parseSyntax = require('./syntax');

// all the real match logic is in ./phrase/match
// here, we simply parse the expression
const matchAll = function(doc, reg) {
  //parse-up the input expression
  let regs = parseSyntax(reg);
  //try expression on each phrase
  let matches = doc.list.reduce((arr, p) => {
    return arr.concat(p.match(regs));
  }, []);
  return matches;
};
module.exports = matchAll;
