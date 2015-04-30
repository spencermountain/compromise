//converts nouns from plural and singular, and viceversases
//some regex borrowed from pksunkara/inflect
//https://github.com/pksunkara/inflect/blob/master/lib/defaults.js

var inflect = (function() {

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
    //words that shouldn't ever inflect, for metaphysical reasons
  var uncountables = [
    "aircraft",
    "bass",
    "bison",
    "fowl",
    "halibut",
    "moose",
    "salmon",
    "spacecraft",
    "tuna",
    "trout",
    "advice",
    "help",
    "information",
    "knowledge",
    "trouble",
    "work",
    "enjoyment",
    "fun",
    "recreation",
    "relaxation",
    "meat",
    "rice",
    "bread",
    "cake",
    "coffee",
    "ice",
    "water",
    "oil",
    "grass",
    "hair",
    "fruit",
    "wildlife",
    "equipment",
    "machinery",
    "furniture",
    "mail",
    "luggage",
    "jewelry",
    "clothing",
    "money",
    "mathematics",
    "economics",
    "physics",
    "civics",
    "ethics",
    "gymnastics",
    "mumps",
    "measles",
    "news",
    "tennis",
    "baggage",
    "currency",
    "travel",
    "soap",
    "toothpaste",
    "food",
    "sugar",
    "butter",
    "flour",
    "progress",
    "research",
    "leather",
    "wool",
    "wood",
    "coal",
    "weather",
    "homework",
    "cotton",
    "silk",
    "patience",
    "impatience",
    "talent",
    "energy",
    "experience",
    "vinegar",
    "polish",
    "air",
    "alcohol",
    "anger",
    "art",
    "beef",
    "blood",
    "cash",
    "chaos",
    "cheese",
    "chewing",
    "conduct",
    "confusion",
    "courage",
    "damage",
    "education",
    "electricity",
    "entertainment",
    "fiction",
    "forgiveness",
    "gold",
    "gossip",
    "ground",
    "happiness",
    "history",
    "honey",
    "hope",
    "hospitality",
    "importance",
    "jam",
    "justice",
    "laughter",
    "leisure",
    "lightning",
    "literature",
    "love",
    "luck",
    "melancholy",
    "milk",
    "mist",
    "music",
    "noise",
    "oxygen",
    "paper",
    "pay",
    "peace",
    "peanut",
    "pepper",
    "petrol",
    "plastic",
    "pork",
    "power",
    "pressure",
    "rain",
    "recognition",
    "sadness",
    "safety",
    "salt",
    "sand",
    "scenery",
    "shopping",
    "silver",
    "snow",
    "softness",
    "space",
    "speed",
    "steam",
    "sunshine",
    "tea",
    "thunder",
    "time",
    "traffic",
    "trousers",
    "violence",
    "warmth",
    "washing",
    "wind",
    "wine",
    "steel",
    "soccer",
    "hockey",
    "golf",
    "fish",
    "gum",
    "liquid",
    "series",
    "sheep",
    "species",
    "fahrenheit",
    "celcius",
    "kelvin",
    "hertz"
  ].reduce(function(h,a){
    h[a]=true
    return h
  },{})

  var pluralize_rules = [{
      reg: /(ax|test)is$/i,
      repl: '$1es'
    }, {
      reg: /(octop|vir|radi|nucle|fung|cact|stimul)us$/i,
      repl: '$1i'
    }, {
      reg: /(octop|vir)i$/i,
      repl: '$1i'
    }, {
      reg: /([rl])f$/i,
      repl: '$1ves'
    }, {
      reg: /(alias|status)$/i,
      repl: '$1es'
    }, {
      reg: /(bu)s$/i,
      repl: '$1ses'
    }, {
      reg: /(al|ad|at|er|et|ed|ad)o$/i,
      repl: '$1oes'
    }, {
      reg: /([ti])um$/i,
      repl: '$1a'
    }, {
      reg: /([ti])a$/i,
      repl: '$1a'
    }, {
      reg: /sis$/i,
      repl: 'ses'
    }, {
      reg: /(?:([^f])fe|([lr])f)$/i,
      repl: '$1ves'
    }, {
      reg: /(hive)$/i,
      repl: '$1s'
    }, {
      reg: /([^aeiouy]|qu)y$/i,
      repl: '$1ies'
    }, {
      reg: /(x|ch|ss|sh|s|z)$/i,
      repl: '$1es'
    }, {
      reg: /(matr|vert|ind|cort)(ix|ex)$/i,
      repl: '$1ices'
    }, {
      reg: /([m|l])ouse$/i,
      repl: '$1ice'
    }, {
      reg: /([m|l])ice$/i,
      repl: '$1ice'
    }, {
      reg: /^(ox)$/i,
      repl: '$1en'
    }, {
      reg: /^(oxen)$/i,
      repl: '$1'
    }, {
      reg: /(quiz)$/i,
      repl: '$1zes'
    }, {
      reg: /(antenn|formul|nebul|vertebr|vit)a$/i,
      repl: '$1ae'
    }, {
      reg: /(sis)$/i,
      repl: 'ses'
    }, {
      reg: /^(?!talis|.*hu)(.*)man$/i,
      repl: '$1men'
    },
    //fallback, add an s
    {
      reg: /(.*)/i,
      repl: '$1s'
    }

  ]

  var pluralize = function(str) {
    var low = str.toLowerCase()
      //uncountable
    if (uncountables[low]) {
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

  var singularize_rules = [{
      reg: /([^v])ies$/i,
      repl: '$1y'
    }, {
      reg: /ises$/i,
      repl: 'isis'
    }, {
      reg: /ives$/i,
      repl: 'ife'
    }, {
      reg: /(antenn|formul|nebul|vertebr|vit)ae$/i,
      repl: '$1a'
    }, {
      reg: /(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i,
      repl: '$1us'
    }, {
      reg: /(buffal|tomat|tornad)(oes)$/i,
      repl: '$1o'
    }, {
      reg: /((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i,
      repl: '$1sis'
    }, {
      reg: /(vert|ind|cort)(ices)$/i,
      repl: '$1ex'
    }, {
      reg: /(matr|append)(ices)$/i,
      repl: '$1ix'
    }, {
      reg: /(x|ch|ss|sh|s|z|o)es$/i,
      repl: '$1'
    }, {
      reg: /men$/i,
      repl: 'man'
    }, {
      reg: /(n)ews$/i,
      repl: '$1ews'
    }, {
      reg: /([ti])a$/i,
      repl: '$1um'
    }, {
      reg: /([^f])ves$/i,
      repl: '$1fe'
    }, {
      reg: /([lr])ves$/i,
      repl: '$1f'
    }, {
      reg: /([^aeiouy]|qu)ies$/i,
      repl: '$1y'
    }, {
      reg: /(s)eries$/i,
      repl: '$1eries'
    }, {
      reg: /(m)ovies$/i,
      repl: '$1ovie'
    }, {
      reg: /([m|l])ice$/i,
      repl: '$1ouse'
    }, {
      reg: /(cris|ax|test)es$/i,
      repl: '$1is'
    }, {
      reg: /(alias|status)es$/i,
      repl: '$1'
    }, {
      reg: /(ss)$/i,
      repl: '$1'
    }, {
      reg: /(ics)$/i,
      repl: "$1"
    },
    //fallback, remove last s
    {
      reg: /s$/i,
      repl: ''
    }
  ]

  var singularize = function(str) {
    var low = str.toLowerCase()
      //uncountable
    if (uncountables[low]) {
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
    //if it's a known verb
    for (var i = 0; i < irregulars.length; i++) {
      if (irregulars[i][1] === str) {
        return true
      }
      if (irregulars[i][0] === str) {
        return false
      }
    }
    //if it changes when singularized
    if (singularize(str) != str) {
      return true
    }
    //'looks pretty plural' rules
    if (str.match(/s$/) && !str.match(/ss$/) && str.length > 3) { //needs some lovin'
      return true
    }
    return false
  }

  var inflect = function(str) {
    if (uncountables[str]) { //uncountables shouldn't ever inflect
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

// console.log(inflect.pluralize('kiss'))
// console.log(inflect.pluralize('mayor of chicago'))
// console.log(inflect.inflect('Index').plural=='Indices')
