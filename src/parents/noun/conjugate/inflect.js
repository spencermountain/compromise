//converts nouns from plural and singular, and viceversases
//some regex borrowed from pksunkara/inflect
//https://github.com/pksunkara/inflect/blob/master/lib/defaults.js

var uncountables = require("../../../data/lexicon/uncountables");
var irregular_nouns = require("../../../data/lexicon/irregular_nouns");

var i;

//words that shouldn't ever inflect, for metaphysical reasons
var uncountable_nouns = uncountables.reduce(function(h, a) {
  h[a] = true;
  return h;
}, {});

var titlecase = function(str) {
  if (!str) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

//these aren't nouns, but let's inflect them anyways
var irregulars = [
  ["he", "they"],
  ["she", "they"],
  ["this", "these"],
  ["that", "these"],
  ["mine", "ours"],
  ["hers", "theirs"],
  ["his", "theirs"],
  ["i", "we"],
  ["move", "_s"],
  ["myself", "ourselves"],
  ["yourself", "yourselves"],
  ["himself", "themselves"],
  ["herself", "themselves"],
  ["themself", "themselves"],
  ["its", "theirs"],
  ["theirs", "_"]
];
irregulars = irregulars.concat(irregular_nouns);

var pluralize_rules = [
  [/(ax|test)is$/i, "$1es"],
  [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, "$1i"],
  [/(octop|vir)i$/i, "$1i"],
  [/([rl])f$/i, "$1ves"],
  [/(alias|status)$/i, "$1es"],
  [/(bu)s$/i, "$1ses"],
  [/(al|ad|at|er|et|ed|ad)o$/i, "$1oes"],
  [/([ti])um$/i, "$1a"],
  [/([ti])a$/i, "$1a"],
  [/sis$/i, "ses"],
  [/(?:([^f])fe|([lr])f)$/i, "$1ves"],
  [/(hive)$/i, "$1s"],
  [/([^aeiouy]|qu)y$/i, "$1ies"],
  [/(x|ch|ss|sh|s|z)$/i, "$1es"],
  [/(matr|vert|ind|cort)(ix|ex)$/i, "$1ices"],
  [/([m|l])ouse$/i, "$1ice"],
  [/([m|l])ice$/i, "$1ice"],
  [/^(ox)$/i, "$1en"],
  [/^(oxen)$/i, "$1"],
  [/(quiz)$/i, "$1zes"],
  [/(antenn|formul|nebul|vertebr|vit)a$/i, "$1ae"],
  [/(sis)$/i, "ses"],
  [/^(?!talis|.*hu)(.*)man$/i, "$1men"],
  [/(.*)/i, "$1s"]
].map(function(a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});

var pluralize = function(str) {
  var low = str.toLowerCase();
  //uncountable
  if (uncountable_nouns[low]) {
    return str;
  }
  //is it already plural?
  if (is_plural(low) === true) {
    return str;
  }
  //irregular
  var found = irregulars.filter(function(r) {
    return r[0] === low;
  });
  if (found[0]) {
    if (titlecase(low) === str) { //handle capitalisation properly
      return titlecase(found[0][1]);
    } else {
      return found[0][1];
    }
  }
  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    var first = (str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1];
    if (first) {
      var better_first = pluralize(first);
      return better_first + str.replace(first, "");
    }
  }
  //regular
  for (i = 0; i < pluralize_rules.length; i++) {
    if (str.match(pluralize_rules[i].reg)) {
      return str.replace(pluralize_rules[i].reg, pluralize_rules[i].repl);
    }
  }
};

var singularize_rules = [
  [/([^v])ies$/i, "$1y"],
  [/ises$/i, "isis"],
  [/ives$/i, "ife"],
  [/(antenn|formul|nebul|vertebr|vit)ae$/i, "$1a"],
  [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, "$1us"],
  [/(buffal|tomat|tornad)(oes)$/i, "$1o"],
  [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, "$1sis"],
  [/(vert|ind|cort)(ices)$/i, "$1ex"],
  [/(matr|append)(ices)$/i, "$1ix"],
  [/(x|ch|ss|sh|s|z|o)es$/i, "$1"],
  [/men$/i, "man"],
  [/(n)ews$/i, "$1ews"],
  [/([ti])a$/i, "$1um"],
  [/([^f])ves$/i, "$1fe"],
  [/([lr])ves$/i, "$1f"],
  [/([^aeiouy]|qu)ies$/i, "$1y"],
  [/(s)eries$/i, "$1eries"],
  [/(m)ovies$/i, "$1ovie"],
  [/([m|l])ice$/i, "$1ouse"],
  [/(cris|ax|test)es$/i, "$1is"],
  [/(alias|status)es$/i, "$1"],
  [/(ss)$/i, "$1"],
  [/(ics)$/i, "$1"],
  [/s$/i, ""]
].map(function(a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});

