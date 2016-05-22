'use strict';
const is_uncountable = require('./is_uncountable.js');
const irregulars = require('../../data/irregular_nouns.js');
const is_plural = require('./is_plural.js');
const fns = require('../../fns.js');

const pluralize_rules = [
  [/(ax|test)is$/i, '$1es'],
  [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, '$1i'],
  [/(octop|vir)i$/i, '$1i'],
  [/(kn|l|w)ife$/i, '$1ives'],
  [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)f$/i, '$1ves'],
  [/^(dwar|handkerchie|hoo|scar|whar)f$/i, '$1ves'],
  [/(alias|status)$/i, '$1es'],
  [/(bu)s$/i, '$1ses'],
  [/(al|ad|at|er|et|ed|ad)o$/i, '$1oes'],
  [/([ti])um$/i, '$1a'],
  [/([ti])a$/i, '$1a'],
  [/sis$/i, 'ses'],
  [/(hive)$/i, '$1s'],
  [/([^aeiouy]|qu)y$/i, '$1ies'],
  [/(x|ch|ss|sh|s|z)$/i, '$1es'],
  [/(matr|vert|ind|cort)(ix|ex)$/i, '$1ices'],
  [/([m|l])ouse$/i, '$1ice'],
  [/([m|l])ice$/i, '$1ice'],
  [/^(ox)$/i, '$1en'],
  [/^(oxen)$/i, '$1'],
  [/(quiz)$/i, '$1zes'],
  [/(antenn|formul|nebul|vertebr|vit)a$/i, '$1ae'],
  [/(sis)$/i, 'ses'],
  [/^(?!talis|.*hu)(.*)man$/i, '$1men'],
  [/(.*)/i, '$1s']
].map(function(a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});


const pluralize = function(str) {
  const low = str.toLowerCase();
  //uncountable
  if (is_uncountable(low)) { //uncountables shouldn't ever inflect
    return str;
  }
  //is it already plural?
  if (is_plural(low) === true) {
    return str;
  }
  //irregular
  const found = irregulars.filter(function(r) {
    return r[0] === low;
  });
  if (found[0]) {
    if (fns.titlecase(low) === str) { //handle capitalisation properly
      return fns.titlecase(found[0][1]);
    }
    return found[0][1];

  }
  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    const first = (str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1];
    if (first) {
      const better_first = pluralize(first);
      return better_first + str.replace(first, '');
    }
  }
  //regular
  for (let i = 0; i < pluralize_rules.length; i++) {
    if (str.match(pluralize_rules[i].reg)) {
      return str.replace(pluralize_rules[i].reg, pluralize_rules[i].repl);
    }
  }
  return null;
};
// console.log(pluralize('gas') === "gases")
// console.log(pluralize('narrative') === "narratives")
// console.log(pluralize('video') === "videos")
// console.log(pluralize('photo') === "photos")
// console.log(pluralize('stomach') === "stomachs")
// console.log(pluralize('database') === "databases")
// console.log(pluralize('kiss') === "kisses")
// console.log(pluralize('towns') === "towns")
// console.log(pluralize('peace') === "peace")
// console.log(pluralize('mayor of chicago') === "mayors of chicago")
module.exports = pluralize;
