/*! nlp_compromise  0.3.10  by @spencermountain 2015-05-01  MIT */
var nlp = (function() {
//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2015 MIT
var sentence_parser = function(text) {
  var sentences = [];
  //first do a greedy-split..
  var chunks = text.split(/(\S.+?[.\?!])(?=\s+|$|")/g);
  //honourifics
  var abbrevs = ["jr", "mr", "mrs", "ms", "dr", "prof", "sr", "sen", "corp", "rep", "gov", "atty", "supt", "det", "rev", "col", "gen", "lt", "cmdr", "adm", "capt", "sgt", "cpl", "maj", "miss", "misses", "mister", "sir", "esq", "mstr", "phd", "adj", "adv", "asst", "bldg", "brig", "comdr", "hon", "messrs", "mlle", "mme", "op", "ord", "pvt", "reps", "res", "sens", "sfc", "surg"];
  //common abbreviations
  abbrevs = abbrevs.concat(["arc", "al", "ave", "blvd", "cl", "ct", "cres", "exp", "rd", "st", "dist", "mt", "ft", "fy", "hwy", "la", "pd", "pl", "plz", "tce", "vs", "etc", "esp", "llb", "md", "bl", "ma", "ba", "lit", "fl", "ex", "eg", "ie"]);
  //place abbrevs
  abbrevs = abbrevs.concat(["ala", "ariz", "ark", "cal", "calif", "col", "colo", "conn", "del", "fed", "fla", "ga", "ida", "id", "ill", "ind", "ia", "kan", "kans", "ken", "ky", "la", "me", "md", "mass", "mich", "minn", "miss", "mo", "mont", "neb", "nebr", "nev", "mex", "okla", "ok", "ore", "penna", "penn", "pa", "dak", "tenn", "tex", "ut", "vt", "va", "wash", "wis", "wisc", "wy", "wyo", "usafa", "alta", "ont", "que", "sask", "yuk"]);
  //date abbrevs
  abbrevs = abbrevs.concat(["jan", "feb", "mar", "apr", "jun", "jul", "aug", "sep", "oct", "nov", "dec", "sept", "sep"]);
  //org abbrevs
  abbrevs = abbrevs.concat(["dept", "univ", "assn", "bros", "inc", "ltd", "co", "corp"]);
  //proper nouns with exclamation marks
  abbrevs = abbrevs.concat(["yahoo", "joomla", "jeopardy"]);

  //detection of non-sentence chunks
  var abbrev_reg = new RegExp("(^| )(" + abbrevs.join("|") + ")[.!?] ?$", "i");
  var acronym_reg= new RegExp("[ |\.][A-Z]\.?$", "i")
  var elipses_reg= new RegExp("\\.\\.\\.*$")

  //loop through these chunks, and join the non-sentence chunks back together..
  var chunks_length = chunks.length;
  for (i = 0; i < chunks_length; i++) {
    if (chunks[i]) {
      //trim whitespace
      chunks[i] = chunks[i].replace(/^\s+|\s+$/g, "");
      //should this chunk be combined with the next one?
      if (chunks[i+1] && chunks[i].match(abbrev_reg) || chunks[i].match(acronym_reg) || chunks[i].match(elipses_reg) ) {
          chunks[i + 1] = ((chunks[i]||'') + " " + (chunks[i + 1]||'')).replace(/ +/g, " ");
      } else if(chunks[i] && chunks[i].length>0){ //this chunk is a proper sentence..
          sentences.push(chunks[i]);
          chunks[i] = "";
      }
    }
  }
  //if we never got a sentence, return the given text
  if (sentences.length === 0) {
    return [text]
  }

  return sentences;
}
if (typeof module !== "undefined" && module.exports) {
  exports.sentences = sentence_parser;
}

// console.log(sentence_parser('Tony is nice. He lives in Japan.').length === 2)
// console.log(sentence_parser('I like that Color').length === 1)
// console.log(sentence_parser("She was dead. He was ill.").length === 2)
// console.log(sentence_parser("i think it is good ... or else.").length == 1)

//split a string into all possible parts
var ngram = (function() {

  var main = function(text, options) {
    options = options || {}
    var min_count = options.min_count || 1; // minimum hit-count
    var max_size = options.max_size || 5; // maximum gram count
    var REallowedChars = /[^a-zA-Z'\-]+/g; //Invalid characters are replaced with a whitespace
    var i, j, k, textlen, s;
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
        } else {
          break
        }
      }
    }
    // map to array
    i=undefined;
    for (k = 1; k <= max_size; k++) {
      results[k] = [];
      var key = keys[k];
      for (i in key) {
        if(key.hasOwnProperty(i) && key[i] >= min_count){
          results[k].push({
            "word": i,
            "count": key[i],
            "size": k
          })
        }
      }
    }
    results = results.filter(function(s) {
      return s !== null
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
    exports.ngram = main;
  }
  return main
})()

// s = ngram("i really think that we all really think it's all good")
// console.log(s)

//split a string into 'words', as intended to be helpful for this library.
var tokenize = (function() {

  if (typeof module !== "undefined" && module.exports) {
    sentence_parser = require("./sentence").sentences
  }

  //these expressions ought to be one token, not two, because they are a distinct POS together
  var multiples = [
    "of course",
    "at least",
    "no longer",
    "sort of",
    "at first",
    "once again",
    "up to",
    "once more",
    "by now",
    "all but",
    "just about",
    "as yet",
    "on board",
    "a lot",
    "by far",
    "at best",
    "at large",
    "for good",
    "vice versa",
    "en route",
    "for sure",
    "upside down",
    "at most",
    "per se",
    "up front",
    "in situ",
    "in vitro",
    "at worst",
    "prima facie",
    "upwards of",
    "en masse",
    "a priori",
    "ad hoc",
    "et cetera",
    "de facto",
    "off guard",
    "spot on",
    "ipso facto",
    "ad infinitum",
    "point blank",
    "ad nauseam",
    "inside out",
    "not withstanding",
    "for keeps",
    "de jure",
    "a la",
    "sub judice",
    "post hoc",
    "ad hominem",
    "a posteriori",
    "fed up",
    "brand new",
    "old fashioned",
    "bona fide",
    "well off",
    "far off",
    "par excellence",
    "straight forward",
    "hard up",
    "sui generis",
    "en suite",
    "avant garde",
    "sans serif",
    "gung ho",
    "super duper",
    "de trop",
    "new york",
    "new england",
    "new hampshire",
    "new delhi",
    "new jersey",
    "new mexico",
    "united states",
    "united kingdom",
    "great britain",
    "zero sum"
  ].map(function(m) {
    return m.split(' ')
  })

  var normalise = function(str) {
    if (!str) {
      return ""
    }
    str = str.toLowerCase()
    str = str.replace(/[,\.!:;\?\(\)]/, '')
    str = str.replace(/’/g, "'")
    str = str.replace(/"/g, "")
    if (!str.match(/[a-z0-9]/i)) {
      return ''
    }
    return str
  }

  var sentence_type = function(sentence) {
    if (sentence.match(/\?$/)) {
      return "interrogative";
    } else if (sentence.match(/\!$/)) {
      return "exclamative";
    } else {
      return "declarative";
    }
  }

  var combine_multiples = function(arr) {
    var better = []
    for (var i = 0; i < arr.length; i++) {
      for (var o = 0; o < multiples.length; o++) {
        if (arr[i + 1] && normalise(arr[i]) === multiples[o][0] && normalise(arr[i + 1]) === multiples[o][1]) { //
          //we have a match
          arr[i] = arr[i] + ' ' + arr[i + 1]
          arr[i + 1] = null
          break
        }
      }
      better.push(arr[i])
    }
    return better.filter(function(w) {
      return w
    })
  }

  var main = function(str) {
    var sentences = sentence_parser(str)
    return sentences.map(function(sentence) {
      var arr = sentence.split(' ');
      arr = combine_multiples(arr)
      var tokens = arr.map(function(w, i) {
        return {
          text: w,
          normalised: normalise(w),
          capitalised: (w.match(/^[A-Z][a-z|A-Z]/) !== null),
          special_capitalised: (w.match(/^[A-Z][a-z|A-Z]/) !== null) && i > 0,
          punctuated: (w.match(/[,;:\(\)"]/) !== null) || undefined,
          end: (i === (arr.length - 1)) || undefined,
          start: (i === 0) || undefined
        }
      })
      return {
        sentence: sentence,
        tokens: tokens,
        type: sentence_type(sentence)
      }
    })
  }

  if (typeof module !== "undefined" && module.exports) {
    exports.tokenize = main;
  }
  return main
})()

// console.log(tokenize("i live in new york"))
// console.log(tokenize("I speak optimistically of course."))
// console.log(tokenize("Joe is 9"))

// a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
//http://en.wikipedia.org/wiki/List_of_Unicode_characters
//https://docs.google.com/spreadsheet/ccc?key=0Ah46z755j7cVdFRDM1A2YVpwa1ZYWlpJM2pQZ003M0E
var normalize = (function() {
  //approximate visual (not semantic) relationship between unicode and ascii characters
  var compact={
      "2": "²ƻ",
      "3": "³ƷƸƹƺǮǯЗҘҙӞӟӠӡȜȝ",
      "5": "Ƽƽ",
      "8": "Ȣȣ",
      "!": "¡",
      "?": "¿Ɂɂ",
      "a": "ªÀÁÂÃÄÅàáâãäåĀāĂăĄąǍǎǞǟǠǡǺǻȀȁȂȃȦȧȺΆΑΔΛάαλАДадѦѧӐӑӒӓƛɅ",
      "b": "ßþƀƁƂƃƄƅɃΒβϐϦБВЪЬбвъьѢѣҌҍҔҕƥƾ",
      "c": "¢©ÇçĆćĈĉĊċČčƆƇƈȻȼͻͼͽϲϹϽϾϿЄСсєҀҁҪҫ",
      "d": "ÐĎďĐđƉƊȡƋƌǷ",
      "e": "ÈÉÊËèéêëĒēĔĕĖėĘęĚěƎƏƐǝȄȅȆȇȨȩɆɇΈΕΞΣέεξϱϵ϶ЀЁЕЭеѐёҼҽҾҿӖӗӘәӚӛӬӭ",
      "f": "ƑƒϜϝӺӻ",
      "g": "ĜĝĞğĠġĢģƓǤǥǦǧǴǵ",
      "h": "ĤĥĦħƕǶȞȟΉΗЂЊЋНнђћҢңҤҥҺһӉӊ",
      "I": "ÌÍÎÏ",
      "i": "ìíîïĨĩĪīĬĭĮįİıƖƗȈȉȊȋΊΐΪίιϊІЇії",
      "j": "ĴĵǰȷɈɉϳЈј",
      "k": "ĶķĸƘƙǨǩΚκЌЖКжкќҚқҜҝҞҟҠҡ",
      "l": "ĹĺĻļĽľĿŀŁłƚƪǀǏǐȴȽΙӀӏ",
      "m": "ΜϺϻМмӍӎ",
      "n": "ÑñŃńŅņŇňŉŊŋƝƞǸǹȠȵΝΠήηϞЍИЙЛПийлпѝҊҋӅӆӢӣӤӥπ",
      "o": "ÒÓÔÕÖØðòóôõöøŌōŎŏŐőƟƠơǑǒǪǫǬǭǾǿȌȍȎȏȪȫȬȭȮȯȰȱΌΘΟΦΩδθοσόϕϘϙϬϭϴОФоѲѳѺѻѼѽӦӧӨөӪӫ¤ƍΏ",
      "p": "ƤƿΡρϷϸϼРрҎҏÞ",
      "q": "Ɋɋ",
      "r": "ŔŕŖŗŘřƦȐȑȒȓɌɍЃГЯгяѓҐґҒғӶӷſ",
      "s": "ŚśŜŝŞşŠšƧƨȘșȿςϚϛϟϨϩЅѕ",
      "t": "ŢţŤťŦŧƫƬƭƮȚțȶȾΓΤτϮϯТт҂Ҭҭ",
      "u": "µÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųƯưƱƲǓǔǕǖǗǘǙǚǛǜȔȕȖȗɄΰμυϋύϑЏЦЧцџҴҵҶҷҸҹӋӌӇӈ",
      "v": "ƔνѴѵѶѷ",
      "w": "ŴŵƜωώϖϢϣШЩшщѡѿ",
      "x": "×ΧχϗϰХхҲҳӼӽӾӿ",
      "y": "¥ÝýÿŶŷŸƳƴȲȳɎɏΎΥΨΫγψϒϓϔЎУучўѰѱҮүҰұӮӯӰӱӲӳ",
      "z": "ŹźŻżŽžƩƵƶȤȥɀΖζ"
    }
  //decompress data into an array
  var data = []
  Object.keys(compact).forEach(function(k){
    compact[k].split('').forEach(function(s){
        data.push([s,k])
    })
  })

  //convert array to two hashes
  var normaler = {}
  var greek = {}
  data.forEach(function(arr) {
    normaler[arr[0]] = arr[1]
    greek[arr[1]] = arr[0]
  })

  var normalize = function(str, options) {
    options = options || {}
    options.percentage = options.percentage || 50
    var arr = str.split('').map(function(s) {
      var r = Math.random() * 100
      if (normaler[s] && r < options.percentage) {
        return normaler[s] || s
      } else {
        return s
      }
    })
    return arr.join('')
  }

  var denormalize = function(str, options) {
    options = options || {}
    options.percentage = options.percentage || 50
    var arr = str.split('').map(function(s) {
      var r = Math.random() * 100
      if (greek[s] && r < options.percentage) {
        return greek[s] || s
      } else {
        return s
      }
    })
    return arr.join('')
  }

  var obj = {
    normalize: normalize,
    denormalize: denormalize
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = obj;
  }
  return obj
})()

// s = "ӳžŽżźŹźӳžŽżźŹźӳžŽżźŹźӳžŽżźŹźӳžŽżźŹź"
// s = "Björk"
// console.log(normalize.normalize(s, {
//   percentage: 100
// }))

// s = "The quick brown fox jumps over the lazy dog"
// console.log(normalize.denormalize(s, {
//   percentage: 100
// }))

//chop a string into pronounced syllables
var syllables = (function(str) {

  var main = function(str) {
    var all = []

    //suffix fixes
      var postprocess= function(arr) {
        //trim whitespace
        arr= arr.map(function(w){
          w= w.replace(/^ */,'')
          w= w.replace(/ *$/,'')
          return w
        })
        if (arr.length > 2) { //
          return arr
        }
        var ones = [
          /^[^aeiou]?ion/,
          /^[^aeiou]?ised/,
          /^[^aeiou]?iled/
        ]
        var l = arr.length
        if (l > 1) {
          var suffix = arr[l - 2] + arr[l - 1];
          for (var i = 0; i < ones.length; i++) {
            if (suffix.match(ones[i])) {
              arr[l - 2] = arr[l - 2] + arr[l - 1];
              arr.pop();
            }
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
      //if still running, end last syllable
      if (str.match(/[aiouy]/) || str.match(/ee$/)) { //allow silent trailing e
        all.push(str)
      } else {
        all[all.length - 1] = (all[all.length - 1] || '') + str; //append it to the last one
      }
    }

    str.split(/\s\-/).forEach(function(s) {
      doer(s)
    })
    all = postprocess(all)

    //for words like 'tree' and 'free'
    if(all.length===0){
      all=[str]
    }

    return all
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main
})()

// console.log(syllables("suddenly").length === 3)
// console.log(syllables("tree"))

//broken
// console.log(syllables("birchtree"))

//built with patterns+exceptions from https://en.wikipedia.org/wiki/British_spelling
// some patterns are only safe to do in one direction

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
      //   reg: /(..)our(ly|y|ite)?$/,
      //   repl: '$1or$2',
      //   exceptions: []
      // },
      // re -> er
      // {
      //   reg: /([^cdnv])re(s)?$/,
      //   repl: '$1er$2',
      //   exceptions: []
      // },
      // xion -> tion
      // {
      //   reg: /([aeiou])xion([ed])?$/,
      //   repl: '$1tion$2',
      //   exceptions: []
      // },
      //logue -> log
      // {
      //   reg: /logue$/,
      //   repl: 'log',
      //   exceptions: []
      // },
      // ae -> e
      // {
      //   reg: /([o|a])e/,
      //   repl: 'e',
      //   exceptions: []
      // },
      //eing -> ing
      // {
      //   reg: /e(ing|able)$/,
      //   repl: '$1',
      //   exceptions: []
      // },
      // illful -> ilful
      {
        reg: /([aeiou]+[^aeiou]+[aeiou]+)l(ful|ment|est|ing|or|er|ed)$/, //must be second-syllable
        repl: '$1ll$2',
        exceptions: []
      }
    ]

    for (var i = 0; i < patterns.length; i++) {
      if (str.match(patterns[i].reg)) {
        //check for exceptions
        for (var o = 0; o < patterns[i].exceptions.length; o++) {
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
      }
    ]

    for (var i = 0; i < patterns.length; i++) {
      if (str.match(patterns[i].reg)) {
        //check for exceptions
        for (var o = 0; o < patterns[i].exceptions.length; o++) {
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
  return main;
})();

// console.log(americanize("synthesise")=="synthesize")
// console.log(americanize("synthesised")=="synthesized")

//regex patterns and parts of speech
var word_rules = [
  {
    "reg": /.[cts]hy$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[st]ty$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[lnr]ize$/i,
    "pos": "VB"
  },
  {
    "reg": /.[gk]y$/i,
    "pos": "JJ"
  },
  {
    "reg": /.fies$/i,
    "pos": "VB"
  },
  {
    "reg": /.some$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[nrtumcd]al$/i,
    "pos": "JJ"
  },
  {
    "reg": /.que$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[tnl]ary$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[di]est$/i,
    "pos": "JJS"
  },
  {
    "reg": /^(un|de|re)\\-[a-z]../i,
    "pos": "VB"
  },
  {
    "reg": /.lar$/i,
    "pos": "JJ"
  },
  {
    "reg": /[bszmp]{2}y/i,
    "pos": "JJ"
  },
  {
    "reg": /.zes$/i,
    "pos": "VB"
  },
  {
    "reg": /.[icldtgrv]ent$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[rln]ates$/i,
    "pos": "VBZ"
  },
  {
    "reg": /.[oe]ry$/i,
    "pos": "JJ"
  },
  {
    "reg": /[rdntkdhs]ly$/i,
    "pos": "RB"
  },
  {
    "reg": /.[lsrnpb]ian$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[^aeiou]ial$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[^aeiou]eal$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[vrl]id$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[ilk]er$/i,
    "pos": "JJR"
  },
  {
    "reg": /.ike$/i,
    "pos": "JJ"
  },
  {
    "reg": /.ends$/i,
    "pos": "VB"
  },
  {
    "reg": /.wards$/i,
    "pos": "RB"
  },
  {
    "reg": /.rmy$/i,
    "pos": "JJ"
  },
  {
    "reg": /.rol$/i,
    "pos": "NN"
  },
  {
    "reg": /.tors$/i,
    "pos": "NN"
  },
  {
    "reg": /.azy$/i,
    "pos": "JJ"
  },
  {
    "reg": /.where$/i,
    "pos": "RB"
  },
  {
    "reg": /.ify$/i,
    "pos": "VB"
  },
  {
    "reg": /.bound$/i,
    "pos": "JJ"
  },
  {
    "reg": /.ens$/i,
    "pos": "VB"
  },
  {
    "reg": /.oid$/i,
    "pos": "JJ"
  },
  {
    "reg": /.vice$/i,
    "pos": "NN"
  },
  {
    "reg": /.rough$/i,
    "pos": "JJ"
  },
  {
    "reg": /.mum$/i,
    "pos": "JJ"
  },
  {
    "reg": /.teen(th)?$/i,
    "pos": "CD"
  },
  {
    "reg": /.oses$/i,
    "pos": "VB"
  },
  {
    "reg": /.ishes$/i,
    "pos": "VB"
  },
  {
    "reg": /.ects$/i,
    "pos": "VB"
  },
  {
    "reg": /.tieth$/i,
    "pos": "CD"
  },
  {
    "reg": /.ices$/i,
    "pos": "NN"
  },
  {
    "reg": /.bles$/i,
    "pos": "VB"
  },
  {
    "reg": /.pose$/i,
    "pos": "VB"
  },
  {
    "reg": /.ions$/i,
    "pos": "NN"
  },
  {
    "reg": /.ean$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[ia]sed$/i,
    "pos": "JJ"
  },
  {
    "reg": /.tized$/i,
    "pos": "VB"
  },
  {
    "reg": /.llen$/i,
    "pos": "JJ"
  },
  {
    "reg": /.fore$/i,
    "pos": "RB"
  },
  {
    "reg": /.ances$/i,
    "pos": "NN"
  },
  {
    "reg": /.gate$/i,
    "pos": "VB"
  },
  {
    "reg": /.nes$/i,
    "pos": "VB"
  },
  {
    "reg": /.less$/i,
    "pos": "RB"
  },
  {
    "reg": /.ried$/i,
    "pos": "JJ"
  },
  {
    "reg": /.gone$/i,
    "pos": "JJ"
  },
  {
    "reg": /.made$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[pdltrkvyns]ing$/i,
    "pos": "JJ"
  },
  {
    "reg": /.tions$/i,
    "pos": "NN"
  },
  {
    "reg": /.tures$/i,
    "pos": "NN"
  },
  {
    "reg": /.ous$/i,
    "pos": "JJ"
  },
  {
    "reg": /.ports$/i,
    "pos": "NN"
  },
  {
    "reg": /. so$/i,
    "pos": "RB"
  },
  {
    "reg": /.ints$/i,
    "pos": "NN"
  },
  {
    "reg": /.[gt]led$/i,
    "pos": "JJ"
  },
  {
    "reg": /[aeiou].*ist$/i,
    "pos": "JJ"
  },
  {
    "reg": /.lked$/i,
    "pos": "VB"
  },
  {
    "reg": /.fully$/i,
    "pos": "RB"
  },
  {
    "reg": /.*ould$/i,
    "pos": "MD"
  },
  {
    "reg": /^-?[0-9]+(.[0-9]+)?$/,
    "pos": "CD"
  },
  {
    "reg": /[a-z]*\\-[a-z]*\\-/,
    "pos": "JJ"
  },
  {
    "reg": /[a-z]'s$/i,
    "pos": "NNO"
  },
  {
    "reg": /.'n$/i,
    "pos": "VB"
  },
  {
    "reg": /.'re$/i,
    "pos": "CP"
  },
  {
    "reg": /.'ll$/i,
    "pos": "MD"
  },
  {
    "reg": /.'t$/i,
    "pos": "VB"
  },
  {
    "reg": /.tches$/i,
    "pos": "VB"
  },
  {
    "reg": /^https?:\/\//i,
    "pos": "CD"
  },
  {
    "reg": /^www\.[a-z0-9]/i,
    "pos": "CD"
  },
  {
    "reg": /.ize$/i,
    "pos": "VB"
  },
  {
    "reg": /.[^aeiou]ise$/i,
    "pos": "VB"
  },
  {
    "reg": /.[aeiou]te$/i,
    "pos": "VB"
  },
  {
    "reg": /.ea$/i,
    "pos": "NN"
  },
  {
    "reg": /[aeiou][pns]er$/i,
    "pos": "NN"
  },
  {
    "reg": /.ia$/i,
    "pos": "NN"
  },
  {
    "reg": /.sis$/i,
    "pos": "NN"
  },
  {
    "reg": /.[aeiou]na$/i,
    "pos": "NN"
  },
  {
    "reg": /.[^aeiou]ity$/i,
    "pos": "NN"
  },
  {
    "reg": /.[^aeiou]ium$/i,
    "pos": "NN"
  },
  {
    "reg": /.[^aeiou][ei]al$/i,
    "pos": "JJ"
  },
  {
    "reg": /.ffy$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[^aeiou]ic$/i,
    "pos": "JJ"
  },
  {
    "reg": /.(gg|bb|zz)ly$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[aeiou]my$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[aeiou]ble$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[^aeiou]ful$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[^aeiou]ish$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[^aeiou]ica$/i,
    "pos": "NN"
  },
  {
    "reg": /[aeiou][^aeiou]is$/i,
    "pos": "NN"
  },
  {
    "reg": /[^aeiou]ard$/i,
    "pos": "NN"
  },
  {
    "reg": /[^aeiou]ism$/i,
    "pos": "NN"
  },
  {
    "reg": /.[^aeiou]ity$/i,
    "pos": "NN"
  },
  {
    "reg": /.[^aeiou]ium$/i,
    "pos": "NN"
  },
  {
    "reg": /.[lstrn]us$/i,
    "pos": "NN"
  },
  {
    "reg": /..ic$/i,
    "pos": "JJ"
  },
  {
    "reg": /[aeiou][^aeiou]id$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[^aeiou]ish$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[^aeiou]ive$/i,
    "pos": "JJ"
  },
  {
    "reg": /[ea]{2}zy$/i,
    "pos": "JJ"
  }
]

if (typeof module !== "undefined" && module.exports) {
  module.exports = word_rules;
}

// word suffixes with a high pos signal, generated with wordnet
//by spencer kelly spencermountain@gmail.com  2014
var wordnet_suffixes = (function() {

  var data = {
  "NN": [
    "ceae",
    "inae",
    "idae",
    "leaf",
    "rgan",
    "eman",
    "sman",
    "star",
    "boat",
    "tube",
    "rica",
    "tica",
    "nica",
    "auce",
    "tics",
    "ency",
    "ancy",
    "poda",
    "tude",
    "xide",
    "body",
    "weed",
    "tree",
    "rrel",
    "stem",
    "cher",
    "icer",
    "erer",
    "ader",
    "ncer",
    "izer",
    "ayer",
    "nner",
    "ates",
    "ales",
    "ides",
    "rmes",
    "etes",
    "llet",
    "uage",
    "ings",
    "aphy",
    "chid",
    "tein",
    "vein",
    "hair",
    "tris",
    "unit",
    "cake",
    "nake",
    "illa",
    "ella",
    "icle",
    "ille",
    "etle",
    "scle",
    "cell",
    "bell",
    "bill",
    "palm",
    "toma",
    "game",
    "lamp",
    "bone",
    "mann",
    "ment",
    "wood",
    "book",
    "nson",
    "agon",
    "odon",
    "dron",
    "iron",
    "tion",
    "itor",
    "ator",
    "root",
    "cope",
    "tera",
    "hora",
    "lora",
    "bird",
    "worm",
    "fern",
    "horn",
    "wort",
    "ourt",
    "stry",
    "etry",
    "bush",
    "ness",
    "gist",
    "rata",
    "lata",
    "tata",
    "moth",
    "lity",
    "nity",
    "sity",
    "rity",
    "city",
    "dity",
    "vity",
    "drug",
    "dium",
    "llum",
    "trum",
    "inum",
    "lium",
    "tium",
    "atum",
    "rium",
    "icum",
    "anum",
    "nium",
    "orum",
    "icus",
    "opus",
    "chus",
    "ngus",
    "thus",
    "rius",
    "rpus"
  ],
  "JJ": [
    "liac",
    "siac",
    "clad",
    "deaf",
    "xial",
    "hial",
    "chal",
    "rpal",
    "asal",
    "rial",
    "teal",
    "oeal",
    "vial",
    "phal",
    "sial",
    "heal",
    "rbal",
    "neal",
    "geal",
    "dial",
    "eval",
    "bial",
    "ugal",
    "kian",
    "izan",
    "rtan",
    "odan",
    "llan",
    "zian",
    "eian",
    "eyan",
    "ndan",
    "eban",
    "near",
    "unar",
    "lear",
    "liar",
    "-day",
    "-way",
    "tech",
    "sick",
    "tuck",
    "inct",
    "unct",
    "wide",
    "endo",
    "uddy",
    "eedy",
    "uted",
    "aled",
    "rred",
    "oned",
    "rted",
    "obed",
    "oped",
    "ched",
    "dded",
    "cted",
    "tied",
    "eked",
    "ayed",
    "rked",
    "teed",
    "mmed",
    "tred",
    "awed",
    "rbed",
    "bbed",
    "axed",
    "bred",
    "pied",
    "cked",
    "rced",
    "ened",
    "fied",
    "lved",
    "mned",
    "kled",
    "hted",
    "lied",
    "eted",
    "rded",
    "lued",
    "rved",
    "azed",
    "oked",
    "ghed",
    "sked",
    "emed",
    "aded",
    "ived",
    "mbed",
    "pted",
    "zled",
    "ored",
    "pled",
    "wned",
    "afed",
    "nied",
    "aked",
    "gued",
    "oded",
    "oved",
    "oled",
    "ymed",
    "lled",
    "bled",
    "cled",
    "eded",
    "toed",
    "ited",
    "oyed",
    "eyed",
    "ured",
    "omed",
    "ixed",
    "pped",
    "ined",
    "lted",
    "iced",
    "exed",
    "nded",
    "amed",
    "owed",
    "dged",
    "nted",
    "eged",
    "nned",
    "used",
    "ibed",
    "nced",
    "umed",
    "dled",
    "died",
    "rged",
    "aped",
    "oted",
    "uled",
    "ided",
    "nked",
    "aved",
    "rled",
    "rned",
    "aned",
    "rmed",
    "lmed",
    "aged",
    "ized",
    "eved",
    "ofed",
    "thed",
    "ered",
    "ared",
    "ated",
    "eled",
    "sted",
    "ewed",
    "nsed",
    "nged",
    "lded",
    "gged",
    "osed",
    "fled",
    "shed",
    "aced",
    "ffed",
    "tted",
    "uced",
    "iled",
    "uded",
    "ired",
    "yzed",
    "-fed",
    "mped",
    "iked",
    "fted",
    "imed",
    "hree",
    "llel",
    "aten",
    "lden",
    "nken",
    "apen",
    "ozen",
    "ober",
    "-set",
    "nvex",
    "osey",
    "laid",
    "paid",
    "xvii",
    "xxii",
    "-air",
    "tair",
    "icit",
    "knit",
    "nlit",
    "xxiv",
    "-six",
    "-old",
    "held",
    "cile",
    "ible",
    "able",
    "gile",
    "full",
    "-ply",
    "bbly",
    "ggly",
    "zzly",
    "-one",
    "mane",
    "mune",
    "rung",
    "uing",
    "mant",
    "yant",
    "uant",
    "pant",
    "urnt",
    "awny",
    "eeny",
    "ainy",
    "orny",
    "siny",
    "tood",
    "shod",
    "-toe",
    "d-on",
    "-top",
    "-for",
    "odox",
    "wept",
    "eepy",
    "oopy",
    "hird",
    "dern",
    "worn",
    "mart",
    "ltry",
    "oury",
    "ngry",
    "arse",
    "bose",
    "cose",
    "mose",
    "iose",
    "gish",
    "kish",
    "pish",
    "wish",
    "vish",
    "yish",
    "owsy",
    "ensy",
    "easy",
    "ifth",
    "edth",
    "urth",
    "ixth",
    "00th",
    "ghth",
    "ilty",
    "orty",
    "ifty",
    "inty",
    "ghty",
    "kety",
    "afty",
    "irty",
    "roud",
    "true",
    "wful",
    "dful",
    "rful",
    "mful",
    "gful",
    "lful",
    "hful",
    "kful",
    "iful",
    "yful",
    "sful",
    "tive",
    "cave",
    "sive",
    "five",
    "cive",
    "xxvi",
    "urvy",
    "nown",
    "hewn",
    "lown",
    "-two",
    "lowy",
    "ctyl"
  ],
  "VB": [
    "wrap",
    "hear",
    "draw",
    "rlay",
    "away",
    "elay",
    "duce",
    "esce",
    "elch",
    "ooch",
    "pick",
    "huck",
    "back",
    "hack",
    "ruct",
    "lict",
    "nect",
    "vict",
    "eact",
    "tect",
    "vade",
    "lude",
    "vide",
    "rude",
    "cede",
    "ceed",
    "ivel",
    "hten",
    "rken",
    "shen",
    "open",
    "quer",
    "over",
    "efer",
    "eset",
    "uiet",
    "pret",
    "ulge",
    "lign",
    "pugn",
    "othe",
    "rbid",
    "raid",
    "veil",
    "vail",
    "roil",
    "join",
    "dain",
    "feit",
    "mmit",
    "erit",
    "voke",
    "make",
    "weld",
    "uild",
    "idle",
    "rgle",
    "otle",
    "rble",
    "self",
    "fill",
    "till",
    "eels",
    "sult",
    "pply",
    "sume",
    "dime",
    "lame",
    "lump",
    "rump",
    "vene",
    "cook",
    "look",
    "from",
    "elop",
    "grow",
    "adow",
    "ploy",
    "sorb",
    "pare",
    "uire",
    "jure",
    "lore",
    "surf",
    "narl",
    "earn",
    "ourn",
    "hirr",
    "tort",
    "-fry",
    "uise",
    "lyse",
    "sise",
    "hise",
    "tise",
    "nise",
    "lise",
    "rise",
    "anse",
    "gise",
    "owse",
    "oosh",
    "resh",
    "cuss",
    "uess",
    "sess",
    "vest",
    "inst",
    "gest",
    "fest",
    "xist",
    "into",
    "ccur",
    "ieve",
    "eive",
    "olve",
    "down",
    "-dye",
    "laze",
    "lyze",
    "raze",
    "ooze"
  ],
  "RB": [
    "that",
    "oubt",
    "much",
    "diem",
    "high",
    "atim",
    "sely",
    "nely",
    "ibly",
    "lely",
    "dely",
    "ally",
    "gely",
    "imly",
    "tely",
    "ully",
    "ably",
    "owly",
    "vely",
    "cely",
    "mely",
    "mply",
    "ngly",
    "exly",
    "ffly",
    "rmly",
    "rely",
    "uely",
    "time",
    "iori",
    "oors",
    "wise",
    "orst",
    "east",
    "ways"
  ]
}
    //convert it to an easier format
  var data = Object.keys(data).reduce(function(h, k) {
    data[k].forEach(function(w) {
      h[w] = k
    })
    return h
  }, {})

  if (typeof module !== "undefined" && module.exports) {
    module.exports = data;
  }
  return data;
})();

//the parts of speech used by this library. mostly standard, but some changes.
var parts_of_speech = (function() {

  var main = {
    //verbs
    "VB": {
      "name": "verb, generic",
      "parent": "verb",
      "tag": "VB"
    },
    "VBD": {
      "name": "past-tense verb",
      "parent": "verb",
      "tense": "past",
      "tag": "VBD"
    },
    "VBN": {
      "name": "past-participle verb",
      "parent": "verb",
      "tense": "past",
      "tag": "VBN"
    },
    "VBP": {
      "name": "infinitive verb",
      "parent": "verb",
      "tense": "present",
      "tag": "VBP"
    },
    "VBZ": {
      "name": "present-tense verb",
      "tense": "present",
      "parent": "verb",
      "tag": "VBZ"
    },
    "CP": {
      "name": "copula",
      "parent": "verb",
      "tag": "CP"
    },
    "VBG": {
      "name": "gerund verb",
      "parent": "verb",
      "tag": "VBG"
    },

    //adjectives
    "JJ": {
      "name": "adjective, generic",
      "parent": "adjective",
      "tag": "JJ"
    },
    "JJR": {
      "name": "comparative adjective",
      "parent": "adjective",
      "tag": "JJR"
    },
    "JJS": {
      "name": "superlative adjective",
      "parent": "adjective",
      "tag": "JJS"
    },

    //adverbs
    "RB": {
      "name": "adverb",
      "parent": "adverb",
      "tag": "RB"
    },
    "RBR": {
      "name": "comparative adverb",
      "parent": "adverb",
      "tag": "RBR"
    },
    "RBS": {
      "name": "superlative adverb",
      "parent": "adverb",
      "tag": "RBS"
    },

    //nouns
    "NN": {
      "name": "noun, generic",
      "parent": "noun",
      "tag": "NN"
    },
    "NNP": {
      "name": "singular proper noun",
      "parent": "noun",
      "tag": "NNP"
    },
    "NNA": {
      "name": "noun, active",
      "parent": "noun",
      "tag": "NNA"
    },
    "NNPA": {
      "name": "noun, acronym",
      "parent": "noun",
      "tag": "NNPA"
    },
    "NNPS": {
      "name": "plural proper noun",
      "parent": "noun",
      "tag": "NNPS"
    },
    "NNS": {
      "name": "plural noun",
      "parent": "noun",
      "tag": "NNS"
    },
    "NNO": {
      "name": "possessive noun",
      "parent": "noun",
      "tag": "NNO"
    },
    "NNG": {
      "name": "gerund noun",
      "parent": "noun",
      "tag": "VBG"
    },

    //glue
    "PP": {
      "name": "possessive pronoun",
      "parent": "glue",
      "tag": "PP"
    },
    "FW": {
      "name": "foreign word",
      "parent": "glue",
      "tag": "FW"
    },
    "CD": {
      "name": "cardinal value, generic",
      "parent": "value",
      "tag": "CD"
    },
    "DA": {
      "name": "date",
      "parent": "value",
      "tag": "DA"
    },
    "NU": {
      "name": "number",
      "parent": "value",
      "tag": "NU"
    },
    "IN": {
      "name": "preposition",
      "parent": "glue",
      "tag": "IN"
    },
    "MD": {
      "name": "modal verb",
      "parent": "verb", //dunno
      "tag": "MD"
    },
    "CC": {
      "name": "co-ordating conjunction",
      "parent": "glue",
      "tag": "CC"
    },
    "PRP": {
      "name": "personal pronoun",
      "parent": "noun",
      "tag": "PRP"
    },
    "DT": {
      "name": "determiner",
      "parent": "glue",
      "tag": "DT"
    },
    "UH": {
      "name": "interjection",
      "parent": "glue",
      "tag": "UH"
    },
    "EX": {
      "name": "existential there",
      "parent": "glue",
      "tag": "EX"
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }

  return main
})()

var verb_irregulars = (function() {
  var types = [
    'infinitive',
    'gerund',
    'past',
    'present',
    'doer',
    'future'
  ]

  //list of verb irregular verb forms, compacted to save space. ('_' -> infinitive )
  var compact = [
    [
      "arise",
      "arising",
      "arose",
      "_s",
      "_r"
    ],
    [
      "babysit",
      "_ting",
      "babysat",
      "_s",
      "_ter"
    ],
    [
      "be",
      "_ing",
      "was",
      "is",
      ""
    ],
    [
      "beat",
      "_ing",
      "_",
      "_s",
      "_er"
    ],
    [
      "become",
      "becoming",
      "became",
      "_s",
      "_r"
    ],
    [
      "bend",
      "_ing",
      "bent",
      "_s",
      "_er"
    ],
    [
      "begin",
      "_ning",
      "began",
      "_s",
      "_ner"
    ],
    [
      "bet",
      "_ting",
      "_",
      "_s",
      "_ter"
    ],
    [
      "bind",
      "_ing",
      "bound",
      "_s",
      "_er"
    ],
    [
      "bite",
      "biting",
      "bit",
      "_s",
      "_r"
    ],
    [
      "bleed",
      "_ing",
      "bled",
      "_s",
      "_er"
    ],
    [
      "blow",
      "_ing",
      "blew",
      "_s",
      "_er"
    ],
    [
      "break",
      "_ing",
      "broke",
      "_s",
      "_er"
    ],
    [
      "breed",
      "_ing",
      "bred",
      "_s",
      "_er"
    ],
    [
      "bring",
      "_ing",
      "brought",
      "_s",
      "_er"
    ],
    [
      "broadcast",
      "_ing",
      "_",
      "_s",
      "_er"
    ],
    [
      "build",
      "_ing",
      "built",
      "_s",
      "_er"
    ],
    [
      "buy",
      "_ing",
      "bought",
      "_s",
      "_er"
    ],
    [
      "catch",
      "_ing",
      "caught",
      "_es",
      "_er"
    ],
    [
      "choose",
      "choosing",
      "chose",
      "_s",
      "_r"
    ],
    [
      "come",
      "coming",
      "came",
      "_s",
      "_r"
    ],
    [
      "cost",
      "_ing",
      "_",
      "_s",
      "_er"
    ],
    [
      "cut",
      "_ting",
      "_",
      "_s",
      "_ter"
    ],
    [
      "deal",
      "_ing",
      "_t",
      "_s",
      "_er"
    ],
    [
      "dig",
      "_ging",
      "dug",
      "_s",
      "_ger"
    ],
    [
      "do",
      "_ing",
      "did",
      "_es",
      "_er"
    ],
    [
      "draw",
      "_ing",
      "drew",
      "_s",
      "_er"
    ],
    [
      "drink",
      "_ing",
      "drank",
      "_s",
      "_er"
    ],
    [
      "drive",
      "driving",
      "drove",
      "_s",
      "_r"
    ],
    [
      "eat",
      "_ing",
      "ate",
      "_s",
      "_er"
    ],
    [
      "fall",
      "_ing",
      "fell",
      "_s",
      "_er"
    ],
    [
      "feed",
      "_ing",
      "fed",
      "_s",
      "_er"
    ],
    [
      "feel",
      "_ing",
      "felt",
      "_s",
      "_er"
    ],
    [
      "fight",
      "_ing",
      "fought",
      "_s",
      "_er"
    ],
    [
      "find",
      "_ing",
      "found",
      "_s",
      "_er"
    ],
    [
      "fly",
      "_ing",
      "flew",
      "_s",
      "flier"
    ],
    [
      "forbid",
      "_ing",
      "forbade",
      "_s",

    ],
    [
      "forget",
      "_ing",
      "forgot",
      "_s",
      "_er"
    ],
    [
      "forgive",
      "forgiving",
      "forgave",
      "_s",
      "_r"
    ],
    [
      "freeze",
      "freezing",
      "froze",
      "_s",
      "_r"
    ],
    [
      "get",
      "_ting",
      "got",
      "_s",
      "_ter"
    ],
    [
      "give",
      "giving",
      "gave",
      "_s",
      "_r"
    ],
    [
      "go",
      "_ing",
      "went",
      "_es",
      "_er"
    ],
    [
      "grow",
      "_ing",
      "grew",
      "_s",
      "_er"
    ],
    [
      "hang",
      "_ing",
      "hung",
      "_s",
      "_er"
    ],
    [
      "have",
      "having",
      "had",
      "has",

    ],
    [
      "hear",
      "_ing",
      "_d",
      "_s",
      "_er"
    ],
    [
      "hide",
      "hiding",
      "hid",
      "_s",
      "_r"
    ],
    [
      "hit",
      "_ting",
      "_",
      "_s",
      "_ter"
    ],
    [
      "hold",
      "_ing",
      "held",
      "_s",
      "_er"
    ],
    [
      "hurt",
      "_ing",
      "_",
      "_s",
      "_er"
    ],
    [
      "know",
      "_ing",
      "knew",
      "_s",
      "_er"
    ],
    [
      "relay",
      "_ing",
      "_ed",
      "_s",
      "_er"
    ],
    [
      "lay",
      "_ing",
      "laid",
      "_s",
      "_er"
    ],
    [
      "lead",
      "_ing",
      "led",
      "_s",
      "_er"
    ],
    [
      "leave",
      "leaving",
      "left",
      "_s",
      "_r"
    ],
    [
      "lend",
      "_ing",
      "lent",
      "_s",
      "_er"
    ],
    [
      "let",
      "_ting",
      "_",
      "_s",
      "_ter"
    ],
    [
      "lie",
      "lying",
      "lay",
      "_s",
      "_r"
    ],
    [
      "light",
      "_ing",
      "lit",
      "_s",
      "_er"
    ],
    [
      "lose",
      "losing",
      "lost",
      "_s",
      "_r"
    ],
    [
      "make",
      "making",
      "made",
      "_s",
      "_r"
    ],
    [
      "mean",
      "_ing",
      "_t",
      "_s",
      "_er"
    ],
    [
      "meet",
      "_ing",
      "met",
      "_s",
      "_er"
    ],
    [
      "pay",
      "_ing",
      "paid",
      "_s",
      "_er"
    ],
    [
      "put",
      "_ting",
      "_",
      "_s",
      "_ter"
    ],
    [
      "quit",
      "_ting",
      "_",
      "_s",
      "_ter"
    ],
    [
      "read",
      "_ing",
      "_",
      "_s",
      "_er"
    ],
    [
      "ride",
      "riding",
      "rode",
      "_s",
      "_r"
    ],
    [
      "ring",
      "_ing",
      "rang",
      "_s",
      "_er"
    ],
    [
      "rise",
      "rising",
      "rose",
      "_s",
      "_r"
    ],
    [
      "run",
      "_ning",
      "ran",
      "_s",
      "_ner"
    ],
    [
      "say",
      "_ing",
      "said",
      "_s",

    ],
    [
      "see",
      "_ing",
      "saw",
      "_s",
      "_r"
    ],
    [
      "sell",
      "_ing",
      "sold",
      "_s",
      "_er"
    ],
    [
      "send",
      "_ing",
      "sent",
      "_s",
      "_er"
    ],
    [
      "set",
      "_ting",
      "_",
      "_s",
      "_ter"
    ],
    [
      "shake",
      "shaking",
      "shook",
      "_s",
      "_r"
    ],
    [
      "shine",
      "shining",
      "shone",
      "_s",
      "_r"
    ],
    [
      "shoot",
      "_ing",
      "shot",
      "_s",
      "_er"
    ],
    [
      "show",
      "_ing",
      "_ed",
      "_s",
      "_er"
    ],
    [
      "shut",
      "_ting",
      "_",
      "_s",
      "_ter"
    ],
    [
      "sing",
      "_ing",
      "sang",
      "_s",
      "_er"
    ],
    [
      "sink",
      "_ing",
      "sank",
      "_s",
      "_er"
    ],
    [
      "sit",
      "_ting",
      "sat",
      "_s",
      "_ter"
    ],
    [
      "slide",
      "sliding",
      "slid",
      "_s",
      "_r"
    ],
    [
      "speak",
      "_ing",
      "spoke",
      "_s",
      "_er"
    ],
    [
      "spend",
      "_ing",
      "spent",
      "_s",
      "_er"
    ],
    [
      "spin",
      "_ning",
      "spun",
      "_s",
      "_ner"
    ],
    [
      "spread",
      "_ing",
      "_",
      "_s",
      "_er"
    ],
    [
      "stand",
      "_ing",
      "stood",
      "_s",
      "_er"
    ],
    [
      "steal",
      "_ing",
      "stole",
      "_s",
      "_er"
    ],
    [
      "stick",
      "_ing",
      "stuck",
      "_s",
      "_er"
    ],
    [
      "sting",
      "_ing",
      "stung",
      "_s",
      "_er"
    ],
    [
      "strike",
      "striking",
      "struck",
      "_s",
      "_r"
    ],
    [
      "swear",
      "_ing",
      "swore",
      "_s",
      "_er"
    ],
    [
      "swim",
      "_ing",
      "swam",
      "_s",
      "_mer"
    ],
    [
      "swing",
      "_ing",
      "swung",
      "_s",
      "_er"
    ],
    [
      "take",
      "taking",
      "took",
      "_s",
      "_r"
    ],
    [
      "teach",
      "_ing",
      "taught",
      "_s",
      "_er"
    ],
    [
      "tear",
      "_ing",
      "tore",
      "_s",
      "_er"
    ],
    [
      "tell",
      "_ing",
      "told",
      "_s",
      "_er"
    ],
    [
      "think",
      "_ing",
      "thought",
      "_s",
      "_er"
    ],
    [
      "throw",
      "_ing",
      "threw",
      "_s",
      "_er"
    ],
    [
      "understand",
      "_ing",
      "understood",
      "_s",

    ],
    [
      "wake",
      "waking",
      "woke",
      "_s",
      "_r"
    ],
    [
      "wear",
      "_ing",
      "wore",
      "_s",
      "_er"
    ],
    [
      "win",
      "_ning",
      "won",
      "_s",
      "_ner"
    ],
    [
      "withdraw",
      "_ing",
      "withdrew",
      "_s",
      "_er"
    ],
    [
      "write",
      "writing",
      "wrote",
      "_s",
      "_r"
    ],
    [
      "tie",
      "tying",
      "_d",
      "_s",
      "_r"
    ],
    [
      "obey",
      "_ing",
      "_ed",
      "_s",
      "_er"
    ],
    [
      "ski",
      "_ing",
      "_ied",
      "_s",
      "_er"
    ],
    [
      "boil",
      "_ing",
      "_ed",
      "_s",
      "_er"
    ],
    [
      "miss",
      "_ing",
      "_ed",
      "_",
      "_er"
    ],
    [
      "act",
      "_ing",
      "_ed",
      "_s",
      "_or"
    ],
    [
      "compete",
      "competing",
      "_d",
      "_s",
      "competitor"
    ],
    [
      "being",
      "are",
      "were",
      "are",

    ],
    [
      "imply",
      "_ing",
      "implied",
      "implies",
      "implier"
    ],
    [
      "ice",
      "icing",
      "_d",
      "_s",
      "_r"
    ],
    [
      "develop",
      "_ing",
      "_",
      "_s",
      "_er"
    ],
    [
      "wait",
      "_ing",
      "_ed",
      "_s",
      "_er"
    ],
    [
      "aim",
      "_ing",
      "_ed",
      "_s",
      "_er"
    ],
    [
      "spill",
      "_ing",
      "spilt",
      "_s",
      "_er"
    ],
    [
      "be",
      "am",
      "was",
      "am",
      ""
    ]
  ]
  //expand compact version out
  var main=compact.map(function(arr){
    var obj={}
    for(var i=0; i<arr.length; i++){
      obj[types[i]]=arr[i].replace(/_/, arr[0])
    }
    return obj
  })
  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main;
})();

// console.log(JSON.stringify(verb_irregulars, null, 2));

//adjectives that either aren't covered by rules, or have superlative/comparative forms
//this list is the seed, from which various forms are conjugated
var adjectives = (function() {

  var main = [
    'colonial',
    'moody',
    'literal',
    'actual',
    'probable',
    'apparent',
    'usual',
    'aberrant',
    'ablaze',
    'able',
    'absolute',
    'aboard',
    'abrupt',
    'absent',
    'absorbing',
    'absurd',
    'abundant',
    'accurate',
    'adult',
    'afraid',
    'agonizing',
    'ahead',
    'alert',
    'alive',
    'aloof',
    'amazing',
    'arbitrary',
    'arrogant',
    'asleep',
    'astonishing',
    'average',
    'awake',
    'aware',
    'awkward',
    'back',
    'bad',
    'bankrupt',
    'bawdy',
    'beneficial',
    'bent',
    'best',
    'better',
    'big',
    'bitter',
    'bizarre',
    'black',
    'bloody',
    'blue',
    'bouncy',
    'brash',
    'brave',
    'brief',
    'bright',
    'brilliant',
    'broad',
    'broken',
    'brown',
    'burly',
    'busy',
    'cagey',
    'calm',
    'careful',
    'caring',
    'certain',
    'charming',
    'cheap',
    'chief',
    'chilly',
    'civil',
    'clever',
    'close',
    'closed',
    'cloudy',
    'cold',
    'colossal',
    'commercial',
    'common',
    'complete',
    'complex',
    'concerned',
    'concrete',
    'congruent',
    'constant',
    'cooing',
    'cool',
    'correct',
    'cowardly',
    'craven',
    'cruel',
    'cuddly',
    'curly',
    'cute',
    'daily',
    'damaged',
    'damaging',
    'damp',
    'dapper',
    'dark',
    'dashing',
    'dead',
    'deadpan',
    'dear',
    'deep',
    'deeply',
    'defiant',
    'degenerate',
    'delicate',
    'delightful',
    'desperate',
    'determined',
    'didactic',
    'difficult',
    'discreet',
    'done',
    'double',
    'doubtful',
    'downtown',
    'dreary',
    'drunk',
    'dry',
    'dull',
    'eager',
    'early',
    'east',
    'eastern',
    'easy',
    'elderly',
    'elegant',
    'elfin',
    'elite',
    'eminent',
    'empty',
    'encouraging',
    'entire',
    'erect',
    'ethereal',
    'even',
    'exact',
    'expert',
    'extra',
    'extreme',
    'exuberant',
    'exultant',
    'faint',
    'fair',
    'false',
    'fanc',
    'fancy',
    'fast',
    'fat',
    'faulty',
    'feeble',
    'female',
    'fertile',
    'few',
    'fierce',
    'fierce ',
    'financial',
    'fine',
    'firm',
    'first',
    'fit',
    'fixed',
    'flagrant',
    'flat',
    'foamy',
    'foolish',
    'foregoing',
    'foreign',
    'forgetful',
    'former',
    'fortunate',
    'frail',
    'frantic',
    'free',
    'freezing',
    'frequent',
    'fresh',
    'fretful',
    'friendly',
    'full',
    'fun',
    'funny',
    'furry',
    'future',
    'gainful',
    'gaudy',
    'gentle',
    'giant',
    'giddy',
    'gigantic',
    'glad',
    'gleaming',
    'glib',
    'global',
    'gold',
    'gone',
    'good',
    'goofy',
    'graceful',
    'grand',
    'grateful',
    'gratis',
    'gray',
    'great',
    'green',
    'grey',
    'groovy',
    'gross',
    'guarded',
    'half',
    'handy',
    'hanging',
    'hard',
    'harsh',
    'hateful',
    'heady',
    'heavenly',
    'heavy',
    'hellish',
    'helpful',
    'hesitant',
    'high',
    'highfalutin',
    'hollow',
    'homely',
    'honest',
    'hot',
    'huge',
    'humdrum',
    'hurried',
    'hurt',
    'icy',
    'ignorant',
    'ill',
    'illegal',
    'immediate',
    'immense',
    'imminent',
    'impartial',
    'imperfect',
    'impolite',
    'important',
    'imported',
    'initial',
    'innate',
    'inner',
    'inside',
    'irate',
    'jolly',
    'juicy',
    'junior',
    'juvenile',
    'kaput',
    'keen',
    'kind',
    'kindly',
    'knowing',
    'labored',
    'lame',
    'languid',
    'large',
    'late',
    'latter',
    'learned',
    'left',
    'legal',
    'lethal',
    'level',
    'lewd',
    'light',
    'likely',
    'literate',
    'lively',
    'living',
    'lonely',
    'longing',
    'loose',
    'loud',
    'loutish',
    'lovely',
    'loving',
    'low',
    'lowly',
    'lush',
    'luxuriant',
    'lying',
    'macabre',
    'macho',
    'mad',
    'madly',
    'magenta',
    'main',
    'major',
    'makeshift',
    'male',
    'mammoth',
    'married',
    'mature',
    'measly',
    'meaty',
    'medium',
    'meek',
    'mellow',
    'mere',
    'middle',
    'miniature',
    'minor',
    'miscreant',
    'mobile',
    'moldy',
    'mundane',
    'mute',
    'naive',
    'narrow',
    'near',
    'nearby',
    'neat',
    'necessary',
    'neighborly',
    'new',
    'next',
    'nice',
    'nimble',
    'noisy',
    'nonchalant',
    'nondescript',
    'nonstop',
    'north',
    'nosy',
    'obeisant',
    'obese',
    'obscene',
    'observant',
    'obsolete',
    'odd',
    'offbeat',
    'official',
    'ok',
    'old',
    'open',
    'opposite',
    'orange',
    'organic',
    'outdoor',
    'outer',
    'outgoing',
    'oval',
    'over',
    'overall',
    'overt',
    'overweight',
    'overwrought',
    'painful',
    'pale',
    'past',
    'peaceful',
    'perfect',
    'petite',
    'picayune',
    'pink',
    'placid',
    'plain',
    'plant',
    'pleasant',
    'polite',
    'poor',
    'potential',
    'pregnant',
    'premium',
    'present',
    'pricey',
    'prickly',
    'primary',
    'prior',
    'private',
    'profuse',
    'proper',
    'public',
    'pumped',
    'puny',
    'pure',
    'purple',
    'quack',
    'quaint',
    'quick',
    'quickest',
    'quiet',
    'rabid',
    'racial',
    'rare',
    'raw',
    'ready',
    'real',
    'rebel',
    'recondite',
    'red',
    'redundant',
    'relevant',
    'remote',
    'resolute',
    'resonant',
    'rich',
    'right',
    'rightful',
    'ripe',
    'ritzy',
    'robust',
    'romantic',
    'roomy',
    'rotten',
    'rough',
    'round',
    'royal',
    'rude',
    'sad',
    'safe',
    'salty',
    'same',
    'scarce',
    'scary',
    'scientific',
    'screeching',
    'second',
    'secret',
    'secure',
    'sedate',
    'seemly',
    'selfish',
    'senior',
    'separate',
    'severe',
    'shallow',
    'sharp',
    'shiny',
    'shocking',
    'short',
    'shrill',
    'shut',
    'shy',
    'sick',
    'significant',
    'silly',
    'simple',
    'sincere',
    'single',
    'skinny',
    'slight',
    'slim',
    'slimy',
    'slow',
    'small',
    'smelly',
    'smooth',
    'snobbish',
    'social',
    'soft',
    'somber',
    'soon',
    'sordid',
    'sore',
    'sorry',
    'sour',
    'southern',
    'spare',
    'special',
    'specific',
    'spicy',
    'splendid',
    'square',
    'squeamish',
    'stale',
    'standard',
    'standing',
    'steadfast',
    'steady',
    'steep',
    'stereotyped',
    'stiff',
    'still',
    'straight',
    'strange',
    'strict',
    'striped',
    'strong',
    'stupid',
    'sturdy',
    'subdued',
    'subsequent',
    'substantial',
    'sudden',
    'super',
    'superb',
    'superficial',
    'supreme',
    'sure',
    'sweet',
    'swift',
    'taboo',
    'tall',
    'tame',
    'tan',
    'tart',
    'tasteful',
    'tawdry',
    'telling',
    'temporary',
    'tender',
    'tense',
    'terrific',
    'tested',
    'thick',
    'thin',
    'thoughtful',
    'tidy',
    'tight',
    'tiny',
    'top',
    'torpid',
    'tough',
    'tranquil',
    'trite',
    'true',
    'ugly',
    'ultra',
    'unbecoming',
    'understood',
    'uneven',
    'unfair',
    'unlikely',
    'unruly',
    'unsightly',
    'untidy',
    'unwritten',
    'upbeat',
    'upper',
    'uppity',
    'upset',
    'upstairs',
    'uptight',
    'used',
    'useful',
    'utter',
    'uttermost',
    'vagabond',
    'vague',
    'vanilla',
    'various',
    'vast',
    'vengeful',
    'verdant',
    'violet',
    'volatile',
    'vulgar',
    'wanting',
    'warm',
    'wary',
    'wasteful',
    'weak',
    'weary',
    'weekly',
    'weird',
    'welcome',
    'western',
    'wet',
    'white',
    'whole',
    'wholesale',
    'wide',
    'wild',
    'windy',
    'wiry',
    'wise',
    'wistful',
    'womanly',
    'wooden',
    'woozy',
    'wound',
    'wrong',
    'wry',
    'yellow',
    'young',
    'zany',
    'sacred',
    //words that have good comparative/superlative forms
    'aggressive',
    'awesome',
    'beautiful',
    'bored',
    'boring',
    'clean',
    'dirty',
    'efficient',
    'gruesome',
    'handsome',
    'innocent',
    'lean',
    'little',
    'long',
    'mean',
    'normal',
    'proud',
    'rapid',
    'scared',
    'smart',
    'thirsty',
    'hungry',
    'clear',
    'happy',
    'lucky',
    'pretty',
    'interesting',
    'attractive',
    'dangerous',
    'intellegent',
    'formal',
    'tired',
    'solid',
    'angry',
    "unknown",
    "detailed",
    "ongoing",
    "prominent",
    "permanent",
    "diverse",
    "partial",
    "moderate",
    "contemporary",
    "intense",
    "widespread",
    "ultimate",
    "ideal",
    "adequate",
    "sophisticated",
    "naked",
    "dominant",
    "precise",
    "intact",
    "adverse",
    "genuine",
    "subtle",
    "universal",
    "resistant",
    "routine",
    "distant",
    "unexpected",
    "soviet",
    "blind",
    "artificial",
    "mild",
    "legitimate",
    "unpublished",
    "superior",
    "intermediate",
    "everyday",
    "dumb",
    "excess",
    "sexy",
    "fake",
    "monthly",
    "premature",
    "sheer",
    "generic",
    "insane",
    "contrary",
    "twin",
    "upcoming",
    "bottom",
    "costly",
    "indirect",
    "sole",
    "unrelated",
    "hispanic",
    "improper",
    "underground",
    "legendary",
    "reluctant",
    "beloved",
    "inappropriate",
    "corrupt",
    "irrelevant",
    "justified",
    "obscure",
    "profound",
    "hostile",
    "influential",
    "inadequate",
    "abstract",
    "timely",
    "authentic",
    "bold",
    "intimate",
    "straightforward",
    "rival",
    "right-wing",
    "racist",
    "symbolic",
    "unprecedented",
    "loyal",
    "talented",
    "troubled",
    "noble",
    "instant",
    "incorrect",
    "dense",
    "blond",
    "deliberate",
    "blank",
    "rear",
    "feminine",
    "apt",
    "stark",
    "alcoholic",
    "teenage",
    "vibrant",
    "humble",
    "vain",
    "covert",
    "bland",
    "trendy",
    "foul",
    "populist",
    "alarming",
    "hooked",
    "wicked",
    "deaf",
    "left-wing",
    "lousy",
    "malignant",
    "stylish",
    "upscale",
    "hourly",
    "refreshing",
    "cozy",
    "slick",
    "dire",
    "yearly",
    "inbred",
    "part-time",
    "finite",
    "backwards",
    "nightly",
    "unauthorized",
    "cheesy",
    "indoor",
    "surreal",
    "bald",
    "masculine",
    "shady",
    "spirited",
    "eerie",
    "horrific",
    "smug",
    "stern",
    "hefty",
    "savvy",
    "bogus",
    "elaborate",
    "gloomy",
    "pristine",
    "extravagant",
    "serene",
    "advanced",
    "perverse",
    "devout",
    "crisp",
    "rosy",
    "slender",
    "melancholy",
    "faux",
    "phony",
    "danish",
    "lofty",
    "nuanced",
    "lax",
    "adept",
    "barren",
    "shameful",
    "sleek",
    "solemn",
    "vacant",
    "dishonest",
    "brisk",
    "fluent",
    "insecure",
    "humid",
    "menacing",
    "moot",
    "soothing",
    "self-loathing",
    "far-reaching",
    "harrowing",
    "scathing",
    "perplexing",
    "calming",
    "unconvincing",
    "unsuspecting",
    "unassuming",
    "surprising",
    "unappealing",
    "vexing",
    "unending",
    "easygoing",
    "appetizing",
    "disgruntled",
    "retarded",
    "undecided",
    "unregulated",
    "unsupervised",
    "unrecognized",
    "crazed",
    "distressed",
    "jagged",
    "paralleled",
    "cramped",
    "warped",
    "antiquated",
    "fabled",
    "deranged",
    "diseased",
    "ragged",
    "intoxicated",
    "hallowed",
    "crowded",
    "ghastly",
    "disorderly",
    "saintly",
    "wily",
    "sly",
    "sprightly",
    "ghostly",
    "oily",
    "hilly",
    "grisly",
    "earthly",
    "friendly",
    "unwieldy",
    "many",
    "most",
    "last",
    "expected",
    "long",
    "far",
    "due",
    "divine",
    "all",
    "together",
    "only",
    "outside",
    "multiple",
    "appropriate",
    "evil",
    "favorite",
    "limited",
    "random",
    "republican",
    "okay",
    "essential",
    "secondary",
    "gay",
    "south",
    "pro",
    "northern",
    "urban",
    "acute",
    "prime",
    "arab",
    "overnight",
    "mixed",
    "crucial",
    "behind",
    "above",
    "beyond",
    "against",
    "under",
    "other",
    "less"
  ]

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }

  return main
})()

//most-frequent non-irregular verbs, to be conjugated for the lexicon
//this list is the seed, from which various forms are conjugated
var verbs = (function() {
    //verbs
    var main = [
      "collapse",
      "stake",
      "forsee",
      "suck",
      "answer",
      "argue",
      "tend",
      "examine",
      "depend",
      "form",
      "figure",
      "mind",
      "surround",
      "suspect",
      "reflect",
      "wonder",
      "hope",
      "end",
      "thank",
      "file",
      "regard",
      "report",
      "imagine",
      "consider",
      "ensure",
      "cause",
      "work",
      "enter",
      "stop",
      "defeat",
      "surge",
      "launch",
      "turn",
      "like",
      "control",
      "relate",
      "remember",
      "join",
      "listen",
      "train",
      "spring",
      "enjoy",
      "fail",
      "recognize",
      "obtain",
      "learn",
      "fill",
      "announce",
      "prevent",
      "achieve",
      "realize",
      "involve",
      "remove",
      "aid",
      "visit",
      "test",
      "prepare",
      "ask",
      "carry",
      "suppose",
      "determine",
      "raise",
      "love",
      "use",
      "pull",
      "improve",
      "contain",
      "offer",
      "talk",
      "pick",
      "care",
      "express",
      "remain",
      "operate",
      "close",
      "add",
      "mention",
      "support",
      "decide",
      "walk",
      "vary",
      "demand",
      "describe",
      "agree",
      "happen",
      "allow",
      "suffer",
      "study",
      "press",
      "watch",
      "seem",
      "occur",
      "contribute",
      "claim",
      "compare",
      "apply",
      "direct",
      "discuss",
      "indicate",
      "require",
      "change",
      "fix",
      "reach",
      "prove",
      "expect",
      "exist",
      "play",
      "permit",
      "kill",
      "charge",
      "increase",
      "believe",
      "create",
      "continue",
      "live",
      "help",
      "represent",
      "edit",
      "serve",
      "appear",
      "cover",
      "maintain",
      "start",
      "stay",
      "move",
      "extend",
      "design",
      "supply",
      "suggest",
      "want",
      "approach",
      "call",
      "include",
      "try",
      "receive",
      "save",
      "discover",
      "marry",
      "need",
      "establish",
      "keep",
      "assume",
      "attend",
      "unite",
      "explain",
      "publish",
      "accept",
      "settle",
      "reduce",
      "do",
      "look",
      "interact",
      "concern",
      "labor",
      "return",
      "select",
      "die",
      "provide",
      "seek",
      "wish",
      "finish",
      "follow",
      "disagree",
      "produce",
      "attack",
      "attempt",
      "brake",
      "brush",
      "burn",
      "bang",
      "bomb",
      "budget",
      "comfort",
      "cook",
      "copy",
      "cough",
      "crush",
      "cry",
      "check",
      "claw",
      "clip",
      "combine",
      "damage",
      "desire",
      "doubt",
      "drain",
      "dance",
      "decrease",
      "defect",
      "deposit",
      "drift",
      "dip",
      "dive",
      "divorce",
      "dream",
      "exchange",
      "envy",
      "exert",
      "exercise",
      "export",
      "fold",
      "flood",
      "focus",
      "forecast",
      "fracture",
      "grip",
      "guide",
      "guard",
      "guarantee",
      "guess",
      "hate",
      "heat",
      "handle",
      "hire",
      "host",
      "hunt",
      "hurry",
      "import",
      "judge",
      "jump",
      "jam",
      "kick",
      "kiss",
      "knock",
      "laugh",
      "lift",
      "lock",
      "lecture",
      "link",
      "load",
      "loan",
      "lump",
      "melt",
      "message",
      "murder",
      "neglect",
      "overlap",
      "overtake",
      "overuse",
      "print",
      "protest",
      "pump",
      "push",
      "post",
      "progress",
      "promise",
      "purchase",
      "regret",
      "request",
      "reward",
      "roll",
      "rub",
      "rent",
      "repair",
      "sail",
      "scale",
      "screw",
      "shock",
      "sleep",
      "slip",
      "smash",
      "smell",
      "smoke",
      "sneeze",
      "snow",
      "surprise",
      "scratch",
      "search",
      "share",
      "shave",
      "spit",
      "splash",
      "stain",
      "stress",
      "switch",
      "taste",
      "touch",
      "trade",
      "trick",
      "twist",
      "trap",
      "travel",
      "tune",
      "undergo",
      "undo",
      "uplift",
      "vote",
      "wash",
      "wave",
      "whistle",
      "wreck",
      "yawn",
      "betray",
      "restrict",
      "perform",
      "worry",
      "point",
      "activate",
      "fear",
      "plan",
      "note",
      "face",
      "predict",
      "differ",
      "deserve",
      "torture",
      "recall",
      "count",
      "admit",
      "insist",
      "lack",
      "pass",
      "belong",
      "complain",
      "constitute",
      "rely",
      "refuse",
      "range",
      "cite",
      "flash",
      "arrive",
      "reveal",
      "consist",
      "observe",
      "notice",
      "trust",
      "display",
      "view",
      "stare",
      "acknowledge",
      "owe",
      "gaze",
      "treat",
      "account",
      "gather",
      "address",
      "confirm",
      "estimate",
      "manage",
      "participate",
      "sneak",
      "drop",
      "mirror",
      "experience",
      "strive",
      "arch",
      "dislike",
      "favor",
      "earn",
      "emphasize",
      "match",
      "question",
      "emerge",
      "encourage",
      "matter",
      "name",
      "head",
      "line",
      "slam",
      "list",
      "warn",
      "ignore",
      "resemble",
      "feature",
      "place",
      "reverse",
      "accuse",
      "spoil",
      "retain",
      "survive",
      "praise",
      "function",
      "please",
      "date",
      "remind",
      "deliver",
      "echo",
      "engage",
      "deny",
      "yield",
      "center",
      "gain",
      "anticipate",
      "reason",
      "side",
      "thrive",
      "defy",
      "dodge",
      "enable",
      "applaud",
      "bear",
      "persist",
      "pose",
      "reject",
      "attract",
      "await",
      "inhibit",
      "declare",
      "process",
      "risk",
      "urge",
      "value",
      "block",
      "confront",
      "credit",
      "cross",
      "amuse",
      "dare",
      "resent",
      "smile",
      "gloss",
      "threaten",
      "collect",
      "depict",
      "dismiss",
      "submit",
      "benefit",
      "step",
      "deem",
      "limit",
      "sense",
      "issue",
      "embody",
      "force",
      "govern",
      "replace",
      "bother",
      "cater",
      "adopt",
      "empower",
      "outweigh",
      "alter",
      "enrich",
      "influence",
      "prohibit",
      "pursue",
      "warrant",
      "convey",
      "approve",
      "reserve",
      "rest",
      "strain",
      "wander",
      "adjust",
      "dress",
      "market",
      "mingle",
      "disapprove",
      "evaluate",
      "flow",
      "inhabit",
      "pop",
      "rule",
      "depart",
      "roam",
      "assert",
      "disappear",
      "envision",
      "pause",
      "afford",
      "challenge",
      "grab",
      "grumble",
      "house",
      "portray",
      "revel",
      "base",
      "conduct",
      "review",
      "stem",
      "crave",
      "mark",
      "store",
      "target",
      "unlock",
      "weigh",
      "resist",
      "drag",
      "pour",
      "reckon",
      "assign",
      "cling",
      "rank",
      "attach",
      "decline",
      "destroy",
      "interfere",
      "paint",
      "skip",
      "sprinkle",
      "wither",
      "allege",
      "retire",
      "score",
      "monitor",
      "expand",
      "honor",
      "pack",
      "assist",
      "float",
      "appeal",
      "stretch",
      "undermine",
      "assemble",
      "boast",
      "bounce",
      "grasp",
      "install",
      "borrow",
      "crack",
      "elect",
      "shout",
      "contrast",
      "overcome",
      "relax",
      "relent",
      "strengthen",
      "conform",
      "dump",
      "pile",
      "scare",
      "relive",
      "resort",
      "rush",
      "boost",
      "cease",
      "command",
      "excel",
      "plug",
      "plunge",
      "proclaim",
      "discourage",
      "endure",
      "ruin",
      "stumble",
      "abandon",
      "cheat",
      "convince",
      "merge",
      "convert",
      "harm",
      "multiply",
      "overwhelm",
      "chew",
      "invent",
      "bury",
      "wipe",
      "added",
      "took",
      "define",
      "goes",
      "measure",
      "enhance",
      "distinguish",
      "avoid"
    ]

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }

  return main
})()

//common terms that are multi-word, but one part-of-speech
var multiples = (function() {

  var main = {
    "of course": "RB",
    "at least": "RB",
    "no longer": "RB",
    "sort of": "RB",
    "at first": "RB",
    "once again": "RB",
    "once more": "RB",
    "up to": "RB",
    "by now": "RB",
    "all but": "RB",
    "just about": "RB",
    "on board": "JJ",
    "a lot": "RB",
    "by far": "RB",
    "at best": "RB",
    "at large": "RB",
    "for good": "RB",
    "vice versa": "JJ",
    "en route": "JJ",
    "for sure": "RB",
    "upside down": "JJ",
    "at most": "RB",
    "per se": "RB",
    "at worst": "RB",
    "upwards of": "RB",
    "en masse": "RB",
    "point blank": "RB",
    "up front": "JJ",
    "in situ": "JJ",
    "in vitro": "JJ",
    "ad hoc": "JJ",
    "de facto": "JJ",
    "ad infinitum": "JJ",
    "ad nauseam": "RB",
    "for keeps": "JJ",
    "a priori": "FW",
    "et cetera": "FW",
    "off guard": "JJ",
    "spot on": "JJ",
    "ipso facto": "JJ",
    "not withstanding": "RB",
    "de jure": "RB",
    "a la": "IN",
    "ad hominem": "NN",
    "par excellence": "RB",
    "de trop": "RB",
    "a posteriori": "RB",
    "fed up": "JJ",
    "brand new": "JJ",
    "old fashioned": "JJ",
    "bona fide": "JJ",
    "well off": "JJ",
    "far off": "JJ",
    "straight forward": "JJ",
    "hard up": "JJ",
    "sui generis": "JJ",
    "en suite": "JJ",
    "avant garde": "JJ",
    "sans serif": "JJ",
    "gung ho": "JJ",
    "super duper": "JJ"
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }

  return main
})()

//adjectival forms of place names, as adjectives.
var demonyms = (function() {
  var main = [
    "afghan",
    "albanian",
    "algerian",
    "argentine",
    "armenian",
    "australian",
    "aussie",
    "austrian",
    "bangladeshi",
    "belgian",
    "bolivian",
    "bosnian",
    "brazilian",
    "bulgarian",
    "cambodian",
    "canadian",
    "chilean",
    "chinese",
    "colombian",
    "croat",
    "cuban",
    "czech",
    "dominican",
    "egyptian",
    "british",
    "estonian",
    "ethiopian",
    "finnish",
    "french",
    "gambian",
    "georgian",
    "german",
    "greek",
    "haitian",
    "hungarian",
    "indian",
    "indonesian",
    "iranian",
    "iraqi",
    "irish",
    "israeli",
    "italian",
    "jamaican",
    "japanese",
    "jordanian",
    "kenyan",
    "korean",
    "kuwaiti",
    "latvian",
    "lebanese",
    "liberian",
    "libyan",
    "lithuanian",
    "macedonian",
    "malaysian",
    "mexican",
    "mongolian",
    "moroccan",
    "dutch",
    "nicaraguan",
    "nigerian",
    "norwegian",
    "omani",
    "pakistani",
    "palestinian",
    "filipino",
    "polish",
    "portuguese",
    "qatari",
    "romanian",
    "russian",
    "rwandan",
    "samoan",
    "saudi",
    "scottish",
    "senegalese",
    "serbian",
    "singaporean",
    "slovak",
    "somali",
    "sudanese",
    "swedish",
    "swiss",
    "syrian",
    "taiwanese",
    "thai",
    "tunisian",
    "ugandan",
    "ukrainian",
    "american",
    "hindi",
    "spanish",
    "venezuelan",
    "vietnamese",
    "welsh",
    "african",
    "european",
    "asian",
    "californian",
  ]

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main

})()

//terms that are "CD", a 'value' term
var values = (function() {

  var main = [
    //numbers
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
    'hundred',
    'thousand',
    'million',
    'billion',
    'trillion',
    'quadrillion',
    'quintillion',
    'sextillion',
    'septillion',
    'octillion',
    'nonillion',
    'decillion',

    //dates
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
    "january",
    "february",
    // "march",
    "april",
    // "may",
    "june",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ].reduce(function(h,s){
    h[s]="CD"
    return h
  },{})

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }

  return main
})()

// converts spoken numbers into integers  "fifty seven point eight" -> 57.8
//
// Spoken numbers take the following format
// [sixty five] (thousand) [sixty five] (hundred) [sixty five]
// aka: [one/teen/ten] (multiple) [one/teen/ten] (multiple) ...
// combile the [one/teen/ten]s as 'current_sum', then multiply it by its following multiple
// multiples not repeat

var to_number = (function() {
  "use strict";
  //these sets of numbers each have different rules
  //[tenth, hundreth, thousandth..] are ambiguous because they could be ordinal like fifth, or decimal like one-one-hundredth, so are ignored
  var ones = {
    'a': 1,
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    "first": 1,
    "second": 2,
    "third": 3,
    "fourth": 4,
    "fifth": 5,
    "sixth": 6,
    "seventh": 7,
    "eighth": 8,
    "ninth": 9
  }
  var teens = {
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    "eleventh": 11,
    "twelfth": 12,
    "thirteenth": 13,
    "fourteenth": 14,
    "fifteenth": 15,
    "sixteenth": 16,
    "seventeenth": 17,
    "eighteenth": 18,
    "nineteenth": 19
  }
  var tens = {
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90,
    "twentieth": 20,
    "thirtieth": 30,
    "fourtieth": 40,
    "fiftieth": 50,
    "sixtieth": 60,
    "seventieth": 70,
    "eightieth": 80,
    "ninetieth": 90
  }
  var multiples = {
      'hundred': 100,
      'grand': 1000,
      'thousand': 1000,
      'million': 1000000,
      'billion': 1000000000,
      'trillion': 1000000000000,
      'quadrillion': 1000000000000000,
      'quintillion': 1000000000000000000,
      'sextillion': 1000000000000000000000,
      'septillion': 1000000000000000000000000,
      'octillion': 1000000000000000000000000000,
      'nonillion': 1000000000000000000000000000000,
      'decillion': 1000000000000000000000000000000000
    }
    // var decimal_multiples={'tenth':0.1, 'hundredth':0.01, 'thousandth':0.001, 'millionth':0.000001,'billionth':0.000000001};

  var main = function(s) {
    //remember these concerns for possible errors
    var ones_done = false
    var teens_done = false
    var tens_done = false
    var multiples_done = {}
    var total = 0
    var global_multiplier = 1
      //pretty-printed numbers
    s = s.replace(/, ?/g, '')
    //parse-out currency
    s = s.replace(/[$£€]/, '')
    //try to finish-fast
    if (s.match(/[0-9]\.[0-9]/) && parseFloat(s) == s) {
      return parseFloat(s)
    }
    if (parseInt(s, 10) == s) {
      return parseInt(s, 10)
    }
    //try to die fast. (phone numbers or times)
    if (s.match(/[0-9][\-:][0-9]/)) {
      return null
    }
    //support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5
    var mults = [{
      reg: /^(minus|negative)[\s\-]/i,
      mult: -1
    }, {
      reg: /^(a\s)?half[\s\-](of\s)?/i,
      mult: 0.5
    }, {
      reg: /^(a\s)?quarter[\s\-]/i,
      mult: 0.25
    }]
    for (i = 0; i < mults.length; i++) {
      if (s.match(mults[i].reg)) {
        global_multiplier = mults[i].mult
        s = s.replace(mults[i].reg, '')
        break;
      }
    }

    //do each word in turn..
    var words = s.toString().split(/[\s\-]+/);
    var w, x;
    var current_sum = 0;
    var local_multiplier = 1
    var decimal_mode = false
    for (var i = 0; i < words.length; i++) {
      w = words[i]

      //skip 'and' eg. five hundred and twelve
      if (w == "and") {
        continue;
      }

      //..we're doing decimals now
      if (w == "point" || w == "decimal") {
        if (decimal_mode) {
          return null
        } //two point one point six
        decimal_mode = true
        total += current_sum
        current_sum = 0
        ones_done = false
        local_multiplier = 0.1
        continue;
      }

      //handle special rules following a decimal
      if (decimal_mode) {
        x = null
        //allow consecutive ones in decimals eg. 'two point zero five nine'
        if (ones[w] !== undefined) {
          x = ones[w]
        }
        if (teens[w] !== undefined) {
          x = teens[w]
        }
        if (parseInt(w, 10) == w) {
          x = parseInt(w, 10)
        }
        if (!x) {
          return null
        }
        if (x < 10) {
          total += x * local_multiplier
          local_multiplier = local_multiplier * 0.1 // next number is next decimal place
          current_sum = 0
          continue;
        }
        //two-digit decimals eg. 'two point sixteen'
        if (x < 100) {
          total += x * (local_multiplier * 0.1)
          local_multiplier = local_multiplier * 0.01 // next number is next decimal place
          current_sum = 0
          continue;
        }
      }

      //if it's already an actual number
      if (w.match(/^[0-9]\.[0-9]$/)) {
        current_sum += parseFloat(w)
        continue;
      }
      if (parseInt(w, 10) == w) {
        current_sum += parseInt(w, 10)
        continue;
      }

      //ones rules
      if (ones[w] !== undefined) {
        if (ones_done) {
          return null
        } // eg. five seven
        if (teens_done) {
          return null
        } // eg. five seventeen
        ones_done = true
        current_sum += ones[w]
        continue;
      }
      //teens rules
      if (teens[w]) {
        if (ones_done) {
          return null
        } // eg. five seventeen
        if (teens_done) {
          return null
        } // eg. fifteen seventeen
        if (tens_done) {
          return null
        } // eg. sixty fifteen
        teens_done = true
        current_sum += teens[w]
        continue;
      }
      //tens rules
      if (tens[w]) {
        if (ones_done) {
          return null
        } // eg. five seventy
        if (teens_done) {
          return null
        } // eg. fiveteen seventy
        if (tens_done) {
          return null
        } // eg. twenty seventy
        tens_done = true
        current_sum += tens[w]
        continue;
      }
      //multiples rules
      if (multiples[w]) {
        if (multiples_done[w]) {
          return null
        } // eg. five hundred six hundred
        multiples_done[w] = true
        //reset our concerns. allow 'five hundred five'
        ones_done = false
        teens_done = false
        tens_done = false
        //case of 'hundred million', (2 consecutive multipliers)
        if (current_sum === 0) {
          total = total || 1 //dont ever multiply by 0
          total *= multiples[w]
        } else {
          current_sum *= multiples[w]
          total += current_sum
        }
        current_sum = 0
        continue;
      }
      //if word is not a known thing now, die
      return null
    }
    if (current_sum) {
      total += (current_sum || 1) * local_multiplier
    }
    //combine with global multiplier, like 'minus' or 'half'
    total = total * global_multiplier

    return total
  }

  //kick it into module
  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main;
})()

// console.log(to_number("sixteen hundred"))
// console.log(to_number("a hundred"))
// console.log(to_number("four point seven seven"))

// #generates properly-formatted dates from free-text date forms
// #by spencer kelly 2014

var date_extractor = (function() {
  var months = "(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|aug|sept|oct|nov|dec),?";
  var days = "([0-9]{1,2}),?";
  var years = "([12][0-9]{3})";

  var to_obj = function(arr, places) {
    return Object.keys(places).reduce(function(h, k) {
      h[k] = arr[places[k]];
      return h;
    }, {});
  }

  var regexes = [{
    reg: String(months) + " " + String(days) + "-" + String(days) + " " + String(years),
    example: "March 7th-11th 1987",
    process: function(arr) {
      var places;
      if (!arr) {
        arr = [];
      }
      places = {
        month: 1,
        day: 2,
        to_day: 3,
        year: 4
      };
      return to_obj(arr, places);
    }
  }, {
    reg: String(days) + " of " + String(months) + " to " + String(days) + " of " + String(months) + ",? " + String(years),
    example: "28th of September to 5th of October 2008",
    process: function(arr) {
      var places;
      if (!arr) {
        arr = [];
      }
      places = {
        day: 1,
        month: 2,
        to_day: 3,
        to_month: 4,
        to_year: 5
      };
      return to_obj(arr, places);
    }
  }, {
    reg: String(months) + " " + String(days) + " to " + String(months) + " " + String(days) + " " + String(years),
    example: "March 7th to june 11th 1987",
    process: function(arr) {
      var places;
      if (!arr) {
        arr = [];
      }
      places = {
        month: 1,
        day: 2,
        to_month: 3,
        to_day: 4,
        year: 5,
        to_year: 5
      };
      return to_obj(arr, places);
    }
  }, {
    reg: "between " + String(days) + " " + String(months) + " and " + String(days) + " " + String(months) + " " + String(years),
    example: "between 13 February and 15 February 1945",
    process: function(arr) {
      var places;
      if (!arr) {
        arr = [];
      }
      places = {
        day: 1,
        month: 2,
        to_day: 3,
        to_month: 4,
        year: 5,
        to_year: 5
      };
      return to_obj(arr, places);
    }
  }, {
    reg: "between " + String(months) + " " + String(days) + " and " + String(months) + " " + String(days) + " " + String(years),
    example: "between March 7th and june 11th 1987",
    process: function(arr) {
      var places;
      if (!arr) {
        arr = [];
      }
      places = {
        month: 1,
        day: 2,
        to_month: 3,
        to_day: 4,
        year: 5,
        to_year: 5
      };
      return to_obj(arr, places);
    }
  }, {
    reg: String(months) + " " + String(days) + " " + String(years),
    example: "March 1st 1987",
    process: function(arr) {
      var places;
      if (!arr) {
        arr = [];
      }
      places = {
        month: 1,
        day: 2,
        year: 3
      };
      return to_obj(arr, places);
    }
  }, {
    reg: String(days) + " - " + String(days) + " of " + String(months) + ",? " + String(years),
    example: "3rd - 5th of March 1969",
    process: function(arr) {
      var places;
      if (!arr) {
        arr = [];
      }
      places = {
        day: 1,
        to_day: 2,
        month: 3,
        year: 4
      };
      return to_obj(arr, places);
    }
  }, {
    reg: String(days) + " of " + String(months) + ",? " + String(years),
    example: "3rd of March 1969",
    process: function(arr) {
      var places;
      if (!arr) {
        arr = [];
      }
      places = {
        day: 1,
        month: 2,
        year: 3
      };
      return to_obj(arr, places);
    }
  }, {
    reg: String(months) + " " + years + ",? to " + String(months) + " " + String(years),
    example: "September 1939 to April 1945",
    process: function(arr) {
      var places;
      if (!arr) {
        arr = [];
      }
      places = {
        month: 1,
        year: 2,
        to_month: 3,
        to_year: 4
      };
      return to_obj(arr, places);
    }
  }, {
    reg: String(months) + " " + String(years),
    example: "March 1969",
    process: function(arr) {
      var places;
      if (!arr) {
        arr = [];
      }
      places = {
        month: 1,
        year: 2
      };
      return to_obj(arr, places);
    }
  }, {
    reg: String(months) + " " + days,
    example: "March 18th",
    process: function(arr) {
      var places;
      if (!arr) {
        arr = [];
      }
      places = {
        month: 1,
        day: 2
      };
      return to_obj(arr, places);
    }
  }, {
    reg: String(days) + " of " + months,
    example: "18th of March",
    process: function(arr) {
      var places;
      if (!arr) {
        arr = [];
      }
      places = {
        month: 2,
        day: 1
      };
      return to_obj(arr, places);
    }
  }, {
    reg: years + " ?- ?" + String(years),
    example: "1997-1998",
    process: function(arr) {
      var places;
      if (!arr) {
        arr = [];
      }
      places = {
        year: 1,
        to_year: 2
      };
      return to_obj(arr, places);
    }
  }, {
    reg: years,
    example: "1998",
    process: function(arr) {
      var places;
      if (!arr) {
        arr = [];
      }
      places = {
        year: 1
      };
      return to_obj(arr, places);
    }
  }].map(function(o) {
    o.reg = new RegExp(o.reg, "g");
    return o;
  });

  //0 based months, 1 based days...
  var months_obj = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    aug: 7,
    sept: 8,
    oct: 9,
    nov: 10,
    dec: 11
  };

  //thirty days hath september...
  var last_dates = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  var preprocess = function(str) {
    str = str.toLowerCase();
    str = str.replace(/([0-9])(th|rd|st)/g, '$1');
    return str;
  };

  var postprocess = function(obj, options) {
    var d;
    d = new Date();
    options = options || {};
    obj.year = parseInt(obj.year, 10) || undefined;
    obj.day = parseInt(obj.day, 10) || undefined;
    obj.to_day = parseInt(obj.to_day, 10) || undefined;
    obj.to_year = parseInt(obj.to_year, 10) || undefined;
    obj.month = months_obj[obj.month];
    obj.to_month = months_obj[obj.to_month];
    //swap to_month and month
    if (obj.to_month !== undefined && obj.month === undefined) {
      obj.month = obj.to_month;
    }
    if (obj.to_month === undefined && obj.month !== undefined) {
      obj.to_month = obj.month;
    }
    //swap to_year and year
    if (obj.to_year && !obj.year) {
      obj.year = obj.to_year;
    }
    if (!obj.to_year && obj.year && obj.to_month !== undefined) {
      obj.to_year = obj.year;
    }
    if (options.assume_year && !obj.year) {
      obj.year = d.getFullYear();
    }
    //make sure date is in that month..
    if (obj.day !== undefined && (obj.day > 31 || (obj.month !== undefined && obj.day > last_dates[obj.month]))) {
      obj.day = undefined;
    }
    //make sure to date is after from date. fail everything if so...
    //todo: do this smarter
    if (obj.to_month !== undefined && obj.to_month < obj.month) {
      return {}
    }
    if (obj.to_year && obj.to_year < obj.year) {
      obj.year = undefined;
      obj.to_year = undefined;
    }

    //make sure date is in reasonable range (very opinionated)
    if (obj.year > 2090 || obj.year < 1200) {
      obj.year = undefined;
      obj.to_year = undefined;
    }
    //format result better
    obj = {
      day: obj.day,
      month: obj.month,
      year: obj.year,
      to: {
        day: obj.to_day,
        month: obj.to_month,
        year: obj.to_year
      }
    };
    //add javascript date objects, if you can
    if (obj.year && obj.day && obj.month !== undefined) {
      obj.date_object = new Date();
      obj.date_object.setYear(obj.year);
      obj.date_object.setMonth(obj.month);
      obj.date_object.setDate(obj.day);
    }
    if (obj.to.year && obj.to.day && obj.to.month !== undefined) {
      obj.to.date_object = new Date();
      obj.to.date_object.setYear(obj.to.year);
      obj.to.date_object.setMonth(obj.to.month);
      obj.to.date_object.setDate(obj.to.day);
    }
    //if we have enough data to return a result..
    if (obj.year || obj.month !== undefined) {
      return obj;
    }
    return {};
  };

  //pass through sequence of regexes until tempate is matched..
  var main = function(str, options) {
    var arr, good, obj, _i, _len;
    options = options || {};
    str = preprocess(str);
    for (_i = 0, _len = regexes.length; _i < _len; _i++) {
      obj = regexes[_i];
      if (str.match(obj.reg)) {
        arr = obj.reg.exec(str);
        good = obj.process(arr);
        good = postprocess(good, options);
        return good;
      }
    }
    return {};
  };

  //export modules
  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main;

})();

// console.log(date_extractor("january 6th 1998"))

//wrapper for value's methods
var Value = function(str, next, last, token) {
  var the = this
  the.word = str || '';

  if (typeof module !== "undefined" && module.exports) {
    to_number = require("./to_number")
    date_extractor = require("./date_extractor")
    parts_of_speech = require("../../data/parts_of_speech")
  }

  the.date = function(options) {
    options = options || {}
    return date_extractor(the.word, options)
  }

  the.is_date = function() {
    var months = /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|aug|sept|oct|nov|dec)/i
    var times = /1?[0-9]:[0-9]{2}/
    var days = /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tues|wed|thurs|fri|sat|sun)\b/i
    if (the.word.match(months) || the.word.match(times) || the.word.match(days)) {
      return true
    }
    return false
  }

  the.number = function() {
    if (the.is_date()) {
      return null
    }
    return to_number(the.word)
  }

  the.which = (function() {
    if (the.date()) {
      return parts_of_speech['DA']
    }
    if (the.number()) {
      return parts_of_speech['NU']
    }
    return parts_of_speech['CD']
  })()

  return the;
};
if (typeof module !== "undefined" && module.exports) {
  module.exports = Value;
}

// console.log(new Value("fifty five").number())
// console.log(new Value("june 5th 1998").date())

//chooses an indefinite aricle 'a/an' for a word
var indefinite_article = (function() {
  var main = function(str) {
    if (!str) {
      return null
    }
    var irregulars = {
      "hour": "an",
      "heir": "an",
      "heirloom": "an",
      "honest": "an",
      "honour": "an",
      "honor": "an",
      "uber": "an" //german u
    }

    var is_acronym = function(s) {
      //no periods
      if (s.length <= 5 && s.match(/^[A-Z]*$/)) {
        return true
      }
      //with periods
      if (s.length >= 4 && s.match(/^([A-Z]\.)*$/)) {
        return true
      }
      return false
    }

    //pronounced letters of acronyms that get a 'an'
    var an_acronyms = {
      A: true,
      E: true,
      F: true,
      H: true,
      I: true,
      L: true,
      M: true,
      N: true,
      O: true,
      R: true,
      S: true,
      X: true
    }

    //'a' regexes
    var a_regexs = [
      /^onc?e/i, //'wu' sound of 'o'
      /^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
      /^eul/i
    ];

    //begin business time
    ////////////////////
    //explicit irregular forms
    if (irregulars.hasOwnProperty(str)) {
      return irregulars[str]
    }
    //spelled-out acronyms
    if (is_acronym(str) && an_acronyms.hasOwnProperty(str.substr(0, 1)) ) {
      return "an"
    }
    //'a' regexes
    for (var i = 0; i < a_regexs.length; i++) {
      if (str.match(a_regexs[i])) {
        return "a"
      }
    }
    //basic vowel-startings
    if (str.match(/^[aeiou]/i)) {
      return "an"
    }
    return "a"
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main;
})();

// console.log(indefinite_article("wolf") === "a")

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

//wrapper for noun's methods
var Noun = function(str, next, last, token) {
  var the = this
  the.word = str || '';
  the.next = next
  the.last = last

  if (typeof module !== "undefined" && module.exports) {
    parts_of_speech = require("../../data/parts_of_speech")
    inflect = require("./conjugate/inflect")
    indefinite_article = require("./indefinite_article")
    // is_entity = require("./ner/is_entity")
  }
  //personal pronouns
  var prps = {
    "it": "PRP",
    "they": "PRP",
    "i": "PRP",
    "them": "PRP",
    "you": "PRP",
    "she": "PRP",
    "me": "PRP",
    "he": "PRP",
    "him": "PRP",
    "her": "PRP",
    "us": "PRP",
    "we": "PRP",
    "thou": "PRP"
  }

  the.is_acronym = (function() {
    var s = the.word
      //no periods
    if (s.length <= 5 && s.match(/^[A-Z]*$/)) {
      return true
    }
    //with periods
    if (s.length >= 4 && s.match(/^([A-Z]\.)*$/)) {
      return true
    }
    return false
  })()

  the.is_entity = (function() {
    if (!token) {
      return false
    }
    var blacklist = {
        "itself": 1,
        "west": 1,
        "western": 1,
        "east": 1,
        "eastern": 1,
        "north": 1,
        "northern": 1,
        "south": 1,
        "southern": 1,
        "the": 1,
        "one": 1,
        "your": 1,
        "my": 1,
        "today": 1,
        "yesterday": 1,
        "tomorrow": 1,
        "era": 1,
        "century": 1,
        "it": 1
      }
      //prepositions
    if (prps[token.normalised]) {
      return false
    }
    //blacklist
    if (blacklist[token.normalised]) {
      return false
    }
    //discredit specific nouns forms
    if (token.pos) {
      if (token.pos.tag == "NNA") { //eg. 'singer'
        return false
      }
      if (token.pos.tag == "NNO") { //eg. "spencer's"
        return false
      }
      if (token.pos.tag == "NNG") { //eg. 'walking'
        return false
      }
      // if(token.pos.tag=="NNP"){//yes! eg. 'Edinburough'
      //    return true
      //  }
    }
    //distinct capital is very good signal
    if (token.special_capitalised) {
      return true
    }
    //multiple-word nouns are very good signal
    if (token.normalised.match(/ /)) {
      return true
    }
    //if it has an abbreviation, like 'business ltd.'
    if (token.normalised.match(/\./)) {
      return true
    }
    //acronyms are a-ok
    if (the.is_acronym) {
      return true
    }
    //else, be conservative
    return false
  })()

  the.conjugate = function() {
    return inflect.inflect(the.word)
  },

  the.is_plural = (function() {
    return inflect.is_plural(the.word)
  })()

  the.article = function() {
    return indefinite_article(the.word)
  }

  the.pluralize = function() {
    return (inflect.inflect(the.word) || {}).plural
  }
  the.singularize = function() {
    return (inflect.inflect(the.word) || {}).singular
  }

  //specifically which pos it is
  the.which = (function() {
    //posessive
    if (the.word.match(/'s$/)) {
      return parts_of_speech['NNO']
    }
    //noun-gerund
    if (the.word.match(/..ing$/)) {
      return parts_of_speech['NNG']
    }
    //personal pronoun
    if (prps[the.word]) {
      return parts_of_speech['PRP']
    }
    //proper nouns
    var first = the.word.substr(0, 1)
    if (first.toLowerCase() !== first) {
      if (the.is_acronym) {
        return parts_of_speech['NNPA']
      }
      if (the.is_plural) {
        return parts_of_speech['NNPS']
      }
      return parts_of_speech['NNP']
    }
    //plural
    if (the.is_plural) {
      return parts_of_speech['NNS']
    }
    //generic
    return parts_of_speech['NN']
  })()

  return the;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = Noun;
}

// console.log(new Noun('farmhouse').is_entity)
// console.log(new Noun("FBI").is_acronym)

//turns 'quickly' into 'quick'
var to_adjective = (function() {
  var main = function(str) {
    var irregulars = {
      "idly": "idle",
      "sporadically": "sporadic",
      "basically": "basic",
      "grammatically": "grammatical",
      "alphabetically": "alphabetical",
      "economically": "economical",
      "conically": "conical",
      "politically": "political",
      "vertically": "vertical",
      "practically": "practical",
      "theoretically": "theoretical",
      "critically": "critical",
      "fantastically": "fantastic",
      "mystically": "mystical",
      "pornographically": "pornographic",
      "fully": "full",
      "jolly": "jolly",
      "wholly": "whole"
    }
    var transforms = [{
      reg: /bly$/i,
      repl: 'ble'
    }, {
      reg: /gically$/i,
      repl: 'gical'
    }, {
      reg: /([rsdh])ically$/i,
      repl: '$1ical'
    }, {
      reg: /ically$/i,
      repl: 'ic'
    }, {
      reg: /uly$/i,
      repl: 'ue'
    }, {
      reg: /ily$/i,
      repl: 'y'
    }, {
      reg: /(.{3})ly$/i,
      repl: '$1'
    }]
    if (irregulars.hasOwnProperty(str)) {
      return irregulars[str]
    }
    for (var i = 0; i < transforms.length; i++) {
      if (str.match(transforms[i].reg)) {
        return str.replace(transforms[i].reg, transforms[i].repl)
      }
    }
    return str
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main;
})();

// console.log(to_adjective('quickly') === 'quick')
// console.log(to_adjective('marvelously') === 'marvelous')

//wrapper for Adverb's methods
var Adverb = function(str, next, last, token) {
  var the = this
  the.word = str || '';
  the.next = next
  the.last = last

  if (typeof module !== "undefined" && module.exports) {
    to_adjective = require("./conjugate/to_adjective")
    parts_of_speech = require("../../data/parts_of_speech")
  }

  the.conjugate = function() {
    return {
      adjective: to_adjective(the.word)
    }
  }

  the.which = (function() {
    if (the.word.match(/..est$/)) {
      return parts_of_speech['RBS']
    }
    if (the.word.match(/..er$/)) {
      return parts_of_speech['RBR']
    }
    return parts_of_speech['RB']
  })()

  return the;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Adverb;
}

// console.log(new Adverb("suddenly").conjugate())
// console.log(adverbs.conjugate('powerfully'))

// regex rules for each part of speech that convert it to all other parts of speech.
// used in combination with the generic 'fallback' method
var verb_rules = {
  "infinitive": [
    {
      "reg": /(eed)$/i,
      "repl": {
        "present": "$1s",
        "gerund": "$1ing",
        "past": "$1ed",
        "doer": "$1er"
      }
    },
    {
      "reg": /(e)(ep)$/i,
      "repl": {
        "present": "$1$2s",
        "gerund": "$1$2ing",
        "past": "$1pt",
        "doer": "$1$2er"
      }
    },
    {
      "reg": /(a[tg]|i[zn]|ur|nc|gl|is)e$/i,
      "repl": {
        "present": "$1es",
        "gerund": "$1ing",
        "past": "$1ed"
      },
      "exceptions": [
        "ate",
        "overate"
      ]
    },
    {
      "reg": /([i|f|rr])y$/i,
      "repl": {
        "present": "$1ies",
        "gerund": "$1ying",
        "past": "$1ied"
      }
    },
    {
      "reg": /([td]er)$/i,
      "repl": {
        "present": "$1s",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /([bd]l)e$/i,
      "repl": {
        "present": "$1es",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /(ish|tch|ess)$/i,
      "repl": {
        "present": "$1es",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /(ion|end|e[nc]t)$/i,
      "repl": {
        "present": "$1s",
        "gerund": "$1ing",
        "past": "$1ed"
      },
      "exceptions": [
        "sent",
        "bent",
        "overspent",
        "misspent",
        "went",
        "kent",
        "outwent",
        "forwent",
        "spent",
        "pent",
        "lent",
        "underwent",
        "rent",
        "unbent",
        "shent"
      ]
    },
    {
      "reg": /(om)e$/i,
      "repl": {
        "present": "$1es",
        "gerund": "$1ing",
        "past": "ame"
      }
    },
    {
      "reg": /([aeiu])([pt])$/i,
      "repl": {
        "present": "$1$2s",
        "gerund": "$1$2$2ing",
        "past": "$1$2"
      }
    },
    {
      "reg": /(er)$/i,
      "repl": {
        "present": "$1s",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /(en)$/i,
      "repl": {
        "present": "$1s",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    }
  ],
  "present": [
    {
      "reg": /(ies)$/i,
      "repl": {
        "infinitive": "y",
        "gerund": "ying",
        "past": "ied"
      }
    },
    {
      "reg": /(tch|sh)es$/i,
      "repl": {
        "infinitive": "$1",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /(ss)es$/i,
      "repl": {
        "infinitive": "$1",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /([tzlshicgrvdnkmu])es$/i,
      "repl": {
        "infinitive": "$1e",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$/i,
      "repl": {
        "infinitive": "$1",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /(ow)s$/i,
      "repl": {
        "infinitive": "$1",
        "gerund": "$1ing",
        "past": "ew"
      }
    },
    {
      "reg": /(op)s$/i,
      "repl": {
        "infinitive": "$1",
        "gerund": "$1ping",
        "past": "$1ped"
      }
    },
    {
      "reg": /([eirs])ts$/i,
      "repl": {
        "infinitive": "$1t",
        "gerund": "$1tting",
        "past": "$1tted"
      }
    },
    {
      "reg": /(ll)s$/i,
      "repl": {
        "infinitive": "$1",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /(el)s$/i,
      "repl": {
        "infinitive": "$1",
        "gerund": "$1ling",
        "past": "$1led"
      }
    },
    {
      "reg": /(ip)es$/i,
      "repl": {
        "infinitive": "$1e",
        "gerund": "$1ing",
        "past": "$1ed"
      }
    },
    {
      "reg": /ss$/i,
      "repl": {
        "infinitive": "ss",
        "gerund": "ssing",
        "past": "ssed"
      }
    },
    {
      "reg": /s$/i,
      "repl": {
        "infinitive": "",
        "gerund": "ing",
        "past": "ed"
      }
    }
  ],
  "gerund": [
    {
      "reg": /pping$/i,
      "repl": {
        "infinitive": "p",
        "present": "ps",
        "past": "pped"
      }
    },
    {
      "reg": /lling$/i,
      "repl": {
        "infinitive": "ll",
        "present": "lls",
        "past": "lled"
      }
    },
    {
      "reg": /tting$/i,
      "repl": {
        "infinitive": "t",
        "present": "ts",
        "past": "t"
      }
    },
    {
      "reg": /ssing$/i,
      "repl": {
        "infinitive": "ss",
        "present": "sses",
        "past": "ssed"
      }
    },
    {
      "reg": /gging$/i,
      "repl": {
        "infinitive": "g",
        "present": "gs",
        "past": "gged"
      }
    },
    {
      "reg": /([^aeiou])ying$/i,
      "repl": {
        "infinitive": "$1y",
        "present": "$1ies",
        "past": "$1ied",
        "doer": "$1ier"
      }
    },
    {
      "reg": /(i.)ing$/i,
      "repl": {
        "infinitive": "$1e",
        "present": "$1es",
        "past": "$1ed"
      }
    },
    {
      "reg": /(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$/i,
      "repl": {
        "infinitive": "$1e",
        "present": "$1es",
        "past": "$1ed"
      }
    },
    {
      "reg": /(ch|sh)ing$/i,
      "repl": {
        "infinitive": "$1",
        "present": "$1es",
        "past": "$1ed"
      }
    },
    {
      "reg": /(..)ing$/i,
      "repl": {
        "infinitive": "$1",
        "present": "$1s",
        "past": "$1ed"
      }
    }
  ],
  "past": [
    {
      "reg": /(ued)$/i,
      "repl": {
        "present": "ues",
        "gerund": "uing",
        "past": "ued",
        "doer": "uer"
      }
    },
    {
      "reg": /(e|i)lled$/i,
      "repl": {
        "present": "$1lls",
        "gerund": "$1lling",
        "past": "$1lled",
        "doer": "$1ller"
      }
    },
    {
      "reg": /(sh|ch)ed$/i,
      "repl": {
        "infinitive": "$1",
        "present": "$1es",
        "doer": "$1er",
        "gerund": "$1ing"
      }
    },
    {
      "reg": /(tl|gl)ed$/i,
      "repl": {
        "infinitive": "$1e",
        "present": "$1es",
        "doer": "$1er",
        "gerund": "$1ing"
      }
    },
    {
      "reg": /(ss)ed$/i,
      "repl": {
        "infinitive": "$1",
        "present": "$1es",
        "doer": "$1er",
        "gerund": "$1ing"
      }
    },
    {
      "reg": /pped$/i,
      "repl": {
        "infinitive": "p",
        "present": "ps",
        "doer": "pper",
        "gerund": "pping"
      }
    },
    {
      "reg": /tted$/i,
      "repl": {
        "infinitive": "t",
        "present": "ts",
        "doer": "tter",
        "gerund": "tting"
      }
    },
    {
      "reg": /gged$/i,
      "repl": {
        "infinitive": "g",
        "present": "gs",
        "doer": "gger",
        "gerund": "gging"
      }
    },
    {
      "reg": /(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$/i,
      "repl": {
        "infinitive": "$1",
        "present": "$1s",
        "doer": "$1er",
        "gerund": "$1ing"
      }
    },
    {
      "reg": /(..[^aeiou])ed$/i,
      "repl": {
        "infinitive": "$1e",
        "present": "$1es",
        "doer": "$1er",
        "gerund": "$1ing"
      }
    },
    {
      "reg": /ied$/i,
      "repl": {
        "infinitive": "y",
        "present": "ies",
        "doer": "ier",
        "gerund": "ying"
      }
    },
    {
      "reg": /(.o)ed$/i,
      "repl": {
        "infinitive": "$1o",
        "present": "$1os",
        "doer": "$1oer",
        "gerund": "$1oing"
      }
    },
    {
      "reg": /(.i)ed$/i,
      "repl": {
        "infinitive": "$1",
        "present": "$1s",
        "doer": "$1er",
        "gerund": "$1ing"
      }
    },
    {
      "reg": /([rl])ew$/i,
      "repl": {
        "infinitive": "$1ow",
        "present": "$1ows",
        "gerund": "$1owing"
      },
      "exceptions": [
        "brew",
        "drew",
        "withdrew",
        "crew",
        "screw",
        "unscrew"
      ]
    },
    {
      "reg": /([pl])t$/i,
      "repl": {
        "infinitive": "$1t",
        "present": "$1ts",
        "gerund": "$1ting"
      }
    }
  ]
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = verb_rules;
}

//somone who does this present-tense verb
//turn 'walk' into 'walker'
var verb_to_doer = (function() {
  var main = function(str) {
    str = str || ''
    var irregulars = {
      "tie": "tier",
      "dream": "dreamer",
      "sail": "sailer",
      "run": "runner",
      "rub": "rubber",
      "begin": "beginner",
      "win": "winner",
      "claim": "claimant",
      "deal": "dealer",
      "spin": "spinner"
    }
    var dont = {
      "aid": 1,
      "fail": 1,
      "appear": 1,
      "happen": 1,
      "seem": 1,
      "try": 1,
      "say": 1,
      "marry": 1,
      "be": 1,
      "forbid": 1,
      "understand": 1,
      "bet": 1
    }
    var transforms = [{
      reg: /e$/i,
      repl: 'er'
    }, {
      reg: /([aeiou])([mlgp])$/i,
      repl: '$1$2$2er'
    }, {
      reg: /([rlf])y$/i,
      repl: '$1ier'
    }, {
      reg: /^(.?.[aeiou])t$/i,
      repl: '$1tter'
    }]

    if (dont.hasOwnProperty(str)) {
      return null
    }
    if (irregulars.hasOwnProperty(str)) {
      return irregulars[str]
    }
    for (var i = 0; i < transforms.length; i++) {
      if (str.match(transforms[i].reg)) {
        return str.replace(transforms[i].reg, transforms[i].repl)
      }
    }
    return str + "er"
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main;
})();

// console.log(verb_to_doer('set'))
// console.log(verb_to_doer('sweep'))

//turn a verb into its other grammatical forms.
var verb_conjugate = (function() {

  if (typeof module !== "undefined" && module.exports) {
    verb_to_doer = require("./to_doer")
    verb_irregulars = require("./verb_irregulars")
    verb_rules = require("./verb_rules")
  }

  var predict = function(w) {
    //generated from test data
    var suffix_rules = {
      "ing": "gerund",
      "tes": "present",
      "ate": "infinitive",
      "zes": "present",
      "ize": "infinitive",
      "ers": "present",
      "les": "present",
      "es": "present",
      "ts": "present",
      "ns": "present",
      "er": "infinitive",
      "le": "infinitive",
      "acks": "present",
      "ends": "present",
      "ands": "present",
      "ocks": "present",
      "tion": "infinitive",
      "lays": "present",
      "rify": "infinitive",
      "eads": "present",
      "ress": "infinitive",
      "lls": "present",
      "els": "present",
      "ify": "infinitive",
      "age": "infinitive",
      "ils": "present",
      "ows": "present",
      "nce": "infinitive",
      "ect": "infinitive",
      "nds": "present",
      "ise": "infinitive",
      "ine": "infinitive",
      "nks": "present",
      "ish": "infinitive",
      "ace": "infinitive",
      "cks": "present",
      "ash": "infinitive",
      "ure": "infinitive",
      "tch": "infinitive",
      "ngs": "present",
      "end": "infinitive",
      "ack": "infinitive",
      "mps": "present",
      "ays": "present",
      "and": "infinitive",
      "ute": "infinitive",
      "ade": "infinitive",
      "ock": "infinitive",
      "ite": "infinitive",
      "rks": "present",
      "ase": "infinitive",
      "ose": "infinitive",
      "use": "infinitive",
      "ams": "present",
      "ars": "present",
      "ops": "present",
      "ffs": "present",
      "als": "present",
      "ive": "infinitive",
      "int": "infinitive",
      "nge": "infinitive",
      "urs": "present",
      "lds": "present",
      "ews": "present",
      "ips": "present",
      "lay": "infinitive",
      "est": "infinitive",
      "ain": "infinitive",
      "ant": "infinitive",
      "eed": "infinitive",
      "ed": "past",
      "s": "present",
      "lt": "past",
      "nt": "past",
      "pt": "past",
      "ew": "past",
      "ld": "past"
    }

    var endsWith = function(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    var arr = Object.keys(suffix_rules);
    for (var i = 0; i < arr.length; i++) {
      if (endsWith(w, arr[i])) {
        return suffix_rules[arr[i]]
      }
    }
    return "infinitive"
  }

  //fallback to this transformation if it has an unknown prefix
  var fallback = function(w) {
    var infinitive;
    if (w.length > 4) {
      infinitive = w.replace(/ed$/, '');
    } else {
      infinitive = w.replace(/d$/, '');
    }
    var present, past, gerund, doer;
    if (w.match(/[^aeiou]$/)) {
      gerund = w + "ing"
      past = w + "ed"
      if (w.match(/ss$/)) {
        present = w + "es" //'passes'
      } else {
        present = w + "s"
      }
      doer = verb_to_doer(infinitive)
    } else {
      gerund = w.replace(/[aeiou]$/, 'ing')
      past = w.replace(/[aeiou]$/, 'ed')
      present = w.replace(/[aeiou]$/, 'es')
      doer = verb_to_doer(infinitive)
    }
    return {
      infinitive: infinitive,
      present: present,
      past: past,
      gerund: gerund,
      doer: doer,
      future: "will " + infinitive
    }
  }

  //make sure object has all forms
  var fufill = function(obj, prefix) {
    if (!obj.infinitive) {
      return obj
    }
    if (!obj.gerund) {
      obj.gerund = obj.infinitive + 'ing'
    }
    if (!obj.doer) {
      obj.doer = verb_to_doer(obj.infinitive)
    }
    if (!obj.present) {
      obj.present = obj.infinitive + 's'
    }
    if (!obj.past) {
      obj.past = obj.infinitive + 'ed'
    }
    //add the prefix to all forms, if it exists
    if (prefix) {
      Object.keys(obj).forEach(function(k) {
        obj[k] = prefix + obj[k]
      })
    }
    //future is 'will'+infinitive
    if (!obj.future) {
      obj.future = "will " + obj.infinitive
    }
    return obj
  }

  var main = function(w) {
    if (!w) {
      return {}
    }
    //chop it if it's future-tense
    w = w.replace(/^will /i, '')
    //un-prefix the verb, and add it in later
    var prefix = (w.match(/^(over|under|re|anti|full)\-?/i) || [])[0]
    var verb = w.replace(/^(over|under|re|anti|full)\-?/i, '')
    //check irregulars
    var obj = {};
    var i, l;
    l = verb_irregulars.length
    for (i = 0; i < l; i++) {
      x = verb_irregulars[i]
      if (verb === x.present || verb === x.gerund || verb === x.past || verb === x.infinitive) {
        obj = JSON.parse(JSON.stringify(verb_irregulars[i])); // object 'clone' hack, to avoid mem leak
        return fufill(obj, prefix)
      }
    }
    //guess the tense, so we know which transormation to make
    var predicted = predict(w) || 'infinitive'

    //check against suffix rules
    l = verb_rules[predicted].length
    for (i = 0; i < l; i++) {
      var r = verb_rules[predicted][i];
      if (w.match(r.reg)) {
        obj[predicted] = w;
        Object.keys(r.repl).forEach(function(k) {
          if (k === predicted) {
            obj[k] = w
          } else {
            obj[k] = w.replace(r.reg, r.repl[k])
          }
        });
        return fufill(obj);
      }
    }

    //produce a generic transformation
    return fallback(w)
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main
})()

// console.log(verb_conjugate("swing"))
// console.log(verb_conjugate("walking"))

//wrapper for verb's methods
var Verb = function(str, next, last, token) {
  var the = this
  the.word = str || '';
  the.next = next
  the.last = last

  if (typeof module !== "undefined" && module.exports) {
    verb_conjugate = require("./conjugate/conjugate")
    parts_of_speech = require("../../data/parts_of_speech")
  }

  var copulas = {
    "is": "CP",
    "will be": "CP",
    "will": "CP",
    "are": "CP",
    "was": "CP",
    "were": "CP"
  }
  var modals = {
    "can": "MD",
    "may": "MD",
    "could": "MD",
    "might": "MD",
    "will": "MD",
    "ought to": "MD",
    "would": "MD",
    "must": "MD",
    "shall": "MD",
    "should": "MD"
  }
  var tenses = {
    past: "VBD",
    participle: "VBN",
    infinitive: "VBP",
    present: "VBZ",
    gerund: "VBG"
  }

  the.conjugate = function() {
    return verb_conjugate(the.word)
  }

  the.to_past = function() {
    if (the.form === "gerund") {
      return the.word
    }
    return verb_conjugate(the.word).past
  }

  the.to_present = function() {
    return verb_conjugate(the.word).present
  }

  the.to_future = function() {
    return "will " + verb_conjugate(the.word).infinitive
  }

  //which conjugation
  the.form = (function() {
    //don't choose infinitive if infinitive==present
    var order = [
      "past",
      "present",
      "gerund",
      "infinitive"
    ]
    var forms = verb_conjugate(the.word)
    for (var i = 0; i < order.length; i++) {
      if (forms[order[i]] === the.word) {
        return order[i]
      }
    }
  })()

  //past/present/future
  the.tense = (function() {
    if (the.word.match(/\bwill\b/)) {
      return "future"
    }
    var form = the.form
    if (form === "present") {
      return "present"
    }
    if (form === "past") {
      return "past"
    }
    return "present"
  })()

  //the most accurate part_of_speech
  the.which = (function() {
    if (copulas[the.word]) {
      return parts_of_speech['CP']
    }
    if (the.word.match(/([aeiou][^aeiouwyrlm])ing$/)) {
      return parts_of_speech['VBG']
    }
    var form = the.form
    return parts_of_speech[tenses[form]]
  })()

  //is this verb negative already?
  the.negative = (function() {
    if (the.word.match(/n't$/)) {
      return true
    }
    if ((modals[the.word] || copulas[the.word]) && the.next && the.next.normalised === "not") {
      return true
    }
    return false
  })()

  return the;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = Verb;
}

// console.log(new Verb("will"))
// console.log(new Verb("stalking").tense)

//convert cute to cuteness
var adj_to_noun = (function() {

  var main = function(w) {
    var irregulars = {
      "clean": "cleanliness",
      "naivety": "naivety"
    };
    if (!w) {
      return "";
    }
    if (irregulars.hasOwnProperty(w)) {
      return irregulars[w];
    }
    if (w.match(" ")) {
      return w;
    }
    if (w.match(/w$/)) {
      return w;
    }
    var transforms=[
      {reg:/y$/, repl:'iness'},
      {reg:/le$/, repl:'ility'},
      {reg:/ial$/, repl:'y'},
      {reg:/al$/, repl:'ality'},
      {reg:/ting$/, repl:'ting'},
      {reg:/ring$/, repl:'ring'},
      {reg:/bing$/, repl:'bingness'},
      {reg:/sing$/, repl:'se'},
      {reg:/ing$/, repl:'ment'},
      {reg:/ess$/, repl:'essness'},
      {reg:/ous$/, repl:'ousness'},
    ]

    for(var i=0; i<transforms.length; i++){
      if(w.match(transforms[i].reg)){
        return w.replace(transforms[i].reg, transforms[i].repl);
      }
    }

    if (w.match(/s$/)) {
      return w;
    }
    return w + "ness";
  };
  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main
})()

// console.log(adj_to_noun('mysterious'));

//these are adjectives that can become comparative + superlative with out "most/more"
//its a whitelist for conjugation
//this data is shared between comparative/superlative methods
var convertables= [
  "absurd",
  "aggressive",
  "alert",
  "alive",
  "awesome",
  "beautiful",
  "big",
  "bitter",
  "black",
  "blue",
  "bored",
  "boring",
  "brash",
  "brave",
  "brief",
  "bright",
  "broad",
  "brown",
  "calm",
  "charming",
  "cheap",
  "clean",
  "cold",
  "cool",
  "cruel",
  "cute",
  "damp",
  "deep",
  "dear",
  "dead",
  "dark",
  "dirty",
  "drunk",
  "dull",
  "eager",
  "efficient",
  "even",
  "faint",
  "fair",
  "fanc",
  "fast",
  "fat",
  "feeble",
  "few",
  "fierce",
  "fine",
  "flat",
  "forgetful",
  "frail",
  "full",
  "gentle",
  "glib",
  "great",
  "green",
  "gruesome",
  "handsome",
  "hard",
  "harsh",
  "high",
  "hollow",
  "hot",
  "impolite",
  "innocent",
  "keen",
  "kind",
  "lame",
  "lean",
  "light",
  "little",
  "loose",
  "long",
  "loud",
  "low",
  "lush",
  "macho",
  "mean",
  "meek",
  "mellow",
  "mundane",
  "near",
  "neat",
  "new",
  "nice",
  "normal",
  "odd",
  "old",
  "pale",
  "pink",
  "plain",
  "poor",
  "proud",
  "purple",
  "quick",
  "rare",
  "rapid",
  "red",
  "rich",
  "ripe",
  "rotten",
  "round",
  "rude",
  "sad",
  "safe",
  "scarce",
  "scared",
  "shallow",
  "sharp",
  "short",
  "shrill",
  "simple",
  "slim",
  "slow",
  "small",
  "smart",
  "smooth",
  "soft",
  "sore",
  "sour",
  "square",
  "stale",
  "steep",
  "stiff",
  "straight",
  "strange",
  "strong",
  "sweet",
  "swift",
  "tall",
  "tame",
  "tart",
  "tender",
  "tense",
  "thick",
  "thin",
  "tight",
  "tough",
  "vague",
  "vast",
  "vulgar",
  "warm",
  "weak",
  "wet",
  "white",
  "wide",
  "wild",
  "wise",
  "young",
  "yellow",
  "easy",
  "narrow",
  "late",
  "early",
  "soon",
  "close",
  "empty",
  "dry",
  "windy",
  "noisy",
  "thirsty",
  "hungry",
  "fresh",
  "quiet",
  "clear",
  "heavy",
  "happy",
  "funny",
  "lucky",
  "pretty",
  "important",
  "interesting",
  "attractive",
  "dangerous",
  "intellegent",
  "pure",
  "orange",
  "large",
  "firm",
  "grand",
  "formal",
  "raw",
  "weird",
  "glad",
  "mad",
  "strict",
  "tired",
  "solid",
  "extreme",
  "mature",
  "true",
  "free",
  "curly",
  "angry"
].reduce(function(h,s){
  h[s]=true
  return h
},{})

if (typeof module !== "undefined" && module.exports) {
  module.exports = convertables;
}

//turn 'quick' into 'quickly'
var to_comparative = (function() {

  if (typeof module !== "undefined" && module.exports) {
    convertables = require("./convertables")
  }
  var main = function(str) {
    var irregulars = {
      "grey": "greyer",
      "gray": "grayer",
      "green": "greener",
      "yellow": "yellower",
      "red": "redder",
      "good": "better",
      "well": "better",
      "bad": "worse",
      "sad": "sadder"
    }

    var dont = {
      "overweight": 1,
      "main": 1,
      "nearby": 1,
      "asleep": 1,
      "weekly": 1,
      "secret": 1,
      "certain": 1
    }

    var transforms = [{
      reg: /y$/i,
      repl: 'ier'
    }, {
      reg: /([aeiou])t$/i,
      repl: '$1tter'
    }, {
      reg: /([aeou])de$/i,
      repl: '$1der'
    }, {
      reg: /nge$/i,
      repl: 'nger'
    }]

    var matches = [
      /ght$/,
      /nge$/,
      /ough$/,
      /ain$/,
      /uel$/,
      /[au]ll$/,
      /ow$/,
      /old$/,
      /oud$/,
      /e[ae]p$/
    ]

    var not_matches = [
      /ary$/,
      /ous$/
    ]

    if (dont.hasOwnProperty(str)) {
      return null
    }

    if (convertables.hasOwnProperty(str)) {
      if (str.match(/e$/)) {
        return str + "r"
      } else {
        return str + "er"
      }
    }

    if (irregulars.hasOwnProperty(str)) {
      return irregulars[str]
    }

    var i;
    for (i = 0; i < not_matches.length; i++) {
      if (str.match(not_matches[i])) {
        return "more " + str
      }
    }

    for (i = 0; i < transforms.length; i++) {
      if (str.match(transforms[i].reg)) {
        return str.replace(transforms[i].reg, transforms[i].repl)
      }
    }

    for (i = 0; i < matches.length; i++) {
      if (str.match(matches[i])) {
        return str + "er"
      }
    }
    return "more " + str
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main;
})();

// console.log(to_comparative('dry'))
// console.log(to_comparative('cruel'))

//turn 'quick' into 'quickest'
var to_superlative = (function() {

  if (typeof module !== "undefined" && module.exports) {
    convertables = require("./convertables")
  }

  var main = function(str) {
    var irregulars = {
      "nice": "nicest",
      "late": "latest",
      "hard": "hardest",
      "inner": "innermost",
      "outer": "outermost",
      "far": "furthest",
      "worse": "worst",
      "bad": "worst",
      "good": "best"
    }

    var dont = {
      "overweight": 1,
      "ready": 1
    }

    var transforms = [{
      reg: /y$/i,
      repl: 'iest'
    }, {
      reg: /([aeiou])t$/i,
      repl: '$1ttest'
    }, {
      reg: /([aeou])de$/i,
      repl: '$1dest'
    }, {
      reg: /nge$/i,
      repl: 'ngest'
    }]

    var matches = [
      /ght$/,
      /nge$/,
      /ough$/,
      /ain$/,
      /uel$/,
      /[au]ll$/,
      /ow$/,
      /oud$/,
      /...p$/
    ]

    var not_matches = [
      /ary$/
    ]

    var generic_transformation = function(str) {
      if (str.match(/e$/)) {
        return str + "st"
      } else {
        return str + "est"
      }
    }

    if (convertables.hasOwnProperty(str)) {
      return generic_transformation(str)
    }

    if (dont.hasOwnProperty(str)) {
      return "most " + str
    }

    if (irregulars.hasOwnProperty(str)) {
      return irregulars[str]
    }
    var i;
    for (i = 0; i < not_matches.length; i++) {
      if (str.match(not_matches[i])) {
        return "most " + str
      }
    }

    for (i = 0; i < transforms.length; i++) {
      if (str.match(transforms[i].reg)) {
        return str.replace(transforms[i].reg, transforms[i].repl)
      }
    }

    for (i = 0; i < matches.length; i++) {
      if (str.match(matches[i])) {
        return generic_transformation(str)
      }
    }
    return "most " + str
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main;
})();

// console.log(to_superlative('dry'))
// console.log(to_superlative('rich'))

//turn 'quick' into 'quickly'
var adj_to_adv = (function() {

  var main = function(str) {
    var irregulars = {
      "idle": "idly",
      "public": "publicly",
      "vague": "vaguely",
      "day": "daily",
      "icy": "icily",
      "single": "singly",
      "female": "womanly",
      "male": "manly",
      "simple": "simply",
      "whole": "wholly",
      "special": "especially",
      "straight": "straight",
      "wrong": "wrong",
      "fast": "fast",
      "hard": "hard",
      "late": "late",
      "early": "early",
      "well": "well",
      "best": "best",
      "latter": "latter",
      "bad": "badly"
    }

    var dont = {
      "foreign": 1,
      "black": 1,
      "modern": 1,
      "next": 1,
      "difficult": 1,
      "degenerate": 1,
      "young": 1,
      "awake": 1,
      "back": 1,
      "blue": 1,
      "brown": 1,
      "orange": 1,
      "complex": 1,
      "cool": 1,
      "dirty": 1,
      "done": 1,
      "empty": 1,
      "fat": 1,
      "fertile": 1,
      "frozen": 1,
      "gold": 1,
      "grey": 1,
      "gray": 1,
      "green": 1,
      "medium": 1,
      "parallel": 1,
      "outdoor": 1,
      "unknown": 1,
      "undersized": 1,
      "used": 1,
      "welcome": 1,
      "yellow": 1,
      "white": 1,
      "fixed": 1,
      "mixed": 1,
      "super": 1,
      "guilty": 1,
      "tiny": 1,
      "able": 1,
      "unable": 1,
      "same": 1,
      "adult": 1
    }

    var transforms = [{
      reg: /al$/i,
      repl: 'ally'
    }, {
      reg: /ly$/i,
      repl: 'ly'
    }, {
      reg: /(.{3})y$/i,
      repl: '$1ily'
    }, {
      reg: /que$/i,
      repl: 'quely'
    }, {
      reg: /ue$/i,
      repl: 'uly'
    }, {
      reg: /ic$/i,
      repl: 'ically'
    }, {
      reg: /ble$/i,
      repl: 'bly'
    }, {
      reg: /l$/i,
      repl: 'ly'
    }]

    var not_matches = [
      /airs$/,
      /ll$/,
      /ee.$/,
      /ile$/
    ]

    if (dont[str]) {
      return null
    }
    if (irregulars[str]) {
      return irregulars[str]
    }
    if (str.length <= 3) {
      return null
    }
    var i;
    for (i = 0; i < not_matches.length; i++) {
      if (str.match(not_matches[i])) {
        return null
      }
    }
    for (i = 0; i < transforms.length; i++) {
      if (str.match(transforms[i].reg)) {
        return str.replace(transforms[i].reg, transforms[i].repl)
      }
    }
    return str + 'ly'
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main;
})();

// console.log(adj_to_adv('direct'))

//wrapper for Adjective's methods
var Adjective = function(str, next, last, token) {
  var the = this
  the.word = str || '';
  the.next = next
  the.last = last

  if (typeof module !== "undefined" && module.exports) {
    to_comparative = require("./conjugate/to_comparative")
    to_superlative = require("./conjugate/to_superlative")
    adj_to_adv = require("./conjugate/to_adverb")
    adj_to_noun = require("./conjugate/to_noun")
    parts_of_speech = require("../../data/parts_of_speech")
  }

  the.conjugate = function() {
    return {
      comparative: to_comparative(the.word),
      superlative: to_superlative(the.word),
      adverb: adj_to_adv(the.word),
      noun: adj_to_noun(the.word)
    }
  }

  the.which = (function() {
    if (the.word.match(/..est$/)) {
      return parts_of_speech['JJS']
    }
    if (the.word.match(/..er$/)) {
      return parts_of_speech['JJR']
    }
    return parts_of_speech['JJ']
  })()

  return the;
};
if (typeof module !== "undefined" && module.exports) {
  module.exports = Adjective;
}

// console.log(new Adjective("crazy"))

//Parents are classes for each main part of speech, with appropriate methods
//load files if server-side, otherwise assume these are prepended already
if (typeof module !== "undefined" && module.exports) {
  Adjective = require("./adjective/index");
  Noun = require("./noun/index");
  Adverb = require("./adverb/index");
  Verb = require("./verb/index");
  Value = require("./value/index");
}
var parents = {
  adjective: function(str, next, last, token) {
    return new Adjective(str, next, last, token)
  },
  noun: function(str, next, last, token) {
    return new Noun(str, next, last, token)
  },
  adverb: function(str, next, last, token) {
    return new Adverb(str, next, last, token)
  },
  verb: function(str, next, last, token) {
    return new Verb(str, next, last, token)
  },
  value: function(str, next, last, token) {
    return new Value(str, next, last, token)
  },
  glue: function(str, next, last, token) {
    return {}
  }
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = parents;
}

//the lexicon is a large hash of words and their predicted part-of-speech.
// it plays a bootstrap-role in pos tagging in this library.
// to save space, most of the list is derived from conjugation methods,
// and other forms are stored in a compact way
var lexicon = (function() {

    if (typeof module !== "undefined" && module.exports) {
      multiples = require("./lexicon/multiples")
      values = require("./lexicon/values")
      demonyms = require("./lexicon/demonyms")

      //verbs
      verbs = require("./lexicon/verbs")
      verb_conjugate = require("../parents/verb/conjugate/conjugate")
      verb_to_doer = require("../parents/verb/conjugate/to_doer")
      verb_irregulars = require("../parents/verb/conjugate/verb_irregulars")

      adjectives = require("./lexicon/adjectives")
      adj_to_adv = require("../parents/adjective/conjugate/to_adverb")
      to_superlative = require("../parents/adjective/conjugate/to_superlative")
      to_comparative = require("../parents/adjective/conjugate/to_comparative")
    }
    var main = {
      //contractions that don't need splitting-open, grammatically
      "don't": "VB",
      "won't": "VB",
      "what's": "VB", //somewhat ambiguous (what does|what are)
      "where'd": "VBD",
      "when'd": "VBD",
      "how'd": "VBD",
      "what'd": "VBD",

      //foreign words
      "etc": "FW",
      "ie": "FW",

      "there": "EX",

      "higher": "JJR",
      "larger": "JJR",
      "better": "JJR",
      "earlier": "JJR",
      "biggest": "JJS",
      "easier": "JJR",

      //important verbs
      "said": "VBD",
      "says": "VBZ",
      "has": "VB",
      "more": "RBR",
      "had": "VBD",
      "been": "VBD",
      "going": "VBG",
      "being": "VBG",
      "began": "VBD",
      "came": "VBD",
      "did": "VBD",
      "sounds": "VBZ",
      "went": "VBD",
      "given": "VBN",
      "known": "VBN",
      "shown": "VBN",
      "seen": "VBN",
      "according": "VBG",
      "means": "VBZ",
      "born": "VBN",
      "resulting": "VBG",
      "developing": "VBG",
      "yourself": "PRP",
      "staining": "VBG",
      "meant": "VBD"
    }

    var compact = {
        //conjunctions
        "CC": [
          "yet",
          "therefore",
          "or",
          "while",
          "nor",
          "whether",
          "though",
          "because",
          "but",
          "for",
          "and",
          "if",
          "however",
          "before",
          "although",
          "how",
          "plus",
          "versus",
          "not"
        ],

        //copula
        "CP": [
          "is",
          "will be",
          "are",
          "was",
          "were",
          "am",
          "isn't",
          "ain't",
          "aren't"
        ],

        //determiners
        "DT": [
          "this",
          "any",
          "enough",
          "each",
          "whatever",
          "every",
          "which",
          "these",
          "another",
          "plenty",
          "whichever",
          "neither",
          "an",
          "a",
          "least",
          "own",
          "few",
          "both",
          "those",
          "the",
          "that",
          "various",
          "what",
          "either",
          "much",
          "some",
          "else",
          "no",
          //some other languages (what could go wrong?)
          "la",
          "le",
          "les",
          "des",
          "de",
          "du",
          "el"
        ],

        //prepositions
        "IN": [
          "until",
          "onto",
          "of",
          "into",
          "out",
          "except",
          "across",
          "by",
          "between",
          "at",
          "down",
          "as",
          "from",
          "around",
          "with",
          "among",
          "upon",
          "amid",
          "to",
          "along",
          "since",
          "about",
          "off",
          "on",
          "within",
          "in",
          "during",
          "per",
          "without",
          "throughout",
          "through",
          "than",
          "via",
          "up",
          "unlike",
          "despite",
          "below",
          "unless",
          "towards",
          "besides",
          "after",
          "whereas",
          "'o"
        ],

        //modal verbs
        "MD": [
          "can",
          "may",
          "could",
          "might",
          "will",
          "ought to",
          "would",
          "must",
          "shall",
          "should",
          "ought",
          "shouldn't",
          "wouldn't",
          "couldn't",
          "mustn't",
          "shan't",
          "shant",
          "lets", //arguable
          "who'd",
          "let's"
        ],

        //posessive pronouns
        "PP": [
          "mine",
          "something",
          "none",
          "anything",
          "anyone",
          "lot",
          "theirs",
          "himself",
          "ours",
          "his",
          "my",
          "their",
          "yours",
          "your",
          "our",
          "its",
          "nothing",
          "herself",
          "hers",
          "themselves",
          "everything",
          "myself",
          "itself",
          "who",
          "her", //this one is pretty ambiguous
          "whom",
          "whose"
        ],

        //personal pronouns (nouns)
        "PRP": [
          "it",
          "they",
          "i",
          "them",
          "you",
          "she",
          "me",
          "he",
          "him",
          "ourselves",
          "us",
          "we",
          "thou",
          "il",
          "elle",
          "'em"
        ],

        //some manual adverbs (the rest are generated)
        "RB": [
          "now",
          "again",
          "already",
          "soon",
          "directly",
          "toward",
          "forever",
          "apart",
          "instead",
          "yes",
          "alone",
          "ago",
          "indeed",
          "ever",
          "quite",
          "perhaps",
          "where",
          "then",
          "here",
          "thus",
          "very",
          "often",
          "once",
          "never",
          "why",
          "when",
          "away",
          "always",
          "sometimes",
          "also",
          "maybe",
          "so",
          "just",
          "well",
          "several",
          "such",
          "randomly",
          "too",
          "rather",
          "abroad",
          "almost",
          "anyway",
          "twice",
          "aside",
          "moreover",
          "anymore",
          "newly",
          "damn",
          "somewhat",
          "somehow",
          "meanwhile",
          "hence",
          "further",
          "furthermore"
        ],

        //interjections
        "UH": [
          "uhh",
          "uh-oh",
          "ugh",
          "sheesh",
          "eww",
          "pff",
          "voila",
          "oy",
          "eep",
          "hurrah",
          "yuck",
          "ow",
          "duh",
          "oh",
          "hmm",
          "yeah",
          "whoa",
          "ooh",
          "whee",
          "ah",
          "bah",
          "gah",
          "yaa",
          "phew",
          "gee",
          "ahem",
          "eek",
          "meh",
          "yahoo",
          "oops",
          "d'oh",
          "psst",
          "argh",
          "grr",
          "nah",
          "shhh",
          "whew",
          "mmm",
          "yay",
          "uh-huh",
          "boo",
          "wow",
          "nope"
        ],

        //nouns that shouldnt be seen as a verb
        "NN": [
          "president",
          "dollar",
          "student",
          "patent",
          "funding",
          "morning",
          "banking",
          "ceiling",
          "energy",
          "secretary",
          "purpose",
          "friends",
          "event"
        ]
      }
      //unpack the compact terms into the main lexicon..
    var i, arr;
    var keys = Object.keys(compact)
    var l = keys.length
    for (i = 0; i < l; i++) {
      arr = compact[keys[i]]
      for (i2 = 0; i2 < arr.length; i2++) {
        main[arr[i2]] = keys[i];
      }
    }

    //add values
    keys=Object.keys(values)
    l = keys.length
    for (i = 0; i < l; i++) {
      main[keys[i]] = "CD"
    }

    //add demonyms
    l = demonyms.length
    for (i = 0; i < l; i++) {
      main[demonyms[i]] = "JJ"
    }

    //add multiple-word terms
    l = Object.keys(multiples).forEach(function(k) {
      main[k] = multiples[k]
    })

    //add verbs
    //conjugate all verbs. takes ~8ms. triples the lexicon size.
    var c, i;
    l = verbs.length;
    for (i = 0; i < l; i++) {
      //add conjugations
      c = verb_conjugate(verbs[i])
      main[c.infinitive] = main[c.infinitive] || "VBP"
      main[c.past] = main[c.past] || "VBD"
      main[c.gerund] = main[c.gerund] || "VBG"
      main[c.present] = main[c.present] || "VBZ"
      if (c.doer) {
        main[c.doer] = main[c.doer] || "NNA"
      }
      if (c.participle) {
        main[c.participle] = main[c.participle] || "VBN"
      }
    }
    //add irregular verbs
    l = verb_irregulars.length;
    for (i = 0; i < l; i++) {
      c=verb_irregulars[i]
      main[c.infinitive]=main[c.infinitive]||"VBP"
      main[c.gerund]=main[c.gerund]||"VBG"
      main[c.past]=main[c.past]||"VBD"
      main[c.present]=main[c.present]||"VBZ"
      if (c.doer) {
        main[c.doer]=main[c.doer]||"NNA"
      }
      if (c.participle) {
        main[c.future]=main[c.future]||"VB"
      }
    }

    //add adjectives
    //conjugate all of these adjectives to their adverbs. (13ms)
    var tmp, j;
    l = adjectives.length;
    for (i = 0; i < l; i++) {
      j = adjectives[i]
      main[j] = "JJ"
      //add adverb form
      tmp = adj_to_adv(j)
      if (tmp && tmp !== j && !main[tmp]) {
        main[tmp] = main[tmp] || "RB"
      }
      //add comparative form
      tmp = to_comparative(j)
      if (tmp && !tmp.match(/^more ./) && tmp !== j && !main[tmp]) {
        main[tmp] = main[tmp] || "JJR"
      }
      //add superlative form
      tmp = to_superlative(j)
      if (tmp && !tmp.match(/^most ./) && tmp !== j && !main[tmp]) {
        main[tmp] = main[tmp] || "JJS"
      }
    }

    if (typeof module !== "undefined" && module.exports) {
      module.exports = main;
    }
    return main
  })()
  // console.log(lexicon['once again']=="RB")
  // console.log(lexicon['seven']=="CD")
  // console.log(lexicon['sleep']=="VBP")
  // console.log(lexicon['slept']=="VBD")
  // console.log(lexicon['sleeping']=="VBG")
  // console.log(lexicon['completely']=="RB")
  // console.log(lexicon['pretty']=="JJ")
  // console.log(lexicon['canadian']=="JJ")
  // console.log(lexicon['july']=="CD")
  // console.log(lexicon[null]===undefined)
  // console.log(lexicon['prettier']=="JJR")
  // console.log(lexicon['prettiest']=="JJS")
  console.log(Object.keys(lexicon).length)

// methods that hang on a parsed set of words
// accepts parsed tokens
var Sentence = function(tokens) {
  var the = this
  the.tokens = tokens || [];

  var capitalise = function(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  the.tense = function() {
    var verbs = the.tokens.filter(function(token) {
      return token.pos.parent === "verb"
    })
    return verbs.map(function(v) {
      return v.analysis.tense
    })
  }

  the.to_past = function() {
    the.tokens = the.tokens.map(function(token) {
      if (token.pos.parent === "verb") {
        token.text = token.analysis.to_past()
        token.normalised = token.text
      }
      return token
    })
    return the
  }

  the.to_present = function() {
    the.tokens = the.tokens.map(function(token) {
      if (token.pos.parent === "verb") {
        token.text = token.analysis.to_present()
        token.normalised = token.text
      }
      return token
    })
    return the
  }

  the.to_future = function() {
    the.tokens = the.tokens.map(function(token) {
      if (token.pos.parent === "verb") {
        token.text = token.analysis.to_future()
        token.normalised = token.text
      }
      return token
    })
    return the
  }

  the.insert = function(token, i) {
    if (i && token) {
      the.tokens.splice(i, 0, token);
    }
  }

  //negate makes the sentence mean the opposite thing.
  the.negate = function() {
    //these are cheap ways to negate the meaning
    // ('none' is ambiguous because it could mean (all or some) )
    var logic_negate = {
        //some logical ones work
        "everyone": "no one",
        "everybody": "nobody",
        "someone": "no one",
        "somebody": "nobody",
        // everything:"nothing",
        "always": "never",
        //copulas
        "is": "isn't",
        "are": "aren't",
        "was": "wasn't",
        "will": "won't",
        //modals
        "didn't": "did",
        "wouldn't": "would",
        "couldn't": "could",
        "shouldn't": "should",
        "can't": "can",
        "won't": "will",
        "mustn't": "must",
        "shan't": "shall",
        "shant": "shall",

        "did": "didn't",
        "would": "wouldn't",
        "could": "couldn't",
        "should": "shouldn't",
        "can": "can't",
        "must": "mustn't"

      }
      //loop through each term..
    for (var i = 0; i < the.tokens.length; i++) {
      var tok = the.tokens[i]

      //turn 'is' into 'isn't', etc - make sure 'is' isnt followed by a 'not', too
      if (logic_negate[tok.normalised] && (!the.tokens[i + 1] || the.tokens[i + 1].normalised != "not")) {
        tok.text = logic_negate[tok.normalised]
        tok.normalised = logic_negate[tok.normalised]
        if (tok.capitalised) {
          tok.text = capitalise(tok.text)
        }
        return the
      }

      // find the first verb..
      if (tok.pos.parent == "verb") {
        // if verb is already negative, make it not negative
        if (tok.analysis.negative) {
          if (the.tokens[i + 1] && the.tokens[i + 1].normalised == "not") {
            the.tokens.splice(i + 1, 1)
          }
          return the
        }
        //turn future-tense 'will go' into "won't go"
        if (tok.normalised.match(/^will /i)) {
          tok.text = tok.text.replace(/^will /i, "won't ")
          tok.normalised = tok.text
          if (tok.capitalised) {
            tok.text = capitalise(tok.text)
          }
          return the
        }
        // - INFINITIVE-
        // 'i walk' -> "i don't walk"
        if (tok.analysis.form == "infinitive" && tok.analysis.form != "future") {
          tok.text = "don't " + (tok.analysis.conjugate().infinitive || tok.text)
          tok.normalised = tok.text.toLowerCase()
          return the
        }
        // - GERUND-
        // if verb is gerund, 'walking' -> "not walking"
        if (tok.analysis.form == "gerund") {
          tok.text = "not " + tok.text
          tok.normalised = tok.text.toLowerCase()
          return the
        }
        // - PAST-
        // if verb is past-tense, 'he walked' -> "he did't walk"
        if (tok.analysis.tense == "past") {
          tok.text = "didn't " + (tok.analysis.conjugate().infinitive || tok.text)
          tok.normalised = tok.text.toLowerCase()
          return the
        }
        // - PRESENT-
        // if verb is present-tense, 'he walks' -> "he doesn't walk"
        if (tok.analysis.tense == "present") {
          tok.text = "doesn't " + (tok.analysis.conjugate().infinitive || tok.text)
          tok.normalised = tok.text.toLowerCase()
          return the
        }
        // - FUTURE-
        // if verb is future-tense, 'will go' -> won't go. easy-peasy
        if (tok.analysis.tense == "future") {
          if (tok.normalised == "will") {
            tok.normalised = "won't"
            tok.text = "won't"
          } else {
            tok.text = tok.text.replace(/^will /i, "won't ")
            tok.normalised = tok.normalised.replace(/^will /i, "won't ")
          }
          if (tok.capitalised) {
            tok.text = capitalise(tok.text);
          }
          return the
        }

        return the
      }
    }

    return the
  }

  the.entities = function(options) {
    var spots = []
    options = options || {}
    the.tokens.forEach(function(token) {
      if (token.pos.parent === "noun" && token.analysis.is_entity) {
        spots.push(token)
      }
    })
    if (options.ignore_gerund) {
      spots = spots.filter(function(t) {
        return t.pos.tag !== "VBG"
      })
    }
    return spots
  }

  the.text = function() {
    return the.tokens.map(function(s) {
      return s.text
    }).join(' ')
  }

  //sugar 'grab' methods
  the.verbs = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == "verb"
    })
  }

  the.adverbs = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == "adverb"
    })
  }

  the.nouns = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == "noun"
    })
  }

  the.adjectives = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == "adjective"
    })
  }

  the.values = function() {
    return the.tokens.filter(function(t) {
      return t.pos.parent == "value"
    })
  }

  the.tags = function() {
    return the.tokens.map(function(t) {
      return t.pos.tag
    })
  }

  return the
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Sentence;
}

//a block of text, with an arbitrary number of sentences
var Section = function(sentences) {
  var the = this
  the.sentences = sentences || [];

  the.text = function() {
    return the.sentences.map(function(s) {
      return s.text()
    }).join(' ')
  }
  the.tense = function() {
    return the.sentences.map(function(s) {
      return s.tense()
    })
  }
  //pluck out wanted data from sentences
  the.nouns = function() {
    return the.sentences.map(function(s) {
      return s.nouns()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }
  the.entities = function(options) {
    return the.sentences.map(function(s) {
      return s.entities(options)
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }
  the.adjectives = function() {
    return the.sentences.map(function(s) {
      return s.adjectives()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }
  the.verbs = function() {
    return the.sentences.map(function(s) {
      return s.verbs()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }
  the.adverbs = function() {
    return the.sentences.map(function(s) {
      return s.adverbs()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }
  the.values = function() {
    return the.sentences.map(function(s) {
      return s.values()
    }).reduce(function(arr, a) {
      return arr.concat(a)
    }, [])
  }
  the.tags = function() {
    return the.sentences.map(function(s) {
      return s.tags()
    })
  }
  //transform the sentences
  the.negate = function() {
    the.sentences = the.sentences.map(function(s) {
      return s.negate()
    })
    return the
  }
  the.to_past = function() {
    the.sentences = the.sentences.map(function(s) {
      return s.to_past()
    })
    return the
  }
  the.to_present = function() {
    the.sentences = the.sentences.map(function(s) {
      return s.to_present()
    })
    return the
  }
  the.to_future = function() {
    the.sentences = the.sentences.map(function(s) {
      return s.to_future()
    })
    return the
  }

}
if (typeof module !== "undefined" && module.exports) {
  module.exports = Section;
}

var pos = (function() {
  // "use strict";

  if (typeof module !== "undefined" && module.exports) {
    lexicon = require("./data/lexicon")
    values = require("./data/lexicon/values")

    tokenize = require("./methods/tokenization/tokenize").tokenize;
    parts_of_speech = require("./data/parts_of_speech")
    word_rules = require("./data/word_rules")
    wordnet_suffixes = require("./data/unambiguous_suffixes")
    Sentence = require("./sentence")
    Section = require("./section")
    parents = require("./parents/parents")
  }

  var merge_tokens = function(a, b) {
    a.text += " " + b.text
    a.normalised += " " + b.normalised
    a.pos_reason += "|" + b.pos_reason
    a.start = a.start || b.start
    a.capitalised = a.capitalised || b.capitalised
    a.punctuated = a.punctuated || b.punctuated
    a.end = a.end || b.end
    return a
  }

  //combine adjacent neighbours, and special cases
  var combine_tags = function(sentence) {
    var arr = sentence.tokens
    var better = []
    for (var i = 0; i <= arr.length; i++) {
      var next = arr[i + 1]
      if (arr[i] && next) {
        //'joe smith' are both NN
        if (arr[i].pos.tag === next.pos.tag && arr[i].punctuated !== true && arr[i].capitalised == next.capitalised) {
          arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
          arr[i] = null
        }
        //'will walk' -> future-tense verb
        else if (arr[i].normalised === "will" && next.pos.parent === "verb") {
          arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
          arr[i] = null
        }
        //'hundred and fifty', 'march the 5th'
        else if (arr[i].pos.tag === "CD" && (next.normalised === "and" || next.normalised === "the") && arr[i + 2] && arr[i + 2].pos.tag === "CD") {
          arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
          arr[i] = null
        }
        //capitals surrounding a preposition  'United States of America'
        else if (arr[i].capitalised && (next.normalised == "of" || next.normalised == "and") && arr[i + 2] && arr[i + 2].capitalised) {
          arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
          arr[i] = null
          arr[i + 2] = merge_tokens(arr[i + 1], arr[i + 2])
          arr[i + 1] = null
        }
        //capitals surrounding two prepositions  'Phantom of the Opera'
        else if (arr[i].capitalised && next.normalised == "of" && arr[i + 2] && arr[i + 2].pos.tag == "DT" && arr[i + 3] && arr[i + 3].capitalised) {
          arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
          arr[i] = null
          arr[i + 2] = merge_tokens(arr[i + 1], arr[i + 2])
          arr[i + 1] = null
        }
      }
      better.push(arr[i])
    }
    sentence.tokens = better.filter(function(r) {
      return r
    })
    return sentence
  }

  var lexicon_pass = function(w) {
    if (lexicon.hasOwnProperty(w)) {
      return parts_of_speech[lexicon[w]]
    }
    //try to match it without a prefix - eg. outworked -> worked
    if (w.match(/^(over|under|out|-|un|re|en).{4}/)) {
      var attempt = w.replace(/^(over|under|out|.*?-|un|re|en)/, '')
      return parts_of_speech[lexicon[attempt]]
    }
  }

  var rules_pass = function(w) {
    for (var i = 0; i < word_rules.length; i++) {
      if (w.length> 4 && w.match(word_rules[i].reg)) {
        return parts_of_speech[word_rules[i].pos]
      }
    }
  }

  var fourth_pass = function(token, i, sentence) {
    var last = sentence.tokens[i - 1]
    var next = sentence.tokens[i + 1]
    var strong_determiners = {
        "the": 1,
        "a": 1,
        "an": 1
      }
      //if it's before a modal verb, it's a noun -> lkjsdf would
    if (next && token.pos.parent !== "noun" && token.pos.parent !== "glue" && next.pos.tag === "MD") {
      token.pos = parts_of_speech['NN']
      token.pos_reason = "before a modal"
    }
    //if it's after the word 'will' its probably a verb/adverb
    if (last && last.normalised == "will" && !last.punctuated && token.pos.parent == "noun") {
      token.pos = parts_of_speech['VB']
      token.pos_reason = "after the word 'will'"
    }
    //if it's after the word 'i' its probably a verb/adverb
    if (last && last.normalised == "i" && !last.punctuated && token.pos.parent == "noun") {
      token.pos = parts_of_speech['VB']
      token.pos_reason = "after the word 'i'"
    }
    //if it's after an adverb, it's not a noun -> quickly acked
    //support form 'atleast he is..'
    if (last && token.pos.parent === "noun" && last.pos.tag === "RB" && !last.start) {
      token.pos = parts_of_speech['VB']
      token.pos_reason = "after an adverb"
    }
    //no consecutive, unpunctuated adjectives -> real good
    if (next && token.pos.parent === "adjective" && next.pos.parent === "adjective" && !token.punctuated) {
      token.pos = parts_of_speech['RB']
      token.pos_reason = "consecutive_adjectives"
    }
    //if it's after a determiner, it's not a verb -> the walk
    if (last && token.pos.parent === "verb" && strong_determiners[last.pos.normalised] && token.pos.tag != "CP") {
      token.pos = parts_of_speech['NN']
      token.pos_reason = "determiner-verb"
    }
    //copulas are followed by a determiner ("are a .."), or an adjective ("are good")
    if (last && last.pos.tag === "CP" && token.pos.tag !== "DT" && token.pos.tag !== "RB" && token.pos.parent !== "adjective" && token.pos.parent !== "value") {
      token.pos = parts_of_speech['JJ']
      token.pos_reason = "copula-adjective"
    }
    //copula, adverb, verb -> copula adverb adjective -> is very lkjsdf
    if (last && next && last.pos.tag === "CP" && token.pos.tag === "RB" && next.pos.parent === "verb") {
      sentence.tokens[i + 1].pos = parts_of_speech['JJ']
      sentence.tokens[i + 1].pos_reason = "copula-adverb-adjective"
    }
    // the city [verb] him.
    if (next && next.pos.tag == "PRP" && token.pos.parent == "noun" && !token.punctuated) {
      token.pos = parts_of_speech['VB']
      token.pos_reason = "before a [him|her|it]"
    }
    //the misled worker -> misled is an adjective, not vb
    if (last && next && last.pos.tag === "DT" && next.pos.parent === "noun" && token.pos.parent === "verb") {
      token.pos = parts_of_speech['JJ']
      token.pos_reason = "determiner-adjective-noun"
    }

    return token
  }

  //add a 'quiet' token for contractions so we can represent their grammar
  var handle_contractions = function(arr) {
    var contractions = {
      "i'd": ["i", "would"],
      "she'd": ["she", "would"],
      "he'd": ["he", "would"],
      "they'd": ["they", "would"],
      "we'd": ["we", "would"],
      "i'll": ["i", "will"],
      "she'll": ["she", "will"],
      "he'll": ["he", "will"],
      "they'll": ["they", "will"],
      "we'll": ["we", "will"],
      "i've": ["i", "have"],
      "they've": ["they", "have"],
      "we've": ["we", "have"],
      "should've": ["should", "have"],
      "would've": ["would", "have"],
      "could've": ["could", "have"],
      "must've": ["must", "have"],
      "i'm": ["i", "am"],
      "he's": ["he", "is"],
      "she's": ["she", "is"],
      "we're": ["we", "are"],
      "they're": ["they", "are"],
      "cannot": ["can", "not"]
    }
    var before, after, fix;
    for (var i = 0; i < arr.length; i++) {
      if (contractions.hasOwnProperty(arr[i].normalised)) {
        before = arr.slice(0, i)
        after = arr.slice(i + 1, arr.length)
        fix = [{
          text: "",
          normalised: contractions[arr[i].normalised][0],
          start: arr[i].start
        }, {
          text: arr[i].text,
          normalised: contractions[arr[i].normalised][1],
          start: undefined
        }]
        arr = before.concat(fix)
        arr = arr.concat(after)
        return handle_contractions(arr)
      }
    }
    return arr
  }

  ////////////////
  ///party-time//
  var main = function(text, options) {
    options = options || {}
    if (!text || !text.match(/[a-z0-9]/i)) {
      return new Section([])
    }
    var sentences = tokenize(text);

    sentences.forEach(function(sentence) {

      //smart handling of contractions
      sentence.tokens = handle_contractions(sentence.tokens)

      //first pass, word-level clues
      sentence.tokens = sentence.tokens.map(function(token) {
        //it has a capital and isn't first word
        if (token.special_capitalised && !values[token.normalised]) {
          token.pos = parts_of_speech['NN']
          token.pos_reason = "capitalised"
          return token
        }
        //known words list
        var lex = lexicon_pass(token.normalised)
        if (lex) {
          token.pos = lex;
          token.pos_reason = "lexicon"
          return token
        }

        //handle punctuation like ' -- '
        if (!token.normalised) {
          token.pos = parts_of_speech['UH']
          token.pos_reason = "wordless_string"
          return token
        }

        // suffix pos signals from wordnet
        var len = token.normalised.length
        if (len > 4) {
          var suffix = token.normalised.substr(len - 4, len - 1)
          if (wordnet_suffixes.hasOwnProperty(suffix)) {
            token.pos = parts_of_speech[wordnet_suffixes[suffix]]
            token.pos_reason = "wordnet suffix"
            return token
          }
        }

        // suffix regexes for words
        var r = rules_pass(token.normalised);
        if (r) {
          token.pos = r;
          token.pos_reason = "regex suffix"
          return token
        }

        //see if it's a number
        if (parseFloat(token.normalised)) {
          token.pos = parts_of_speech['CD']
          token.pos_reason = "parsefloat"
          return token
        }

        return token
      })

      //second pass, wrangle results a bit
      sentence.tokens = sentence.tokens.map(function(token, i) {
        //set ambiguous 'ed' endings as either verb/adjective
        if (token.normalised.match(/.ed$/)) {
          token.pos = parts_of_speech['VB']
          token.pos_reason = "ed"
        }
        return token
      })

      //third pass, seek verb or noun phrases after their signals
      var need = null
      var reason = ''
      sentence.tokens = sentence.tokens.map(function(token, i) {
        var next = sentence.tokens[i + 1]
        if (token.pos) {
          //suggest noun after some determiners (a|the), posessive pronouns (her|my|its)
          if (token.normalised == "the" || token.normalised == "a" || token.normalised == "an" || token.pos.tag === "PP") {
            need = 'noun'
            reason = token.pos.name
            return token //proceed
          }
          //suggest verb after personal pronouns (he|she|they), modal verbs (would|could|should)
          if (token.pos.tag === "PRP" || token.pos.tag === "MD") {
            need = 'verb'
            reason = token.pos.name
            return token //proceed
          }

        }
        //satisfy need on a conflict, and fix a likely error
        if (token.pos) {
          if (need == "verb" && token.pos.parent == "noun" && (!next || (next.pos && next.pos.parent != "noun"))) {
            if (!next || !next.pos || next.pos.parent != need) { //ensure need not satisfied on the next one
              token.pos = parts_of_speech['VB']
              token.pos_reason = "signal from " + reason
              need = null
            }
          }
          if (need == "noun" && token.pos.parent == "verb" && (!next || (next.pos && next.pos.parent != "verb"))) {
            if (!next || !next.pos || next.pos.parent != need) { //ensure need not satisfied on the next one
              token.pos = parts_of_speech["NN"]
              token.pos_reason = "signal from " + reason
              need = null
            }
          }
        }
        //satisfy need with an unknown pos
        if (need && !token.pos) {
          if (!next || !next.pos || next.pos.parent != need) { //ensure need not satisfied on the next one
            token.pos = parts_of_speech[need]
            token.pos_reason = "signal from " + reason
            need = null
          }
        }
        //set them back as satisfied..
        if (need === 'verb' && token.pos && token.pos.parent === 'verb') {
          need = null
        }
        if (need === 'noun' && token.pos && token.pos.parent === 'noun') {
          need = null
        }
        return token
      })

      //third pass, identify missing clauses, fallback to noun
      var has = {}
      sentence.tokens.forEach(function(token) {
        if (token.pos) {
          has[token.pos.parent] = true
        }
      })
      sentence.tokens = sentence.tokens.map(function(token, i) {
        if (!token.pos) {
          //if there is no verb in the sentence, and there needs to be.
          if (has['adjective'] && has['noun'] && !has['verb']) {
            token.pos = parts_of_speech['VB']
            token.pos_reason = "need one verb"
            has['verb'] = true
            return token
          }

          //fallback to a noun
          token.pos = parts_of_speech['NN']
          token.pos_reason = "noun fallback"
        }
        return token
      })

      //fourth pass, error correction
      sentence.tokens = sentence.tokens.map(function(token, i) {
        return fourth_pass(token, i, sentence)
      })
      //run the fourth-pass again!
      sentence.tokens = sentence.tokens.map(function(token, i) {
        return fourth_pass(token, i, sentence)
      })
    })

    //combine neighbours
    if (!options.dont_combine) {
      sentences = sentences.map(function(s) {
        return combine_tags(s)
      })
    }

    //add analysis on each token
    sentences = sentences.map(function(s) {
      s.tokens = s.tokens.map(function(token, i) {
        var last_token = s.tokens[i - 1] || null
        var next_token = s.tokens[i + 1] || null
        token.analysis = parents[token.pos.parent](token.normalised, next_token, last_token, token)
        return token
      })
      return s
    })

    //make them Sentence objects
    sentences = sentences.map(function(s) {
      var sentence = new Sentence(s.tokens)
      sentence.type = s.type
      return sentence
    })
    //return a Section object, with its methods
    return new Section(sentences)
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main
})()

// console.log( pos("Geroge Clooney walked, quietly into a bank. It was cold.") )
// console.log( pos("it is a three-hundred and one").tags() )
// console.log( pos("funny funny funny funny").sentences[0].tokens )
// pos("In March 2009, while Secretary of State for Energy and Climate Change, Miliband attended the UK premiere of climate-change film The Age of Stupid, where he was ambushed").sentences[0].tokens.map(function(t){console.log(t.pos.tag + "  "+t.text)})
// pos("the Energy and Climate Change, Miliband").sentences[0].tokens.map(function(t){console.log(t.pos.tag + "  "+t.text)})
// console.log(pos("Energy and Climate Change, Miliband").sentences[0].tokens)

//just a wrapper for text -> entities
//most of this logic is in ./parents/noun
var spot = (function() {

  if (typeof module !== "undefined" && module.exports) {
    pos = require("./pos");
  }

  var main = function(text, options) {
    options = options || {}
    var sentences = pos(text, options).sentences
    return sentences.reduce(function(arr, s) {
      return arr.concat(s.entities(options))
    }, [])
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main
})()

// pos = require("./pos");
// var spots = pos("Tony Hawk walked to Toronto. Germany is in Europe.").entities()
// var spots = spot("tony hawk walked to toronto. He is a singer in the band AFI.")
// var spots = spot("The third, which did happen, as a dissuasive Cold War, ended communism.")
// var spots = spot("mike myers and nancy kerrigan")
// console.log(spots.map(function(s){return s.normalised}))

// nlp_comprimise by @spencermountain  in 2014
// most files are self-contained modules that optionally export for nodejs
// this file loads them all together

// if we're server-side, grab files, otherwise assume they're prepended already
if (typeof module !== "undefined" && module.exports) {

  var parents = require("./src/parents/parents")

  var sentence_parser = require('./src/methods/tokenization/sentence').sentences;
  var tokenize = require('./src/methods/tokenization/tokenize').tokenize;
  var ngram = require('./src/methods/tokenization/ngram').ngram;
  //tokenize
  var normalize = require('./src/methods/transliteration/unicode_normalisation')
  var syllables = require('./src/methods/syllables/syllable');
  //localization
  var local = require('./src/methods/localization/britishize')
  var americanize = local.americanize;
  var britishize = local.britishize;
  //part of speech tagging
  var pos = require('./src/pos');
  //named_entity_recognition
  var spot = require('./src/spot');
}

///
// api
var nlp = {
  noun: parents.noun,
  adjective: parents.adjective,
  verb: parents.verb,
  adverb: parents.adverb,
  value: parents.value,

  sentences: sentence_parser,
  ngram: ngram,
  tokenize: tokenize,
  americanize: americanize,
  britishize: britishize,
  syllables: syllables,
  normalize: normalize.normalize,
  denormalize: normalize.denormalize,
  pos: pos,
  spot: spot
  // tests: tests,
}

//export it for server-side
if (typeof module !== "undefined" && module.exports) {
  module.exports = nlp;
}
// console.log( nlp.pos('she sells seashells by the seashore').sentences[0].negate().text() )
// console.log( nlp.pos('i will slouch').to_past().text() );

//TODAY
// console.log(verb_conjugate("overtake"))
// adjective conjugate("pretty")
// upper-case months and demonyms

return nlp;
})()