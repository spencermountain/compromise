/*! nlp_comprimise 
 by @spencermountain
 2014-03-21 */
//
// NLP_comprimise - @spencermountain - gplv3
// https://github.com/spencermountain/nlp_comprimise
//
//
var nlp = (function() {

		///
		// header
		//
var sentences = (function() {
  var main = function(text) {
    var abbrev, abbrevs, clean, i, sentences, tmp;
    tmp = text.split(/(\S.+?[.])(?=\s+|$)/g);
    sentences = [];
    abbrevs = ["jr", "mr", "mrs", "ms", "dr", "prof", "sr", "sen", "rep", "gov", "atty", "supt", "det", "rev", "col", "gen", "lt", "cmdr", "adm", "capt", "sgt", "cpl", "maj", "dept", "univ", "assn", "bros", "inc", "ltd", "co", "corp", "arc", "al", "ave", "blvd", "cl", "ct", "cres", "exp", "rd", "st", "dist", "mt", "ft", "fy", "hwy", "la", "pd", "pl", "plz", "tce", "Ala", "Ariz", "Ark", "Cal", "Calif", "Col", "Colo", "Conn", "Del", "Fed", "Fla", "Ga", "Ida", "Id", "Ill", "Ind", "Ia", "Kan", "Kans", "Ken", "Ky", "La", "Me", "Md", "Mass", "Mich", "Minn", "Miss", "Mo", "Mont", "Neb", "Nebr", "Nev", "Mex", "Okla", "Ok", "Ore", "Penna", "Penn", "Pa", "Dak", "Tenn", "Tex", "Ut", "Vt", "Va", "Wash", "Wis", "Wisc", "Wy", "Wyo", "USAFA", "Alta", "Ont", "QuÔøΩ", "Sask", "Yuk", "jan", "feb", "mar", "apr", "jun", "jul", "aug", "sep", "oct", "nov", "dec", "sept", "vs", "etc", "esp", "llb", "md", "bl", "phd", "ma", "ba", "miss", "misses", "mister", "sir", "esq", "mstr", "lit", "fl", "ex", "eg", "sep", "sept"];
    abbrev = new RegExp("(^| )(" + abbrevs.join("|") + "). ?$", "i");
    for (i in tmp) {
      if (tmp[i]) {
        tmp[i] = tmp[i].replace(/^\s+|\s+$/g, "");
        if (tmp[i].match(abbrev) || tmp[i].match(/[ |\.][a-z]\.?$/i)) {
          tmp[parseInt(i) + 1] = tmp[i] + " " + tmp[parseInt(i) + 1];
        } else {
          sentences.push(tmp[i]);
          tmp[i] = "";
        }
      }
    }
    clean = [];
    for (i in sentences) {
      sentences[i] = sentences[i].replace(/^\s+|\s+$/g, "");
      if (sentences[i]) {
        clean.push(sentences[i]);
      }
    }
    return clean;
  };

  if (typeof module !== "undefined" && module.exports) {
    exports.sentences = main;
  }
  return main
})()

// console.log(sentences('Tony is nice. He lives in Japan.'))
var ngram = (function() {

  var main = function(text, options) {
    options = options || {}
    var min_count = options.min_count || 1; // minimum hit-count
    var max_size = options.max_size || 5; // maximum gram count
    var REallowedChars = /[^a-zA-Z'\-]+/g; //Invalid characters are replaced with a whitespace
    var i, j, k, textlen, len, s;
    var keys = [null];
    var results = [];
    max_size++;
    for (i = 1; i <= max_size; i++) {
      keys.push({});
    }
    // clean the text
    text = text.replace(REallowedChars, " ").replace(/^\s+/, "").replace(/\s+$/, "");
    text = text.toLowerCase()
    // Create a hash
    text = text.split(/\s+/);
    for (i = 0, textlen = text.length; i < textlen; i++) {
      s = text[i];
      keys[1][s] = (keys[1][s] || 0) + 1;
      for (j = 2; j <= max_size; j++) {
        if (i + j <= textlen) {
          s += " " + text[i + j - 1];
          keys[j][s] = (keys[j][s] || 0) + 1;
        } else break;
      }
    }
    // map to array
    for (var k = 1; k <= max_size; k++) {
      results[k] = [];
      var key = keys[k];
      for (var i in key) {
        if (key[i] >= min_count) results[k].push({
          "word": i,
          "count": key[i],
          "size": k
        });
      }
    }
    results = results.filter(function(s) {
      return s != null
    })
    results = results.map(function(r) {
      r = r.sort(function(a, b) {
        return b.count - a.count
      })
      return r;
    });
    return results
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main
})()

// s = ngram("i really think that we all really think it's all good")
// console.log(s)
//built with patterns+exceptions from https://en.wikipedia.org/wiki/British_spelling
// mainly,
// ise <-> ize
// our <-> or
// re <-> er
// ise <-> ice
// xion <-> tion
// logue <-> log
// ae <-> e
// eing -> ing
// illful -> ilful




var britishize = (function() {

	var main = function(str) {

		var patterns = [
			// ise -> ize
			{
				reg: /([^aeiou][iy])z(e|ed|es|ing)?$/,
				repl: '$1s$2',
				exceptions: []
			},
			// our -> or
			// {
			// 	reg: /(..)our(ly|y|ite)?$/,
			// 	repl: '$1or$2',
			// 	exceptions: []
			// },
			// re -> er
			// {
			// 	reg: /([^cdnv])re(s)?$/,
			// 	repl: '$1er$2',
			// 	exceptions: []
			// },
			// xion -> tion
			// {
			// 	reg: /([aeiou])xion([ed])?$/,
			// 	repl: '$1tion$2',
			// 	exceptions: []
			// },
			//logue -> log
			// {
			// 	reg: /logue$/,
			// 	repl: 'log',
			// 	exceptions: []
			// },
			// ae -> e
			// {
			// 	reg: /([o|a])e/,
			// 	repl: 'e',
			// 	exceptions: []
			// },
			//eing -> ing
			// {
			// 	reg: /e(ing|able)$/,
			// 	repl: '$1',
			// 	exceptions: []
			// },
			// illful -> ilful
			{
				reg: /([aeiou]+[^aeiou]+[aeiou]+)l(ful|ment|est|ing|or|er|ed)$/, //must be second-syllable
				repl: '$1ll$2',
				exceptions: []
			},
		]

		for (var i = 0; i < patterns.length; i++) {
			if (str.match(patterns[i].reg)) {
				//check for exceptions
				for (var o in patterns[i].exceptions) {
					if (str.match(patterns[i].exceptions[o])) {
						return str
					}
				}
				return str.replace(patterns[i].reg, patterns[i].repl)
			}
		}


		return str
	}

	if (typeof module !== "undefined" && module.exports) {
		exports.britishize = main;
	}
	return main
})()






/////////////////
//////////
//////////////
var americanize = (function() {

	var main = function(str) {

		var patterns = [
			// ise -> ize
			{
				reg: /([^aeiou][iy])s(e|ed|es|ing)?$/,
				repl: '$1z$2',
				exceptions: []
			},
			// our -> or
			{
				reg: /(..)our(ly|y|ite)?$/,
				repl: '$1or$2',
				exceptions: []
			},
			// re -> er
			{
				reg: /([^cdnv])re(s)?$/,
				repl: '$1er$2',
				exceptions: []
			},
			// xion -> tion
			{
				reg: /([aeiou])xion([ed])?$/,
				repl: '$1tion$2',
				exceptions: []
			},
			//logue -> log
			{
				reg: /logue$/,
				repl: 'log',
				exceptions: []
			},
			// ae -> e
			{
				reg: /([o|a])e/,
				repl: 'e',
				exceptions: []
			},
			//eing -> ing
			{
				reg: /e(ing|able)$/,
				repl: '$1',
				exceptions: []
			},
			// illful -> ilful
			{
				reg: /([aeiou]+[^aeiou]+[aeiou]+)ll(ful|ment|est|ing|or|er|ed)$/, //must be second-syllable
				repl: '$1l$2',
				exceptions: []
			},
		]

		for (var i = 0; i < patterns.length; i++) {
			if (str.match(patterns[i].reg)) {
				//check for exceptions
				for (var o in patterns[i].exceptions) {
					if (str.match(patterns[i].exceptions[o])) {
						return str
					}
				}
				return str.replace(patterns[i].reg, patterns[i].repl)
			}
		}


		return str
	}

	if (typeof module !== "undefined" && module.exports) {
		exports.americanize = main;
	}
	return main
})()


arr = [
	"synthesized"
]
// arr.forEach(function(w) {
// 	console.log(britishize(w))
// })

arr = [
	// "synthesise",
	// "synthesised",
	// "synthesises",
	// "synthesising",
	// "analyse",
	// "analysed",
	// "analysing",

	// "poise",
	// "poised",
	// "colour",
	// "honour",
	// "neighbour",
	// "neighbourly",
	// "savour",
	// "savourly",
	// "favour",
	// "favourite",
	// "theatre",
	// "theatres",

	// "entendre",
	// "genre",
	// "mediocre",
	// "acre",
	// "acres",
	// "analogue",
	// "homologue",
	// "anaemia",
	// "oestrogen",
	// "ageing",
	// "useable",
	// "programme",
	// "tonne",
	// "counsellor",
	// "traveller",

	// "labelled",
	// "cancelled",
	// "quarrelled",

	// "signalling",
	// "modelling",
	// "travelling",

	// "willful",
	// "filling",


]
// arr.forEach(function(w) {
// console.log(americanize(w))
// })
//some regex borrowed from pksunkara/inflect
//https://github.com/pksunkara/inflect/blob/master/lib/defaults.js

var inflect = (function() {
  var irregulars = [
    ['child', 'children'],
    ['person', 'people'],
    ['man', 'men'],
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
    ['child', 'children'],
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
    ['sombrero', 'sombreros'],
  ]

  var uncountables = {
    "aircraft": 1,
    "bass": 1,
    "bison": 1,
    "fowl": 1,
    "halibut": 1,
    "moose": 1,
    "salmon": 1,
    "spacecraft": 1,
    "tuna": 1,
    "trout": 1,
    "advice": 1,
    "help": 1,
    "information": 1,
    "knowledge": 1,
    "trouble": 1,
    "work": 1,
    "enjoyment": 1,
    "fun": 1,
    "recreation": 1,
    "relaxation": 1,
    "meat": 1,
    "rice": 1,
    "bread": 1,
    "cake": 1,
    "coffee": 1,
    "ice": 1,
    "water": 1,
    "oil": 1,
    "grass": 1,
    "hair": 1,
    "fruit": 1,
    "wildlife": 1,
    "equipment": 1,
    "machinery": 1,
    "furniture": 1,
    "mail": 1,
    "luggage": 1,
    "jewelry": 1,
    "clothing": 1,
    "money": 1,
    "mathematics": 1,
    "economics": 1,
    "physics": 1,
    "civics": 1,
    "ethics": 1,
    "mumps": 1,
    "measles": 1,
    "news": 1,
    "tennis": 1,
    "baggage": 1,
    "currency": 1,
    "travel": 1,
    "soap": 1,
    "toothpaste": 1,
    "food": 1,
    "sugar": 1,
    "butter": 1,
    "flour": 1,
    "progress": 1,
    "research": 1,
    "leather": 1,
    "wool": 1,
    "wood": 1,
    "coal": 1,
    "weather": 1,
    "homework": 1,
    "cotton": 1,
    "silk": 1,
    "patience": 1,
    "impatience": 1,
    "talent": 1,
    "energy": 1,
    "experience": 1,
    "vinegar": 1,
    "polish": 1,
    "air": 1,
    "alcohol": 1,
    "anger": 1,
    "art": 1,
    "beef": 1,
    "blood": 1,
    "cash": 1,
    "chaos": 1,
    "cheese": 1,
    "chewing": 1,
    "conduct": 1,
    "confusion": 1,
    "courage": 1,
    "damage": 1,
    "education": 1,
    "electricity": 1,
    "entertainment": 1,
    "fiction": 1,
    "forgiveness": 1,
    "gold": 1,
    "gossip": 1,
    "ground": 1,
    "happiness": 1,
    "history": 1,
    "honey": 1,
    "hope": 1,
    "hospitality": 1,
    "importance": 1,
    "jam": 1,
    "justice": 1,
    "laughter": 1,
    "leisure": 1,
    "lightning": 1,
    "literature": 1,
    "love": 1,
    "luck": 1,
    "melancholy": 1,
    "milk": 1,
    "mist": 1,
    "music": 1,
    "noise": 1,
    "oxygen": 1,
    "paper": 1,
    "pay": 1,
    "peace": 1,
    "peanut": 1,
    "pepper": 1,
    "petrol": 1,
    "plastic": 1,
    "pork": 1,
    "power": 1,
    "pressure": 1,
    "rain": 1,
    "recognition": 1,
    "sadness": 1,
    "safety": 1,
    "salt": 1,
    "sand": 1,
    "scenery": 1,
    "shopping": 1,
    "silver": 1,
    "snow": 1,
    "softness": 1,
    "space": 1,
    "speed": 1,
    "steam": 1,
    "sunshine": 1,
    "tea": 1,
    "thunder": 1,
    "time": 1,
    "traffic": 1,
    "trousers": 1,
    "violence": 1,
    "warmth": 1,
    "washing": 1,
    "wind": 1,
    "wine": 1,
    "steel": 1,
    "soccer": 1,
    "hockey": 1,
    "golf": 1,
    "fish": 1,
    "gum": 1,
    "liquid": 1,
    "series": 1,
    "sheep": 1,
    "species": 1,
  }

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
  }, {
    reg: /(.*)/i,
    repl: '$1s'
  }]


  var pluralize = function(str) {
    var low = str.toLowerCase()
    //uncountable
    if (uncountables[low]) {
      return str
    }
    //irregular
    var found = irregulars.filter(function(r) {
      return r[0] == low
    })
    if (found[0]) {
      if (low == str) {
        return found[0][1]
      } else {
        return found[0][1].charAt(0).toUpperCase() + string.slice(1)
      }
    }
    //regular
    for (var i in pluralize_rules) {
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
    reg: /s$/i,
    repl: ''
  }]


  var singularize = function(str) {
    var low = str.toLowerCase()
    //uncountable
    if (uncountables[low]) {
      return str
    }
    //irregular
    var found = irregulars.filter(function(r) {
      return r[1] == low
    })
    if (found[0]) {
      if (low == str) {
        return found[0][0]
      } else {
        return found[0][0].charAt(0).toUpperCase() + string.slice(1)
      }
    }
    //regular
    for (var i in singularize_rules) {
      if (str.match(singularize_rules[i].reg)) {
        return str.replace(singularize_rules[i].reg, singularize_rules[i].repl)
      }
    }
  }


  var methods = {
    singularize: singularize,
    pluralize: pluralize
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = methods;
  }
  return methods;
})();
var syllables = (function(str) {




	var main = function(str) {
		var all = []


		//suffix fixes
			function postprocess(arr) {
				if (!arr.length <= 2) {
					return arr
				}
				var twos = [
					/[^aeiou]ying$/,
					/yer$/
				]

				var ones = [
					/^[^aeiou]?ion/,
					/^[^aeiou]?ised/,
					/^[^aeiou]?iled/,
				]
				var l = arr.length
				var suffix = arr[l - 2] + arr[l - 1];
				for (var i = 0; i < ones.length; i++) {
					if (suffix.match(ones[i])) {
						arr[l - 2] = arr[l - 2] + arr[l - 1]
						arr.pop()
					}
				}
				return arr
			}

		var doer = function(str) {
			var vow = /[aeiouy]$/
			if (!str) {
				return
			}
			var chars = str.split('')
			var before = "";
			var after = "";
			var current = "";
			for (var i = 0; i < chars.length; i++) {
				before = chars.slice(0, i).join('')
				current = chars[i]
				after = chars.slice(i + 1, chars.length).join('')
				var candidate = before + chars[i]
				// console.log(before + "(" + current + ")" + after)
				//
				//rules for syllables-

				//it's a consonant that comes after a vowel
				if (before.match(vow) && !current.match(vow)) {
					if (after.match(/^e[sm]/)) {
						candidate += "e"
						after = after.replace(/^e/, '')
					}
					all.push(candidate)
					return doer(after)
				}
				//unblended vowels ('noisy' vowel combinations)
				if (candidate.match(/(eo|eu|ia|oa|ua|ui)$/i)) { //'io' is noisy, not in 'ion'
					all.push(before)
					all.push(current)
					return doer(after)
				}

			}
			if (str.match(/[aiouy]/)) { //allow silent trailing e
				all.push(str)
			} else {
				all[all.length - 1] = (all[all.length - 1] || '') + str; //append it to the last one
			}
		}

		str.split(/\s-/).forEach(function(s) {
			doer(s)
		})
		all = postprocess(all)
		return all
	}




	if (typeof module !== "undefined" && module.exports) {
		module.exports = main;
	}
	return main
})()

// var arr = syllables("suddenly")
// var arr = syllables("constipation")
// var arr = syllables("diabolic")
// var arr = syllables("carbonised")
// var arr = syllables("deviled")

// var arr = syllables("sometimes")
// var arr = syllables("imitated")

// var arr = syllables("fate")
// var arr = syllables("fated")
// var arr = syllables("fates")

// var arr = syllables("genetic")
// var arr = syllables("tree")
// var arr = syllables("horse")

// console.log(JSON.stringify(arr, null, 2));
// Generated by CoffeeScript 1.6.3


var adj_to_noun = (function() {

    var main = function(w) {

        var irregulars;
        irregulars = {
            "clean": "cleanliness",
            "naivety": "naivety"
        };
        if (!w) {
            return "";
        }
        if (irregulars[w]) {
            return irregulars[w];
        }
        if (w.match(" ")) {
            return w;
        }
        if (w.match(/w$/)) {
            return w;
        }
        if (w.match(/y$/)) {
            return w.replace(/y$/, 'iness');
        }
        if (w.match(/le$/)) {
            return w.replace(/le$/, 'ility');
        }
        if (w.match(/ial$/)) {
            return w.replace(/ial$/, 'y');
        }
        if (w.match(/al$/)) {
            return w.replace(/al$/, 'ality');
        }
        if (w.match(/ting$/)) {
            return w.replace(/ting$/, 'ting');
        }
        if (w.match(/ring$/)) {
            return w.replace(/ring$/, 'ring');
        }
        if (w.match(/bing$/)) {
            return w.replace(/bing$/, 'bingness');
        }
        if (w.match(/ning$/)) {
            return w.replace(/ning$/, 'ningness');
        }
        if (w.match(/sing$/)) {
            return w.replace(/sing$/, 'se');
        }
        if (w.match(/ing$/)) {
            return w.replace(/ing$/, 'ment');
        }
        if (w.match(/ess$/)) {
            return w.replace(/ess$/, 'essness');
        }
        if (w.match(/ous$/)) {
            return w.replace(/ous$/, 'ousness');
        }
        if (w.match(/s$/)) {
            return w;
        }
        return w + "ness";
    };


    if (typeof module !== "undefined" && module.exports) {
        exports.adj_to_noun = main;
    }
    return main
})()

// console.log(exports.adj_to_noun('mysterious'));
var date_extractor = (function() {

  var date_extractor = function(text) {
    var results = finddate(text);
    return {
      "text": results[0],
      "from": formatdate(results[1]),
      "to": formatdate(results[2])
    }
  }



  //this function returns an array.
  //foundarray[0] is the text that contains the date bit (to highlight),
  //foundarray[1] is the start date
  //foundarray[2] is the end date

    function finddate(text) {
      if (text == null) {
        return '';
      }
      var foundarray = new Array();
      text = text.replace(/ Feb\.? /g, 'February');
      text = text.replace(/ Mar\.? /g, 'March');
      text = text.replace(/ Apr\.? /g, 'April');
      text = text.replace(/ Jun\.? /g, 'June');
      text = text.replace(/ Jul\.? /g, 'july');
      text = text.replace(/ Aug\.? /g, 'august');
      text = text.replace(/ Sep\.? /g, 'september');
      text = text.replace(/ Oct\.? /g, 'october');
      text = text.replace(/ Nov\.? /g, 'november');
      text = text.replace(/ Dec\.? /g, 'december');
      text = text.replace(/\(/g, '( ');
      text = text.replace(/\)/g, ' )');
      //text=text.replace(/./g,'');
      var sentences = text.split(/\. /); //one sentence at a time



      for (var i in sentences) {
        var found;
        sentences[i] = ' ' + sentences[i] + '';
        sentences[i] = sentences[i].replace(/\Bfirst\B/, '1st');
        sentences[i] = sentences[i].replace(/second of /, '2nd of');

        sentences[i] = sentences[i].replace(/second of /, '2nd of');
        sentences[i] = sentences[i].replace(/second of /, '2nd of');
        sentences[i] = sentences[i].replace(/second of /, '2nd of');
        sentences[i] = sentences[i].replace(/second of /, '2nd of');


        //eg March 7th-11th 1987
        var best = /(july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)? ?(\-| to | until | till ) ?[0-9]{1,2}(th|rd|st)?,? [0-9]{4}/i.exec(sentences[i]);
        if (best != null) {
          found = best[0];
          var remove = / ?(-| to | until ) ?[0-9]{1,2}(th|rd|st)?,?/i.exec(found); //remove until date
          foundarray[0] = found;
          foundarray[1] = found.replace(remove[0], '');
          var remove = /[0-9]{1,2}(th|rd|st)?,? ?(-| to | until )/i.exec(found); //remove to date
          foundarray[2] = found.replace(remove[0], '');
          return foundarray;
        }

        //eg '28th of September to 5th of October 2008'
        var best = /[0-9]{1,2}(th|rd|st)? (of )?(july|august|september|october|november|december|january|february|march|april|may|june),? ?(-| to | until | till ) ?[0-9]{1,2}(th|rd|st)? (of )?(july|august|september|october|november|december|january|february|march|april|may|june),? [0-9]{4}/i.exec(sentences[i]);
        if (best != null) {
          var found = best[0];
          foundarray[0] = found;
          var remove = /(-| to | until | till ) ?[0-9]{1,2}(th|rd|st)? (of )?(july|august|september|october|november|december|january|february|march|april|may|june),?/i.exec(found); //remove until date
          var tfound = found.replace(remove[0], '');
          tfound = tfound.replace(/( of | to | until | till |-)/, ' ');
          foundarray[1] = tfound.replace(remove[0], '');
          //to date
          var remove = /[0-9]{1,2}(th|rd|st)? (of )?(july|august|september|october|november|december|january|february|march|april|may|june),? ?(-| to | until | till )/i.exec(found); //remove from date
          var tfound = found.replace(remove[0], '');
          tfound = tfound.replace(/( of | to | until | till |-)/, ' ');
          foundarray[2] = tfound.replace(remove[0], '');
          return foundarray;
        }


        //eg March 7th to june 11th 1987
        var best = /(july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)? ?(-| to | until | till ) ?(july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)?( |, )[0-9]{4}/i.exec(sentences[i]);
        // var best = /(july|august|september|october|november|december|january|february|march|april|may|june) [0-9]{1,2} to (july|august|september|october|november|december|january|february|march|april|may|june) [0-9]{1,2} [0-9]{4}/i.exec(text);
        if (best != null) {
          found = best[0];
          var remove = / ?(-| to | until | till ) ?(july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)?,?/i.exec(found); //remove until date
          foundarray[0] = found;
          foundarray[1] = found.replace(remove[0], '');
          var end = found.replace(/(july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)? ?(-| to | until | till ) ?/i, '');
          foundarray[2] = end;
          return foundarray;
        }

        //eg between 13 February and 15 February 1945
        var best = /(through|throughout|during|within|between) [0-9]{1,2}(th|rd|st)? (july|august|september|october|november|december|january|february|march|april|may|june),? ?(-| to | until | till | and ) ?[0-9]{1,2}(th|rd|st)? (july|august|september|october|november|december|january|february|march|april|may|june),? [0-9]{4}/i.exec(sentences[i]);
        // var best = /(july|august|september|october|november|december|january|february|march|april|may|june) [0-9]{1,2} to (july|august|september|october|november|december|january|february|march|april|may|june) [0-9]{1,2} [0-9]{4}/i.exec(text);
        if (best != null) {
          found = best[0];
          // console.log("*"+best);
          var end = /[0-9]{1,2}(th|rd|st)? (july|august|september|october|november|december|january|february|march|april|may|june),? [0-9]{4}/i.exec(found); //grab end date
          var start = found.replace(/(through|throughout|during|within|between) /i, '');
          start = start.replace(/,? ?(-| to | until | till | and ) ?[0-9]{1,2}(th|rd|st)? (july|august|september|october|november|december|january|february|march|april|may|june),?/i, '');

          foundarray[0] = found;
          foundarray[1] = start;
          foundarray[2] = end[0];
          //console.log(foundarray[1]);
          return foundarray;
        }

        //eg between March 7th and june 11th 1987
        var best = /between (july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)? ?(-| and ) ?(july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)?( |, )[0-9]{4}/i.exec(sentences[i]);
        // var best = /(july|august|september|october|november|december|january|february|march|april|may|june) [0-9]{1,2} to (july|august|september|october|november|december|january|february|march|april|may|june) [0-9]{1,2} [0-9]{4}/i.exec(text);
        if (best != null) {
          found = best[0];
          foundarray[0] = found;
          var remove = / ?(-| and ) ?(july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)?,?/i.exec(found); //remove until date
          foundarray[1] = found.replace(remove[0], '');
          foundarray[1] = foundarray[1].replace('between', '');
          //to date
          var remove = /between (july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)? ?(-| and ) ?/i.exec(found); //remove from date
          foundarray[2] = found.replace(remove[0], '');
          foundarray[2] = foundarray[2].replace('between', '');
          return foundarray;
        }


        //eg March 1st 1987
        var best = /(july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)?( |, |,)[0-9]{4}/i.exec(sentences[i]);
        if (best != null) {
          found = best[0];
          foundarray[0] = found;
          foundarray[1] = found
          return foundarray;
        }

        //eg 3rd - 5th of March 1969
        if (found == null) {
          var second = /[0-9]{1,2}(th|rd|st)? ?( to |-| until |\/) ?[0-9]{1,2}(th|rd|st)? (of )?(july|august|september|october|november|december|january|february|march|april|may|june)( |, |,)[0-9]{4}/i.exec(sentences[i]);
          if (second != null) {
            found = second[0];
            foundarray[0] = found;
            var start = found.replace(/(th|rd|st)? ?( to |-| until |\/) ?[0-9]{1,2}(th|rd|st)?( of)?/i, '');
            var end = found.replace(/[0-9]{1,2}(th|rd|st)? ?( to |-| until |\/) ?/i, '');
            start = start.replace('of', '');
            end = end.replace('of', '');
            foundarray[1] = start;
            foundarray[2] = end;
            return foundarray;
          }
        }
        //eg 3rd of March 1969
        if (found == null) {
          var second = /[0-9]{1,2}(th|rd|st)? ?(of )?(july|august|september|october|november|december|january|february|march|april|may|june)( |, |,)[0-9]{4}/i.exec(sentences[i]);
          if (second != null) {
            found = second[0];
            foundarray[0] = found;
            foundarray[1] = found
            return foundarray;
          }
        }
        //eg September 1939 to April 1945
        if (found == null) {
          var third = /(july|august|september|october|november|december|january|february|march|april|may|june)( |, |,)(of )?[0-9]{4,4} ?( to |-| until ) ?(july|august|september|october|november|december|january|february|march|april|may|june)( |, |,)(of )?[0-9]{4,4}/i.exec(sentences[i]); //
          if (third != null) {
            var start = third[0].replace(/ (to|-|until) (july|august|september|october|november|december|january|february|march|april|may|june)( |, |,)(of )?[0-9]{4,4}/i, '');
            var end = third[0].replace(/(july|august|september|october|november|december|january|february|march|april|may|june)( |, |,)(of )?[0-9]{4,4} (to|-|until) /i, '');
            found = third[0];
            foundarray[0] = found;
            foundarray[1] = start;
            foundarray[2] = end;
            return foundarray;
          }
        }

        //eg March 1969
        if (found == null) {
          var third = /(july|august|september|october|november|december|january|february|march|april|may|june)( |, |,)(of )?[0-9]{4,4}/i.exec(sentences[i]); //
          if (third != null) {
            found = third[0];
            foundarray[0] = found;
            foundarray[1] = found
            return foundarray;
          }
        }

        //eg 400 - 600 BC
        if (found == null) {
          var year = / ([0-9]{3,4} ?- ?[0-9]{2,4} ?(BC.|B.C.|BC ))/i.exec(sentences[i]);
          if (year != null) {
            found = year[1];
            found = found.replace(/ ?- ?[0-9]{2,4}/, '');
            foundarray[0] = found;
            foundarray[1] = found.replace(/(BC.|B.C.|BC |BCE.|B.C.E.|BCE )/, 'B.C.')
            return foundarray;
          }
        }

        //eg 1997-1998
        if (found == null) {
          var year = / [0-9]{4,4} ?(-|–| to | until ) ?'?[0-9]{4,4}/i.exec(sentences[i]);
          if (year != null) {
            found = year[0];
            foundarray[0] = found;
            var tfound = found.replace(/ ?- ?'?[0-9]{4,4}/, '');
            if (tfound != null && tfound < 2020) {
              foundarray[1] = tfound

              var remove = /[0-9]{4} ?- ?/i.exec(found); //remove from date
              foundarray[2] = found.replace(remove[0], '');

              return foundarray;
            }
          }
        }
        //eg 1997-98
        if (found == null) {
          var year = / [0-9]{4,4} ?(-|–| to | until ) ?'?[0-9]{2,2}/i.exec(sentences[i]);
          if (year != null) {
            found = year[0];
            foundarray[0] = found;
            var tfound = found.replace(/ ?- ?'?[0-9]{2,2}/, '');
            if (tfound != null && tfound < 2020) {
              foundarray[1] = tfound

              var remove = /[0-9]{2} ?- ?/i.exec(found); //remove from date
              foundarray[2] = found.replace(remove[0], '');

              return foundarray;
            }
          }
        }



        //eg 400 BC
        if (found == null) {
          var year = / ([0-9]{3,4} (BC.|B.C.|BC ))/i.exec(sentences[i]);
          if (year != null) {
            found = year[1];
            foundarray[0] = found;
            foundarray[1] = found.replace(/(BC.|B.C.|BC |BCE.|B.C.E.|BCE )/, 'B.C.')
            return foundarray;
          }
        }


        //matches year
        if (found == null) {
          var year = / [0-9]{4,4}/i.exec(sentences[i]);
          if (year != null && year < 2020) {
            found = year[0];
            foundarray[0] = found;
            foundarray[1] = found
            return foundarray;
          }
        }

        if (found != null) {
          break;
        }

      } //for senetences

      return foundarray;

    }


    //begin processing date to be mql-friendly

    //var str=formatdate('July 2, 1934'); acre.write(str);

    function formatdate(found) {
      if (!found) {
        return {};
      }
      found = found.replace('of ', '');
      found = found.replace('the ', '');
      found = found.replace('th ', ' ');
      found = found.replace('rd ', ' ');
      found = found.replace('1st ', '01');

      var month = /july|august|september|october|november|december|january|february|march|april|may|june/i.exec(found);
      month = '' + month;
      month = month.toLowerCase();
      var monthnum = 0;

      if (month == 'january') {
        monthnum = '01';
      }
      if (month == 'february') {
        monthnum = '02';
      }
      if (month == 'march') {
        monthnum = '03';
      }
      if (month == 'april') {
        monthnum = '04';
      }
      if (month == 'may') {
        monthnum = '05';
      }
      if (month == 'june') {
        monthnum = '06';
      }
      if (month == 'july') {
        monthnum = '07';
      }
      if (month == 'august') {
        monthnum = '08';
      }
      if (month == 'september') {
        monthnum = '09';
      }
      if (month == 'october') {
        monthnum = '10';
      }
      if (month == 'november') {
        monthnum = '11';
      }
      if (month == 'december') {
        monthnum = '12';
      }

      if (found.match('B.C.')) {
        var year = /[0-9]{3,4}/i.exec(found);
        year = year + '';
        if (year.length == 3) {
          year = '0' + year;
        }
        if (year.length == 2) {
          year = '00' + year;
        }
        year = '-' + year;
        return year;
      } //something bc
      else {
        var year = /[0-9]{4}/i.exec(found);
      } //normal years
      year = '' + year;
      found = found.replace(year, '');
      var date = /[0-9]{1,2}/i.exec(found);

      if (date != null) {
        if (date < 10) {
          date = '0' + date;
        } //turn 1 into 01
      }

      return {
        "year": year,
        "month": monthnum,
        "day": date
      };
    }



    //console.log(exports.date_extractor('my wife left me on the 9th of april, 2005. now i just programz the computerz.'));

    // export for AMD / RequireJS
  if (typeof define !== 'undefined' && define.amd) {
    define([], function() {
      return date_extractor;
    });
  }
  // export for Node.js
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = date_extractor;
  }

  return date_extractor;


})()
///
//footer
//
var main = {
	sentences: sentences,
	ngram: ngram,
	americanize: americanize,
	britishize: britishize,
	singularize: inflect.singularize,
	pluralize: inflect.pluralize,
	syllables: syllables,
	adj_to_noun: adj_to_noun,
	dates: date_extractor,
	// tag: tag,
	// spot: spot,
	// tests: tests,
}

if (typeof module !== "undefined" && module.exports) {
	exports.npm = main;
}
return main
})()