//converts nouns from plural and singular, and viceversases
//some regex borrowed from pksunkara/inflect
//https://github.com/pksunkara/inflect/blob/master/lib/defaults.js

var inflect = (function() {

  if (typeof module !== "undefined" && module.exports) {
    uncountables = require("../../../data/lexicon/uncountables")
  }
  //words that shouldn't ever inflect, for metaphysical reasons
  uncountable_nouns = uncountables.reduce(function(h, a) {
    h[a] = true
    return h
  }, {})

  var titlecase = function(str) {
    if (!str) {
      return ''
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  var irregulars = [
    ['child', 'children'],
    ['person', 'people'],
    ['leaf', 'leaves'],
    ['database', 'databases'],
    ['quiz', 'quizzes'],
    ['child', 'children'],
    ['stomach', 'stomachs'],
    ['sex', 'sexes'],
    ['move', 'moves'],
    ['shoe', 'shoes'],
    ["goose", "geese"],
    ["phenomenon", "phenomena"],
    ['barracks', 'barracks'],
    ['deer', 'deer'],
    ['syllabus', 'syllabi'],
    ['index', 'indices'],
    ['appendix', 'appendices'],
    ['criterion', 'criteria'],
    ['i', 'we'],
    ['person', 'people'],
    ['man', 'men'],
    ['move', 'moves'],
    ['she', 'they'],
    ['he', 'they'],
    ['myself', 'ourselves'],
    ['yourself', 'yourselves'],
    ['himself', 'themselves'],
    ['herself', 'themselves'],
    ['themself', 'themselves'],
    ['mine', 'ours'],
    ['hers', 'theirs'],
    ['his', 'theirs'],
    ['its', 'theirs'],
    ['theirs', 'theirs'],
    ['sex', 'sexes'],
    ['photo', 'photos'],
    ['video', 'videos'],
    ['narrative', 'narratives'],
    ['rodeo', 'rodeos'],
    ['gas', 'gases'],
    ['epoch', 'epochs'],
    ['zero', 'zeros'],
    ['avocado', 'avocados'],
    ['halo', 'halos'],
    ['tornado', 'tornados'],
    ['tuxedo', 'tuxedos'],
    ['sombrero', 'sombreros']
  ]

  var pluralize_rules = [
    [/(ax|test)is$/i, '$1es'],
    [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, '$1i'],
    [/(octop|vir)i$/i, '$1i'],
    [/([rl])f$/i, '$1ves'],
    [/(alias|status)$/i, '$1es'],
    [/(bu)s$/i, '$1ses'],
    [/(al|ad|at|er|et|ed|ad)o$/i, '$1oes'],
    [/([ti])um$/i, '$1a'],
    [/([ti])a$/i, '$1a'],
    [/sis$/i, 'ses'],
    [/(?:([^f])fe|([lr])f)$/i, '$1ves'],
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
    }
  })

  var pluralize = function(str) {
    var low = str.toLowerCase()
      //uncountable
    if (uncountable_nouns[low]) {
      return str
    }
    //irregular
    var found = irregulars.filter(function(r) {
      return r[0] === low
    })
    if (found[0]) {
      if (titlecase(low) === str) { //handle capitalisation properly
        return titlecase(found[0][1])
      } else {
        return found[0][1]
      }
    }
    //inflect first word of preposition-phrase
    if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
      var first = (str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1]
      if (first) {
        var better_first = pluralize(first)
        return better_first + str.replace(first, '')
      }
    }
    //regular
    for (var i = 0; i < pluralize_rules.length; i++) {
      if (str.match(pluralize_rules[i].reg)) {
        return str.replace(pluralize_rules[i].reg, pluralize_rules[i].repl)
      }
    }
  }

  var singularize_rules = [
    [/([^v])ies$/i, '$1y'],
    [/ises$/i, 'isis'],
    [/ives$/i, 'ife'],
    [/(antenn|formul|nebul|vertebr|vit)ae$/i, '$1a'],
    [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, '$1us'],
    [/(buffal|tomat|tornad)(oes)$/i, '$1o'],
    [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1sis'],
    [/(vert|ind|cort)(ices)$/i, '$1ex'],
    [/(matr|append)(ices)$/i, '$1ix'],
    [/(x|ch|ss|sh|s|z|o)es$/i, '$1'],
    [/men$/i, 'man'],
    [/(n)ews$/i, '$1ews'],
    [/([ti])a$/i, '$1um'],
    [/([^f])ves$/i, '$1fe'],
    [/([lr])ves$/i, '$1f'],
    [/([^aeiouy]|qu)ies$/i, '$1y'],
    [/(s)eries$/i, '$1eries'],
    [/(m)ovies$/i, '$1ovie'],
    [/([m|l])ice$/i, '$1ouse'],
    [/(cris|ax|test)es$/i, '$1is'],
    [/(alias|status)es$/i, '$1'],
    [/(ss)$/i, '$1'],
    [/(ics)$/i, "$1"],
    [/s$/i, '']
  ].map(function(a) {
    return {
      reg: a[0],
      repl: a[1]
    }
  })

  var singularize = function(str) {
    var low = str.toLowerCase()
      //uncountable
    if (uncountable_nouns[low]) {
      return str
    }
    //irregular
    var found = irregulars.filter(function(r) {
      return r[1] === low
    })
    if (found[0]) {
      if (titlecase(low) === str) { //handle capitalisation properly
        return titlecase(found[0][0])
      } else {
        return found[0][0]
      }
    }
    //inflect first word of preposition-phrase
    if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
      var first = str.match(/^([a-z]*) (of|in|by|for) [a-z]/)
      if (first && first[1]) {
        var better_first = singularize(first[1])
        return better_first + str.replace(first[1], '')
      }
    }
    //regular
    for (var i = 0; i < singularize_rules.length; i++) {
      if (str.match(singularize_rules[i].reg)) {
        return str.replace(singularize_rules[i].reg, singularize_rules[i].repl)
      }
    }
    return str
  }

  var is_plural = function(str) {
    // if it's a known verb
    for (var i = 0; i < irregulars.length; i++) {
      if (irregulars[i][1] === str) {
        return true
      }
      if (irregulars[i][0] === str) {
        return false
      }
    }
    //if it's a known irregular singular
    for (var i = 0; i < pluralize_rules.length; i++) {
      if (str.match(pluralize_rules[i].reg)) {
        return false
      }
    }
    // if it changes when singularized
    if (singularize(str) != str) {
      return true
    }
    // 'looks pretty plural' rules
    if (str.match(/s$/) && !str.match(/ss$/) && str.length > 3) { //needs some lovin'
      return true
    }
    return false
  }

  var inflect = function(str) {
    if (uncountable_nouns[str]) { //uncountables shouldn't ever inflect
      return {
        plural: str,
        singular: str
      }
    }
    if (is_plural(str)) {
      return {
        plural: str,
        singular: singularize(str)
      }
    } else {
      return {
        singular: str,
        plural: pluralize(str)
      }
    }
  }

  var methods = {
    inflect: inflect,
    is_plural: is_plural,
    singularize: singularize,
    pluralize: pluralize
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = methods;
  }
  return methods;
})();

// console.log(inflect.singularize('kisses')=="kiss")
// console.log(inflect.singularize('mayors of chicago')=="mayor of chicago")
// console.log(inflect.pluralize('kiss')=="kisses")
// console.log(inflect.pluralize('mayor of chicago')=="mayors of chicago")
// console.log(inflect.inflect('Index').plural=='Indices')