var singularize = function(str) {
  var low = str.toLowerCase();
  //uncountable
  if (uncountable_nouns[low]) {
    return str;
  }
  //is it already singular?
  if (is_plural(low) === false) {
    return str;
  }
  //irregular
  var found = irregulars.filter(function(r) {
    return r[1] === low;
  });
  if (found[0]) {
    if (titlecase(low) === str) { //handle capitalisation properly
      return titlecase(found[0][0]);
    } else {
      return found[0][0];
    }
  }
  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    var first = str.match(/^([a-z]*) (of|in|by|for) [a-z]/);
    if (first && first[1]) {
      var better_first = singularize(first[1]);
      return better_first + str.replace(first[1], "");
    }
  }
  //regular
  for (i = 0; i < singularize_rules.length; i++) {
    if (str.match(singularize_rules[i].reg)) {
      return str.replace(singularize_rules[i].reg, singularize_rules[i].repl);
    }
  }
  return str;
};

var is_plural = function(str) {
  str = (str || "").toLowerCase();
  //handle 'mayors of chicago'
  var preposition = str.match(/([a-z]*) (of|in|by|for) [a-z]/);
  if (preposition && preposition[1]) {
    str = preposition[1];
  }
  // if it's a known irregular case
  for (i = 0; i < irregulars.length; i++) {
    if (irregulars[i][1] === str) {
      return true;
    }
    if (irregulars[i][0] === str) {
      return false;
    }
  }
  //similar to plural/singularize rules, but not the same
  var plural_indicators = [
    /(^v)ies$/i,
    /ises$/i,
    /ives$/i,
    /(antenn|formul|nebul|vertebr|vit)ae$/i,
    /(octop|vir|radi|nucle|fung|cact|stimul)i$/i,
    /(buffal|tomat|tornad)oes$/i,
    /(analy|ba|diagno|parenthe|progno|synop|the)ses$/i,
    /(vert|ind|cort)ices$/i,
    /(matr|append)ices$/i,
    /(x|ch|ss|sh|s|z|o)es$/i,
    /men$/i,
    /news$/i,
    /.tia$/i,
    /(^f)ves$/i,
    /(lr)ves$/i,
    /(^aeiouy|qu)ies$/i,
    /(m|l)ice$/i,
    /(cris|ax|test)es$/i,
    /(alias|status)es$/i,
    /ics$/i
  ];
  for (i = 0; i < plural_indicators.length; i++) {
    if (str.match(plural_indicators[i])) {
      return true;
    }
  }
  //similar to plural/singularize rules, but not the same
  var singular_indicators = [
    /(ax|test)is$/i,
    /(octop|vir|radi|nucle|fung|cact|stimul)us$/i,
    /(octop|vir)i$/i,
    /(rl)f$/i,
    /(alias|status)$/i,
    /(bu)s$/i,
    /(al|ad|at|er|et|ed|ad)o$/i,
    /(ti)um$/i,
    /(ti)a$/i,
    /sis$/i,
    /(?:(^f)fe|(lr)f)$/i,
    /hive$/i,
    /(^aeiouy|qu)y$/i,
    /(x|ch|ss|sh|z)$/i,
    /(matr|vert|ind|cort)(ix|ex)$/i,
    /(m|l)ouse$/i,
    /(m|l)ice$/i,
    /(antenn|formul|nebul|vertebr|vit)a$/i,
    /.sis$/i,
    /^(?!talis|.*hu)(.*)man$/i
  ];
  for (i = 0; i < singular_indicators.length; i++) {
    if (str.match(singular_indicators[i])) {
      return false;
    }
  }
  // 'looks pretty plural' rules
  if (str.match(/s$/) && !str.match(/ss$/) && str.length > 3) { //needs some lovin'
    return true;
  }
  return false;
};

var inflect = function(str) {
  if (uncountable_nouns[str]) { //uncountables shouldn't ever inflect
    return {
      plural: str,
      singular: str
    };
  }
  if (is_plural(str)) {
    return {
      plural: str,
      singular: singularize(str)
    };
  } else {
    return {
      singular: str,
      plural: pluralize(str)
    };
  }
};

module.exports = {
  inflect: inflect,
  is_plural: is_plural,
  singularize: singularize,
  pluralize: pluralize
};

// console.log(inflect.singularize('kisses')=="kiss")
// console.log(inflect.singularize('kiss')=="kiss")
// console.log(inflect.singularize('children')=="child")
// console.log(inflect.singularize('child')=="child")
// console.log(inflect.pluralize('gas')=="gases")
// console.log(inflect.pluralize('narrative')=="narratives")
// console.log(inflect.singularize('gases')=="gas")
// console.log(inflect.pluralize('video')=="videos")
// console.log(inflect.pluralize('photo')=="photos")
// console.log(inflect.pluralize('stomach')=="stomachs")
// console.log(inflect.pluralize('database')=="databases")
// console.log(inflect.pluralize('kiss')=="kisses")
// console.log(inflect.pluralize('towns')=="towns")
// console.log(inflect.pluralize('mayor of chicago')=="mayors of chicago")
// console.log(inflect.inflect('Index').plural=='Indices')
// console.log(inflect.is_plural('octopus')==false)
// console.log(inflect.is_plural('octopi')==true)
// console.log(inflect.is_plural('eyebrow')==false)
// console.log(inflect.is_plural('eyebrows')==true)
// console.log(inflect.is_plural('child')==false)
// console.log(inflect.is_plural('children')==true)
// console.log(inflect.singularize('mayors of chicago')=="mayor of chicago")
