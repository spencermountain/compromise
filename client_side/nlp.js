/*! nlp_compromise 
 by @spencermountain
 2014-05-19 */
//
// NLP_comprimise - @spencermountain - gplv3
// https://github.com/spencermountain/nlp_comprimise
//
//
var nlp = (function() {

		///
		// header
		//
var multiples = [
    "of course",
    "at least",
    "for example",
    // "in order",
    "no longer",
    "for instance",
    // "in particular",
    "sort of",
    "at first",
    // "in addition",
    "at last",
    "that is",
    "at once",
    "once again",
    "at present",
    "up to",
    "once more",
    "by now",
    "so as",
    // "in part",
    "all but",
    // "in short",
    "even so",
    "just about",
    "as yet",
    "for long",
    "far from",
    "for ever",
    "on board",
    "a lot",
    "by far",
    "over here",
    "per annum",
    "as usual",
    "at best",
    "for once",
    "at large",
    "any longer",
    "for good",
    "vice versa",
    "for certain",
    // "kind of",
    "anything but",
    // "in between",
    "en route",
    // "in private",
    // "in vain",
    "at length",
    "at random",
    "for sure",
    "upside down",
    "at most",
    "per se",
    "per capita",
    "up front",
    "in situ",
    // "in the main",
    "inter alia",
    "ex parte",
    "in vitro",
    "in vivo",
    // "in brief",
    "at worst",
    "prima facie",
    "upwards of",
    "something like",
    // "in case",
    "en masse",
    "ultra vires",
    "a priori",
    "ad hoc",
    "et cetera",
    "de facto",
    "off guard",
    "spot on",
    "ipso facto",
    "ad infinitum",
    "en bloc",
    "point blank",
    "a fortiori",
    "ad nauseam",
    "inside out",
    "sotto voce",
    "pro rata",
    "in memoriam",
    "in extremis",
    "not withstanding",
    "most part",
    "for keeps",
    "al fresco",
    "ab initio",
    "de jure",
    "a la",
    "sub judice",
    "post hoc",
    "so on",
    "sine die",
    "op cit",
    "just in",
    "ex gratia",
    "au contraire",
    "ad hominem",
    "a posteriori",
    "fed up",
    "brand new",
    "so called",
    "old fashioned",
    "grown up",
    "bona fide",
    "well off",
    "far off",
    "par excellence",
    "straight forward",
    "hard up",
    "de luxe",
    "post mortem",
    "sui generis",
    "ex officio",
    "en suite",
    "all right",
    "avant garde",
    "viva voce",
    "sans serif",
    "gung ho",
    "super duper",
    "such like",
    "de trop",
    // "will be"
].map(function(m) {
    return m.split(' ')
})


if (typeof module !== "undefined" && module.exports) {
    exports.multiples = multiples;
}
sentence_parser = function(text) {
  var abbrev, abbrevs, clean, i, sentences, tmp;
  tmp = text.split(/(\S.+?[.])(?=\s+|$)/g);
  sentences = [];
  abbrevs = ["jr", "mr", "mrs", "ms", "dr", "prof", "sr", "sen", "rep", "gov", "atty", "supt", "det", "rev", "col", "gen", "lt", "cmdr", "adm", "capt", "sgt", "cpl", "maj", "dept", "univ", "assn", "bros", "inc", "ltd", "co", "corp", "arc", "al", "ave", "blvd", "cl", "ct", "cres", "exp", "rd", "st", "dist", "mt", "ft", "fy", "hwy", "la", "pd", "pl", "plz", "tce", "Ala", "Ariz", "Ark", "Cal", "Calif", "Col", "Colo", "Conn", "Del", "Fed", "Fla", "Ga", "Ida", "Id", "Ill", "Ind", "Ia", "Kan", "Kans", "Ken", "Ky", "La", "Me", "Md", "Mass", "Mich", "Minn", "Miss", "Mo", "Mont", "Neb", "Nebr", "Nev", "Mex", "Okla", "Ok", "Ore", "Penna", "Penn", "Pa", "Dak", "Tenn", "Tex", "Ut", "Vt", "Va", "Wash", "Wis", "Wisc", "Wy", "Wyo", "USAFA", "Alta", "Ont", "QuÔøΩ", "Sask", "Yuk", "jan", "feb", "mar", "apr", "jun", "jul", "aug", "sep", "oct", "nov", "dec", "sept", "vs", "etc", "esp", "llb", "md", "bl", "phd", "ma", "ba", "miss", "misses", "mister", "sir", "esq", "mstr", "lit", "fl", "ex", "eg", "sep", "sept"];
  abbrev = new RegExp("(^| )(" + abbrevs.join("|") + ")[.] ?$", "i");
  for (i in tmp) {
    if (tmp[i]) {
      tmp[i] = tmp[i].replace(/^\s+|\s+$/g, "");
      if (tmp[i].match(abbrev) || tmp[i].match(/[ |\.][A-Z]\.?$/)) {
        tmp[parseInt(i) + 1] = tmp[i] + " " + tmp[parseInt(i) + 1];
      } else {
        sentences.push(tmp[i]);
        tmp[i] = "";
      }
    }
  }
  // console.log(tmp)
  clean = [];
  for (i in sentences) {
    sentences[i] = sentences[i].replace(/^\s+|\s+$/g, "");
    if (sentences[i]) {
      clean.push(sentences[i]);
    }
  }
  if (clean.length == 0) {
    return [text]
  }
  return clean;
}
if (typeof module !== "undefined" && module.exports) {
  exports.sentences = sentence_parser;
}
// console.log(sentences('Tony is nice. He lives in Japan.').length == 2)
// console.log(sentences('I like that Color').length == 1)
// console.log(sentences("Soviet bonds to be sold in the U.S. market. Everyone wins.").length == 2)
// console.log(sentences("Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds. I hope that's fine, etc. and you can attend Feb. 8th. Bye").length == 3)
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
    exports.ngram = main;
  }
  return main
})()

// s = ngram("i really think that we all really think it's all good")
// console.log(s)
var tokenize = (function() {


	if (typeof module !== "undefined" && module.exports) {
		sentence_parser = require("./sentence").sentences
		multiples = require("./data/multiples").multiples
	}

	var normalise = function(str) {
		str = str.toLowerCase()
		str = str.replace(/[,\.!:;\?]/, '')
		return str
	}

	var sentence_type = function(sentence) {
		if (sentence.match(/\?$/)) {
			return "question"
		} else {
			return "statement"
		}
	}

	var combine_multiples = function(arr) {
		var better = []
		for (var i = 0; i < arr.length; i++) {
			for (var o = 0; o < multiples.length; o++) {
				if (arr[i + 1] && arr[i] == multiples[o][0] && normalise(arr[i + 1]) == multiples[o][1]) { //
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
					capitalised: (i > 0 && w.match(/^[A-Z][a-z]/) != null) || undefined,
					punctuated: (w.match(/[,;:]$/) != null) || undefined,
					end: (i == (arr.length - 1)) || undefined,
					start: (i == 0) || undefined
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

// a = tokenize("Geroge Clooney walked, quietly into a bank of course. It was cold.")
// a = tokenize("If the debts are repaid, it could clear the way for Soviet bonds to be sold in the U.S.")
// console.log(JSON.stringify(a, null, 2));



// var contractions = function(text) {
// 	//undo contractions
// 	if (text.match(/\b(he's|she's|it's)\b/)) {
// 		text = text.replace(/([^ ])['’]s /ig, '$1 is ');
// 	}
// 	text = text.replace(/([^ ])['’]ve /ig, '$1 have ');
// 	text = text.replace(/([^ ])['’]re /ig, '$1 are ');
// 	text = text.replace(/([^ ])['’]d /ig, '$1 would ');
// 	text = text.replace(/([^ ])['’]ll /ig, '$1 will ');
// 	text = text.replace(/([^ ])n['’]t /ig, '$1 not ');
// 	text = text.replace(/\bi'm /ig, 'I am ');
// 	return text
// }

// console.log(contractions("i think he's better"))
// a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
//https://docs.google.com/spreadsheet/ccc?key=0Ah46z755j7cVdFRDM1A2YVpwa1ZYWlpJM2pQZ003M0E

//http://en.wikipedia.org/wiki/List_of_Unicode_characters
// x=[]
// $("#collapsibleTable10 td:nth-child(2)").each(function(){return x.push($(this).text().trim())})
// JSON.stringify(x)



var normalize = (function() {


	var data = [
		["²", "2"],
		["ƻ", "2"],
		["³", "3"],
		["Ʒ", "3"],
		["Ƹ", "3"],
		["ƹ", "3"],
		["ƺ", "3"],
		["Ǯ", "3"],
		["ǯ", "3"],
		["З", "3"],
		["Ҙ", "3"],
		["ҙ", "3"],
		["Ӟ", "3"],
		["ӟ", "3"],
		["Ӡ", "3"],
		["ӡ", "3"],
		["Ȝ", "3"],
		["ȝ", "3"],
		["Ƽ", "5"],
		["ƽ", "5"],
		["Ȣ", "8"],
		["ȣ", "8"],
		["¡", "!"],
		["¿", "?"],
		["Ɂ", "?"],
		["ɂ", "?"],
		["ª", "a"],
		["À", "a"],
		["Á", "a"],
		["Â", "a"],
		["Ã", "a"],
		["Ä", "a"],
		["Å", "a"],
		["à", "a"],
		["á", "a"],
		["â", "a"],
		["ã", "a"],
		["ä", "a"],
		["å", "a"],
		["Ā", "a"],
		["ā", "a"],
		["Ă", "a"],
		["ă", "a"],
		["Ą", "a"],
		["ą", "a"],
		["Ǎ", "a"],
		["ǎ", "a"],
		["Ǟ", "a"],
		["ǟ", "a"],
		["Ǡ", "a"],
		["ǡ", "a"],
		["Ǻ", "a"],
		["ǻ", "a"],
		["Ȁ", "a"],
		["ȁ", "a"],
		["Ȃ", "a"],
		["ȃ", "a"],
		["Ȧ", "a"],
		["ȧ", "a"],
		["Ⱥ", "a"],
		["Ά", "a"],
		["Α", "a"],
		["Δ", "a"],
		["Λ", "a"],
		["ά", "a"],
		["α", "a"],
		["λ", "a"],
		["А", "a"],
		["Д", "a"],
		["а", "a"],
		["д", "a"],
		["Ѧ", "a"],
		["ѧ", "a"],
		["Ӑ", "a"],
		["ӑ", "a"],
		["Ӓ", "a"],
		["ӓ", "a"],
		["ƛ", "a"],
		["Ʌ", "a"],
		["ß", "b"],
		["þ", "b"],
		["ƀ", "b"],
		["Ɓ", "b"],
		["Ƃ", "b"],
		["ƃ", "b"],
		["Ƅ", "b"],
		["ƅ", "b"],
		["Ƀ", "b"],
		["Β", "b"],
		["β", "b"],
		["ϐ", "b"],
		["Ϧ", "b"],
		["Б", "b"],
		["В", "b"],
		["Ъ", "b"],
		["Ь", "b"],
		["б", "b"],
		["в", "b"],
		["ъ", "b"],
		["ь", "b"],
		["Ѣ", "b"],
		["ѣ", "b"],
		["Ҍ", "b"],
		["ҍ", "b"],
		["Ҕ", "b"],
		["ҕ", "b"],
		["ƥ", "b"],
		["ƾ", "b"],
		["¢", "c"],
		["©", "c"],
		["Ç", "c"],
		["ç", "c"],
		["Ć", "c"],
		["ć", "c"],
		["Ĉ", "c"],
		["ĉ", "c"],
		["Ċ", "c"],
		["ċ", "c"],
		["Č", "c"],
		["č", "c"],
		["Ɔ", "c"],
		["Ƈ", "c"],
		["ƈ", "c"],
		["Ȼ", "c"],
		["ȼ", "c"],
		["ͻ", "c"],
		["ͼ", "c"],
		["ͽ", "c"],
		["ϲ", "c"],
		["Ϲ", "c"],
		["Ͻ", "c"],
		["Ͼ", "c"],
		["Ͽ", "c"],
		["Є", "c"],
		["С", "c"],
		["с", "c"],
		["є", "c"],
		["Ҁ", "c"],
		["ҁ", "c"],
		["Ҫ", "c"],
		["ҫ", "c"],
		["Ð", "d"],
		["Ď", "d"],
		["ď", "d"],
		["Đ", "d"],
		["đ", "d"],
		["Ɖ", "d"],
		["Ɗ", "d"],
		["ȡ", "d"],
		["Ƌ", "d"],
		["ƌ", "d"],
		["Ƿ", "d"],
		["È", "e"],
		["É", "e"],
		["Ê", "e"],
		["Ë", "e"],
		["è", "e"],
		["é", "e"],
		["ê", "e"],
		["ë", "e"],
		["Ē", "e"],
		["ē", "e"],
		["Ĕ", "e"],
		["ĕ", "e"],
		["Ė", "e"],
		["ė", "e"],
		["Ę", "e"],
		["ę", "e"],
		["Ě", "e"],
		["ě", "e"],
		["Ǝ", "e"],
		["Ə", "e"],
		["Ɛ", "e"],
		["ǝ", "e"],
		["Ȅ", "e"],
		["ȅ", "e"],
		["Ȇ", "e"],
		["ȇ", "e"],
		["Ȩ", "e"],
		["ȩ", "e"],
		["Ɇ", "e"],
		["ɇ", "e"],
		["Έ", "e"],
		["Ε", "e"],
		["Ξ", "e"],
		["Σ", "e"],
		["έ", "e"],
		["ε", "e"],
		["ξ", "e"],
		["ϱ", "e"],
		["ϵ", "e"],
		["϶", "e"],
		["Ѐ", "e"],
		["Ё", "e"],
		["Е", "e"],
		["Э", "e"],
		["е", "e"],
		["ѐ", "e"],
		["ё", "e"],
		["Ҽ", "e"],
		["ҽ", "e"],
		["Ҿ", "e"],
		["ҿ", "e"],
		["Ӗ", "e"],
		["ӗ", "e"],
		["Ә", "e"],
		["ә", "e"],
		["Ӛ", "e"],
		["ӛ", "e"],
		["Ӭ", "e"],
		["ӭ", "e"],
		["Ƒ", "f"],
		["ƒ", "f"],
		["Ϝ", "f"],
		["ϝ", "f"],
		["Ӻ", "f"],
		["ӻ", "f"],
		["Ĝ", "g"],
		["ĝ", "g"],
		["Ğ", "g"],
		["ğ", "g"],
		["Ġ", "g"],
		["ġ", "g"],
		["Ģ", "g"],
		["ģ", "g"],
		["Ɠ", "g"],
		["Ǥ", "g"],
		["ǥ", "g"],
		["Ǧ", "g"],
		["ǧ", "g"],
		["Ǵ", "g"],
		["ǵ", "g"],
		["Ĥ", "h"],
		["ĥ", "h"],
		["Ħ", "h"],
		["ħ", "h"],
		["ƕ", "h"],
		["Ƕ", "h"],
		["Ȟ", "h"],
		["ȟ", "h"],
		["Ή", "h"],
		["Η", "h"],
		["Ђ", "h"],
		["Њ", "h"],
		["Ћ", "h"],
		["Н", "h"],
		["н", "h"],
		["ђ", "h"],
		["ћ", "h"],
		["Ң", "h"],
		["ң", "h"],
		["Ҥ", "h"],
		["ҥ", "h"],
		["Һ", "h"],
		["һ", "h"],
		["Ӊ", "h"],
		["ӊ", "h"],
		["Ì", "I"],
		["Í", "I"],
		["Î", "I"],
		["Ï", "I"],
		["ì", "i"],
		["í", "i"],
		["î", "i"],
		["ï", "i"],
		["Ĩ", "i"],
		["ĩ", "i"],
		["Ī", "i"],
		["ī", "i"],
		["Ĭ", "i"],
		["ĭ", "i"],
		["Į", "i"],
		["į", "i"],
		["İ", "i"],
		["ı", "i"],
		["Ɩ", "i"],
		["Ɨ", "i"],
		["Ȉ", "i"],
		["ȉ", "i"],
		["Ȋ", "i"],
		["ȋ", "i"],
		["Ί", "i"],
		["ΐ", "i"],
		["Ϊ", "i"],
		["ί", "i"],
		["ι", "i"],
		["ϊ", "i"],
		["І", "i"],
		["Ї", "i"],
		["і", "i"],
		["ї", "i"],
		["Ĵ", "j"],
		["ĵ", "j"],
		["ǰ", "j"],
		["ȷ", "j"],
		["Ɉ", "j"],
		["ɉ", "j"],
		["ϳ", "j"],
		["Ј", "j"],
		["ј", "j"],
		["Ķ", "k"],
		["ķ", "k"],
		["ĸ", "k"],
		["Ƙ", "k"],
		["ƙ", "k"],
		["Ǩ", "k"],
		["ǩ", "k"],
		["Κ", "k"],
		["κ", "k"],
		["Ќ", "k"],
		["Ж", "k"],
		["К", "k"],
		["ж", "k"],
		["к", "k"],
		["ќ", "k"],
		["Қ", "k"],
		["қ", "k"],
		["Ҝ", "k"],
		["ҝ", "k"],
		["Ҟ", "k"],
		["ҟ", "k"],
		["Ҡ", "k"],
		["ҡ", "k"],
		["Ĺ", "l"],
		["ĺ", "l"],
		["Ļ", "l"],
		["ļ", "l"],
		["Ľ", "l"],
		["ľ", "l"],
		["Ŀ", "l"],
		["ŀ", "l"],
		["Ł", "l"],
		["ł", "l"],
		["ƚ", "l"],
		["ƪ", "l"],
		["ǀ", "l"],
		["Ǐ", "l"],
		["ǐ", "l"],
		["ȴ", "l"],
		["Ƚ", "l"],
		["Ι", "l"],
		["Ӏ", "l"],
		["ӏ", "l"],
		["Μ", "m"],
		["Ϻ", "m"],
		["ϻ", "m"],
		["М", "m"],
		["м", "m"],
		["Ӎ", "m"],
		["ӎ", "m"],
		["Ñ", "n"],
		["ñ", "n"],
		["Ń", "n"],
		["ń", "n"],
		["Ņ", "n"],
		["ņ", "n"],
		["Ň", "n"],
		["ň", "n"],
		["ŉ", "n"],
		["Ŋ", "n"],
		["ŋ", "n"],
		["Ɲ", "n"],
		["ƞ", "n"],
		["Ǹ", "n"],
		["ǹ", "n"],
		["Ƞ", "n"],
		["ȵ", "n"],
		["Ν", "n"],
		["Π", "n"],
		["ή", "n"],
		["η", "n"],
		["Ϟ", "n"],
		["Ѝ", "n"],
		["И", "n"],
		["Й", "n"],
		["Л", "n"],
		["П", "n"],
		["и", "n"],
		["й", "n"],
		["л", "n"],
		["п", "n"],
		["ѝ", "n"],
		["Ҋ", "n"],
		["ҋ", "n"],
		["Ӆ", "n"],
		["ӆ", "n"],
		["Ӣ", "n"],
		["ӣ", "n"],
		["Ӥ", "n"],
		["ӥ", "n"],
		["π", "n"],
		["Ò", "o"],
		["Ó", "o"],
		["Ô", "o"],
		["Õ", "o"],
		["Ö", "o"],
		["Ø", "o"],
		["ð", "o"],
		["ò", "o"],
		["ó", "o"],
		["ô", "o"],
		["õ", "o"],
		["ö", "o"],
		["ø", "o"],
		["Ō", "o"],
		["ō", "o"],
		["Ŏ", "o"],
		["ŏ", "o"],
		["Ő", "o"],
		["ő", "o"],
		["Ɵ", "o"],
		["Ơ", "o"],
		["ơ", "o"],
		["Ǒ", "o"],
		["ǒ", "o"],
		["Ǫ", "o"],
		["ǫ", "o"],
		["Ǭ", "o"],
		["ǭ", "o"],
		["Ǿ", "o"],
		["ǿ", "o"],
		["Ȍ", "o"],
		["ȍ", "o"],
		["Ȏ", "o"],
		["ȏ", "o"],
		["Ȫ", "o"],
		["ȫ", "o"],
		["Ȭ", "o"],
		["ȭ", "o"],
		["Ȯ", "o"],
		["ȯ", "o"],
		["Ȱ", "o"],
		["ȱ", "o"],
		["Ό", "o"],
		["Θ", "o"],
		["Ο", "o"],
		["Φ", "o"],
		["Ω", "o"],
		["δ", "o"],
		["θ", "o"],
		["ο", "o"],
		["σ", "o"],
		["ό", "o"],
		["ϕ", "o"],
		["Ϙ", "o"],
		["ϙ", "o"],
		["Ϭ", "o"],
		["ϭ", "o"],
		["ϴ", "o"],
		["О", "o"],
		["Ф", "o"],
		["о", "o"],
		["Ѳ", "o"],
		["ѳ", "o"],
		["Ѻ", "o"],
		["ѻ", "o"],
		["Ѽ", "o"],
		["ѽ", "o"],
		["Ӧ", "o"],
		["ӧ", "o"],
		["Ө", "o"],
		["ө", "o"],
		["Ӫ", "o"],
		["ӫ", "o"],
		["¤", "o"],
		["ƍ", "o"],
		["Ώ", "o"],
		["Ƥ", "p"],
		["ƿ", "p"],
		["Ρ", "p"],
		["ρ", "p"],
		["Ϸ", "p"],
		["ϸ", "p"],
		["ϼ", "p"],
		["Р", "p"],
		["р", "p"],
		["Ҏ", "p"],
		["ҏ", "p"],
		["Þ", "p"],
		["Ɋ", "q"],
		["ɋ", "q"],
		["­®", "r"],
		["Ŕ", "r"],
		["ŕ", "r"],
		["Ŗ", "r"],
		["ŗ", "r"],
		["Ř", "r"],
		["ř", "r"],
		["Ʀ", "r"],
		["Ȑ", "r"],
		["ȑ", "r"],
		["Ȓ", "r"],
		["ȓ", "r"],
		["Ɍ", "r"],
		["ɍ", "r"],
		["Ѓ", "r"],
		["Г", "r"],
		["Я", "r"],
		["г", "r"],
		["я", "r"],
		["ѓ", "r"],
		["Ґ", "r"],
		["ґ", "r"],
		["Ғ", "r"],
		["ғ", "r"],
		["Ӷ", "r"],
		["ӷ", "r"],
		["ſ", "r"],
		["Ś", "s"],
		["ś", "s"],
		["Ŝ", "s"],
		["ŝ", "s"],
		["Ş", "s"],
		["ş", "s"],
		["Š", "s"],
		["š", "s"],
		["Ƨ", "s"],
		["ƨ", "s"],
		["Ș", "s"],
		["ș", "s"],
		["ȿ", "s"],
		["ς", "s"],
		["Ϛ", "s"],
		["ϛ", "s"],
		["ϟ", "s"],
		["Ϩ", "s"],
		["ϩ", "s"],
		["Ѕ", "s"],
		["ѕ", "s"],
		["Ţ", "t"],
		["ţ", "t"],
		["Ť", "t"],
		["ť", "t"],
		["Ŧ", "t"],
		["ŧ", "t"],
		["ƫ", "t"],
		["Ƭ", "t"],
		["ƭ", "t"],
		["Ʈ", "t"],
		["Ț", "t"],
		["ț", "t"],
		["ȶ", "t"],
		["Ⱦ", "t"],
		["Γ", "t"],
		["Τ", "t"],
		["τ", "t"],
		["Ϯ", "t"],
		["ϯ", "t"],
		["Т", "t"],
		["т", "t"],
		["҂", "t"],
		["Ҭ", "t"],
		["ҭ", "t"],
		["µ", "u"],
		["Ù", "u"],
		["Ú", "u"],
		["Û", "u"],
		["Ü", "u"],
		["ù", "u"],
		["ú", "u"],
		["û", "u"],
		["ü", "u"],
		["Ũ", "u"],
		["ũ", "u"],
		["Ū", "u"],
		["ū", "u"],
		["Ŭ", "u"],
		["ŭ", "u"],
		["Ů", "u"],
		["ů", "u"],
		["Ű", "u"],
		["ű", "u"],
		["Ų", "u"],
		["ų", "u"],
		["Ư", "u"],
		["ư", "u"],
		["Ʊ", "u"],
		["Ʋ", "u"],
		["Ǔ", "u"],
		["ǔ", "u"],
		["Ǖ", "u"],
		["ǖ", "u"],
		["Ǘ", "u"],
		["ǘ", "u"],
		["Ǚ", "u"],
		["ǚ", "u"],
		["Ǜ", "u"],
		["ǜ", "u"],
		["Ȕ", "u"],
		["ȕ", "u"],
		["Ȗ", "u"],
		["ȗ", "u"],
		["Ʉ", "u"],
		["ΰ", "u"],
		["μ", "u"],
		["υ", "u"],
		["ϋ", "u"],
		["ύ", "u"],
		["ϑ", "u"],
		["Џ", "u"],
		["Ц", "u"],
		["Ч", "u"],
		["ц", "u"],
		["џ", "u"],
		["Ҵ", "u"],
		["ҵ", "u"],
		["Ҷ", "u"],
		["ҷ", "u"],
		["Ҹ", "u"],
		["ҹ", "u"],
		["Ӌ", "u"],
		["ӌ", "u"],
		["Ӈ", "u"],
		["ӈ", "u"],
		["Ɣ", "v"],
		["ν", "v"],
		["Ѵ", "v"],
		["ѵ", "v"],
		["Ѷ", "v"],
		["ѷ", "v"],
		["Ŵ", "w"],
		["ŵ", "w"],
		["Ɯ", "w"],
		["ω", "w"],
		["ώ", "w"],
		["ϖ", "w"],
		["Ϣ", "w"],
		["ϣ", "w"],
		["Ш", "w"],
		["Щ", "w"],
		["ш", "w"],
		["щ", "w"],
		["ѡ", "w"],
		["ѿ", "w"],
		["×", "x"],
		["Χ", "x"],
		["χ", "x"],
		["ϗ", "x"],
		["ϰ", "x"],
		["Х", "x"],
		["х", "x"],
		["Ҳ", "x"],
		["ҳ", "x"],
		["Ӽ", "x"],
		["ӽ", "x"],
		["Ӿ", "x"],
		["ӿ", "x"],
		["¥", "y"],
		["Ý", "y"],
		["ý", "y"],
		["ÿ", "y"],
		["Ŷ", "y"],
		["ŷ", "y"],
		["Ÿ", "y"],
		["Ƴ", "y"],
		["ƴ", "y"],
		["Ȳ", "y"],
		["ȳ", "y"],
		["Ɏ", "y"],
		["ɏ", "y"],
		["Ύ", "y"],
		["Υ", "y"],
		["Ψ", "y"],
		["Ϋ", "y"],
		["γ", "y"],
		["ψ", "y"],
		["ϒ", "y"],
		["ϓ", "y"],
		["ϔ", "y"],
		["Ў", "y"],
		["У", "y"],
		["у", "y"],
		["ч", "y"],
		["ў", "y"],
		["Ѱ", "y"],
		["ѱ", "y"],
		["Ү", "y"],
		["ү", "y"],
		["Ұ", "y"],
		["ұ", "y"],
		["Ӯ", "y"],
		["ӯ", "y"],
		["Ӱ", "y"],
		["ӱ", "y"],
		["Ӳ", "y"],
		["ӳ", "y"],
		["Ź", "z"],
		["ź", "z"],
		["Ż", "z"],
		["ż", "z"],
		["Ž", "z"],
		["ž", "z"],
		["Ʃ", "z"],
		["Ƶ", "z"],
		["ƶ", "z"],
		["Ȥ", "z"],
		["ȥ", "z"],
		["ɀ", "z"],
		["Ζ", "z"],
		["ζ", "z"],
	]

	//convert to two hashes
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
		denormalize: denormalize,
	}

	if (typeof module !== "undefined" && module.exports) {
		module.exports = obj;
	}
	return obj
})()


// s = "ӳžŽżźŹźӳžŽżźŹźӳžŽżźŹźӳžŽżźŹźӳžŽżźŹź"
// s = "Björk"
// console.log(normalize.normalize(s, {
// 	percentage: 50
// }))

// s = "handyman"
// s = "abcdefghijklmnopqrstuvwxyz"
// s = "The quick brown fox jumps over the lazy dog"
// console.log(normalize.denormalize(s, {
// 	percentage: 20
// }))
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

// console.log(syllables("suddenly").length == 3)
// console.log(syllables("constipation").length == 4)
// console.log(syllables("diabolic").length == 4)
// console.log(syllables("fate").length == 1)
// console.log(syllables("fated").length == 2)
// console.log(syllables("fates").length == 1)
// console.log(syllables("genetic").length == 3)
// console.log(syllables("deviled").length == 3)
// console.log(syllables("imitated").length == 4)
// console.log(syllables("horse").length == 1)

// console.log(syllables("carbonised"))
// console.log(syllables("sometimes"))

//BUG!
// console.log(syllables("tree"))
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


// console.log(americanize("synthesise")=="synthesize")
// console.log(americanize("synthesised")=="synthesized")
// console.log(americanize("synthesises")=="synthesizes")
// console.log(americanize("synthesising")=="synthesizing")
// console.log(americanize("analyse")=="analyze")
// console.log(americanize("analysed")=="analyzed")
// console.log(americanize("analysing")=="analyzing")
// console.log(americanize("poise")=="poise")
// console.log(americanize("poised")=="poised")
// console.log(americanize("colour")=="color")
// console.log(americanize("honour")=="honor")
// console.log(americanize("neighbour")=="neighbor")
// console.log(americanize("neighbourly")=="neighborly")
// console.log(americanize("savour")=="savor")
// console.log(americanize("savourly")=="savorly")
// console.log(americanize("favour")=="favor")
// console.log(americanize("favourite")=="favorite")
// console.log(americanize("theatre")=="theater")
// console.log(americanize("theatres")=="theaters")
// console.log(americanize("entendre")=="entendre")
// console.log(americanize("genre")=="genre")
// console.log(americanize("mediocre")=="mediocre")
// console.log(americanize("acre")=="acre")
// console.log(americanize("acres")=="acres")
// console.log(americanize("analogue")=="analog")
// console.log(americanize("homologue")=="homolog")
// console.log(americanize("anaemia")=="anemia")
// console.log(americanize("oestrogen")=="estrogen")
// console.log(americanize("ageing")=="aging")
// console.log(americanize("useable")=="usable")
// console.log(americanize("programme")=="programme")
// console.log(americanize("tonne")=="tonne")
// console.log(americanize("counsellor")=="counselor")
// console.log(americanize("traveller")=="traveler")
// console.log(americanize("labelled")=="labeled")
// console.log(americanize("cancelled")=="canceled")
// console.log(americanize("quarrelled")=="quarreled")
// console.log(americanize("signalling")=="signaling")
// console.log(americanize("modelling")=="modeling")
// console.log(americanize("travelling")=="traveling")
// console.log(americanize("willful")=="willful")
// console.log(americanize("filling")=="filling")
word_rules = [{
        reg: /.[cts]hy$/i,
        pos: 'JJ',
        strength: 64,
        errors: 1,
        accuracy: '0.98'
    }, {
        reg: /.[st]ty$/i,
        pos: 'JJ',
        strength: 44,
        errors: 1,
        accuracy: '0.98'
    }, {
        reg: /.[lnr]ize$/i,
        pos: 'VB',
        strength: 91,
        errors: 2,
        accuracy: '0.98'
    }, {
        reg: /.[gk]y$/i,
        pos: 'JJ',
        strength: 113,
        errors: 3,
        accuracy: '0.97'
    }, {
        reg: /.fies$/i,
        pos: 'VB',
        strength: 30,
        errors: 1,
        accuracy: '0.97'
    }, {
        reg: /.some$/i,
        pos: 'JJ',
        strength: 34,
        errors: 1,
        accuracy: '0.97'
    }, {
        reg: /.[nrtumcd]al$/i,
        pos: 'JJ',
        strength: 513,
        errors: 16,
        accuracy: '0.97'
    }, {
        reg: /.que$/i,
        pos: 'JJ',
        strength: 26,
        errors: 1,
        accuracy: '0.96'
    }, {
        reg: /.[tnl]ary$/i,
        pos: 'JJ',
        strength: 87,
        errors: 4,
        accuracy: '0.95'
    }, {
        reg: /.[di]est$/i,
        pos: 'JJS',
        strength: 74,
        errors: 4,
        accuracy: '0.95'
    }, {
        reg: /^(un|de|re)\-[a-z]../i,
        pos: 'VB',
        strength: 44,
        errors: 2,
        accuracy: '0.95'
    }, {
        reg: /.lar$/i,
        pos: 'JJ',
        strength: 83,
        errors: 5,
        accuracy: '0.94'
    }, {
        reg: /[bszmp]{2}y/,
        pos: 'JJ',
        strength: 95,
        errors: 6,
        accuracy: '0.94'
    }, {
        reg: /.zes$/i,
        pos: 'VB',
        strength: 54,
        errors: 4,
        accuracy: '0.93'
    }, {
        reg: /.[icldtgrv]ent$/i,
        pos: 'JJ',
        strength: 214,
        errors: 14,
        accuracy: '0.93'
    }, {
        reg: /.[rln]ates$/i,
        pos: 'VBZ',
        strength: 74,
        errors: 5,
        accuracy: '0.93'
    }, {
        reg: /.[oe]ry$/i,
        pos: 'JJ',
        strength: 150,
        errors: 10,
        accuracy: '0.93'
    },

    {
        reg: /.[rdntk]ly$/i, ///****
        pos: 'RB',
        strength: 108,
        errors: 9,
        accuracy: '0.92'
    },

    {
        reg: /.[lsrnpb]ian$/i,
        pos: 'JJ',
        strength: 121,
        errors: 10,
        accuracy: '0.92'
    }, {
        reg: /.[vrl]id$/i,
        pos: 'JJ',
        strength: 23,
        errors: 2,
        accuracy: '0.91'
    }, {
        reg: /.[ilk]er$/i,
        pos: 'JJR',
        strength: 167,
        errors: 17,
        accuracy: '0.90'
    }, {
        reg: /.ike$/i,
        pos: 'JJ',
        strength: 71,
        errors: 8,
        accuracy: '0.89'
    }, {
        reg: /.ends$/i,
        pos: 'VB',
        strength: 24,
        errors: 3,
        accuracy: '0.88'
    }, {
        reg: /.wards$/i,
        pos: 'RB',
        strength: 31,
        errors: 4,
        accuracy: '0.87'
    }, {
        reg: /.rmy$/i,
        pos: 'JJ',
        strength: 7,
        errors: 1,
        accuracy: '0.86'
    }, {
        reg: /.rol$/i,
        pos: 'NN',
        strength: 7,
        errors: 1,
        accuracy: '0.86'
    }, {
        reg: /.tors$/i,
        pos: 'NN',
        strength: 7,
        errors: 1,
        accuracy: '0.86'
    }, {
        reg: /.azy$/i,
        pos: 'JJ',
        strength: 7,
        errors: 1,
        accuracy: '0.86'
    }, {
        reg: /.where$/i,
        pos: 'RB',
        strength: 7,
        errors: 1,
        accuracy: '0.86'
    }, {
        reg: /.ify$/i,
        pos: 'VB',
        strength: 49,
        errors: 7,
        accuracy: '0.86'
    }, {
        reg: /.bound$/i,
        pos: 'JJ',
        strength: 22,
        errors: 3,
        accuracy: '0.86'
    }, {
        reg: /.ens$/i,
        pos: 'VB',
        strength: 42,
        errors: 6,
        accuracy: '0.86'
    }, {
        reg: /.oid$/i,
        pos: 'JJ',
        strength: 20,
        errors: 3,
        accuracy: '0.85'
    }, {
        reg: /.vice$/i,
        pos: 'NN',
        strength: 6,
        errors: 1,
        accuracy: '0.83'
    }, {
        reg: /.rough$/i,
        pos: 'JJ',
        strength: 6,
        errors: 1,
        accuracy: '0.83'
    }, {
        reg: /.mum$/i,
        pos: 'JJ',
        strength: 6,
        errors: 1,
        accuracy: '0.83'
    }, {
        reg: /.teen(th)?$/i,
        pos: 'CD',
        strength: 17,
        errors: 3,
        accuracy: '0.82'
    }, {
        reg: /.oses$/i,
        pos: 'VB',
        strength: 22,
        errors: 4,
        accuracy: '0.82'
    }, {
        reg: /.ishes$/i,
        pos: 'VB',
        strength: 21,
        errors: 4,
        accuracy: '0.81'
    }, {
        reg: /.-ever$/i,
        pos: 'RB',
        strength: 10,
        errors: 2,
        accuracy: '0.80'
    }, {
        reg: /.ects$/i,
        pos: 'VB',
        strength: 30,
        errors: 6,
        accuracy: '0.80'
    }, {
        reg: /.ieth$/i,
        pos: 'CD',
        strength: 5,
        errors: 1,
        accuracy: '0.80'
    }, {
        reg: /.ices$/i,
        pos: 'NN',
        strength: 15,
        errors: 3,
        accuracy: '0.80'
    }, {
        reg: /.bles$/i,
        pos: 'VB',
        strength: 20,
        errors: 4,
        accuracy: '0.80'
    }, {
        reg: /.pose$/i,
        pos: 'VB',
        strength: 19,
        errors: 4,
        accuracy: '0.79'
    }, {
        reg: /.ions$/i,
        pos: 'NN',
        strength: 9,
        errors: 2,
        accuracy: '0.78'
    }, {
        reg: /.ean$/i,
        pos: 'JJ',
        strength: 32,
        errors: 7,
        accuracy: '0.78'
    }, {
        reg: /.[ia]sed$/i,
        pos: 'JJ',
        strength: 151,
        errors: 35,
        accuracy: '0.77'
    }, {
        reg: /.tized$/i,
        pos: 'VB',
        strength: 21,
        errors: 5,
        accuracy: '0.76'
    }, {
        reg: /.llen$/i,
        pos: 'JJ',
        strength: 8,
        errors: 2,
        accuracy: '0.75'
    }, {
        reg: /.fore$/i,
        pos: 'RB',
        strength: 8,
        errors: 2,
        accuracy: '0.75'
    }, {
        reg: /. of$/i,
        pos: 'RB',
        strength: 8,
        errors: 2,
        accuracy: '0.75'
    }, {
        reg: /.ances$/i,
        pos: 'NN',
        strength: 8,
        errors: 2,
        accuracy: '0.75'
    }, {
        reg: /.gate$/i,
        pos: 'VB',
        strength: 23,
        errors: 6,
        accuracy: '0.74'
    }, {
        reg: /.nes$/i,
        pos: 'VB',
        strength: 27,
        errors: 7,
        accuracy: '0.74'
    }, {
        reg: /.less$/i,
        pos: 'RB',
        strength: 11,
        errors: 3,
        accuracy: '0.73'
    }, {
        reg: /.ried$/i,
        pos: 'JJ',
        strength: 22,
        errors: 6,
        accuracy: '0.73'
    }, {
        reg: /.gone$/i,
        pos: 'JJ',
        strength: 7,
        errors: 2,
        accuracy: '0.71'
    }, {
        reg: /.made$/i,
        pos: 'JJ',
        strength: 7,
        errors: 2,
        accuracy: '0.71'
    }, {
        reg: /.[pdltrkvyns]ing$/i,
        pos: 'JJ',
        strength: 942,
        errors: 280,
        accuracy: '0.70'
    }, {
        reg: /.tions$/i,
        pos: 'NN',
        strength: 71,
        errors: 21,
        accuracy: '0.70'
    }, {
        reg: /.tures$/i,
        pos: 'NN',
        strength: 16,
        errors: 5,
        accuracy: '0.69'
    }, {
        reg: /.ous$/i,
        pos: 'JJ',
        strength: 6,
        errors: 2,
        accuracy: '0.67'
    }, {
        reg: /.ports$/i,
        pos: 'NN',
        strength: 9,
        errors: 3,
        accuracy: '0.67'
    }, {
        reg: /. so$/i,
        pos: 'RB',
        strength: 3,
        errors: 1,
        accuracy: '0.67'
    }, {
        reg: /.ints$/i,
        pos: 'NN',
        strength: 11,
        errors: 4,
        accuracy: '0.64'
    }, {
        reg: /.gled$/i,
        pos: 'JJ',
        strength: 16,
        errors: 7,
        accuracy: '0.56'
    }, {
        reg: /.lked$/i,
        pos: 'VB',
        strength: 16,
        errors: 7,
        accuracy: '0.56'
    }, {
        reg: /.fully$/i,
        pos: 'RB',
        strength: 13,
        errors: 6,
        accuracy: '0.54'
    }, {
        reg: /.*ould$/,
        pos: 'MD',
        strength: 3,
        errors: 0,
        accuracy: '0.00'
    },

    {
        reg: /^-?[0-9]+(.[0-9]+)?$/,
        pos: 'CD',
        strength: 1,
        errors: 1,
        accuracy: '0.00'
    },

    //ugly handling of contractions

    {
        reg: /[a-z]'s$/i, //spencer's
        pos: 'NN',
        strength: 1,
        errors: 0,
        accuracy: '0.00'
    }, {
        reg: /.'n$/i, //walk'n
        pos: 'VB',
        strength: 1,
        errors: 0,
        accuracy: '0.00'
    }, {
        reg: /.'re$/i, //they're
        pos: 'CP',
        strength: 1,
        errors: 0,
        accuracy: '0.00'
    }, {
        reg: /.'ll$/i, //they'll
        pos: 'MD',
        strength: 1,
        errors: 0,
        accuracy: '0.00'
    },


]

if (typeof module !== "undefined" && module.exports) {
    exports.rules = word_rules;
}
// word suffixes with a high pos signal, generated with wordnet
//by spencer kelly spencermountain@gmail.com  2014
var wordnet_suffixes = (function() {

  var data = {
    "tion": "NN",
    "ness": "NN",
    "idae": "NN",
    "ceae": "NN",
    "ment": "NN",
    "lity": "NN",
    "ting": "JJ",
    "tree": "NN",
    "ring": "JJ",
    "ator": "NN",
    "logy": "NN",
    "alis": "NN",
    "stem": "NN",
    "ales": "NN",
    "osis": "NN",
    "itis": "NN",
    "aria": "NN",
    "unit": "NN",
    "atus": "NN",
    "ency": "NN",
    "wood": "NN",
    "nism": "NN",
    "weed": "NN",
    "lism": "NN",
    "nsis": "NN",
    "fern": "NN",
    "onia": "NN",
    "ella": "NN",
    "vein": "NN",
    "olia": "NN",
    "emia": "NN",
    "urus": "NN",
    "ides": "NN",
    "esis": "NN",
    "inus": "NN",
    "rium": "NN",
    "tive": "JJ",
    "eria": "NN",
    "aker": "NN",
    "tate": "VB",
    "able": "JJ",
    "ound": "VB",
    "dium": "NN",
    "bird": "NN",
    "city": "NN",
    "aris": "NN",
    "gist": "NN",
    "rate": "VB",
    "cher": "NN",
    "icus": "NN",
    "time": "RB",
    "illa": "NN",
    "anus": "NN",
    "rity": "NN",
    "uage": "NN",
    "atum": "NN",
    "over": "VB",
    "nium": "NN",
    "tomy": "NN",
    "wort": "NN",
    "vity": "NN",
    "vice": "NN",
    "cell": "NN",
    "lata": "NN",
    "rier": "NN",
    "ulus": "NN",
    "lium": "NN",
    "late": "VB",
    "tics": "NN",
    "tory": "JJ",
    "aphy": "NN",
    "iana": "NN",
    "tism": "NN",
    "iser": "NN",
    "thus": "NN",
    "esia": "NN",
    "bush": "NN",
    "nake": "NN",
    "root": "NN",
    "llus": "NN",
    "nity": "NN",
    "rmes": "NN",
    "icle": "NN",
    "bean": "NN",
    "nica": "NN",
    "erer": "NN",
    "orus": "NN",
    "ancy": "NN",
    "iner": "NN",
    "sity": "NN",
    "ysis": "NN",
    "leaf": "NN",
    "enia": "NN",
    "worm": "NN",
    "etry": "NN",
    "bone": "NN",
    "psis": "NN",
    "tera": "NN",
    "cope": "NN",
    "sman": "NN",
    "izer": "NN",
    "ayer": "NN",
    "irus": "NN",
    "eris": "NN",
    "rism": "NN",
    "lily": "NN",
    "rius": "NN",
    "back": "VB",
    "book": "NN",
    "rial": "JJ",
    "tica": "NN",
    "tein": "NN",
    "ctus": "NN",
    "nner": "NN",
    "asia": "NN",
    "horn": "NN",
    "moth": "NN",
    "cism": "NN",
    "cake": "NN",
    "rker": "NN",
    "etes": "NN",
    "alia": "NN",
    "ings": "NN",
    "drug": "NN",
    "area": "NN",
    "nate": "VB",
    "icum": "NN",
    "llum": "NN",
    "stry": "NN",
    "scle": "NN",
    "oner": "NN",
    "ania": "NN",
    "ader": "NN",
    "erus": "NN",
    "idea": "NN",
    "inia": "NN",
    "itor": "NN",
    "ilis": "NN",
    "alus": "NN",
    "ille": "NN",
    "game": "NN",
    "hair": "NN",
    "uria": "NN",
    "rina": "NN",
    "anum": "NN",
    "trum": "NN",
    "tude": "NN",
    "ngus": "NN",
    "opus": "NN",
    "rica": "NN",
    "chus": "NN",
    "body": "NN",
    "ncer": "NN",
    "ates": "NN",
    "auce": "NN",
    "bill": "NN",
    "tube": "NN",
    "tina": "NN",
    "osus": "NN",
    "card": "NN",
    "odon": "NN",
    "cana": "NN",
    "dity": "NN",
    "ions": "NN",
    "inum": "NN",
    "ntia": "NN",
    "eper": "NN",
    "llet": "NN",
    "xide": "NN",
    "enus": "NN",
    "inae": "NN",
    "agon": "NN",
    "chid": "NN",
    "etle": "NN",
    "zard": "NN",
    "ener": "NN",
    "boat": "NN",
    "chia": "NN",
    "ward": "RB",
    "lora": "NN",
    "poda": "NN",
    "otus": "NN",
    "tris": "NN",
    "iron": "NN",
    "acea": "NN",
    "orum": "NN",
    "hora": "NN",
    "toma": "NN",
    "icer": "NN",
    "ilus": "NN",
    "nson": "NN",
    "rpus": "NN",
    "bell": "NN",
    "rata": "NN",
    "lamp": "NN",
    "palm": "NN",
    "ourt": "NN",
    "rrel": "NN",
    "down": "VB",
    "dron": "NN",
    "mann": "NN",
    "elia": "NN",
    "obia": "NN",
    "gery": "NN",
    "iper": "NN",
    "star": "NN",
    "inea": "NN",
    "eman": "NN",
    "tium": "NN",
    "tata": "NN",
    "rgan": "NN",
    "ical": "JJ",
    "gate": "VB",
    "stic": "JJ",
    "hand": "RB",
    "sive": "JJ",
    "east": "RB",
    "etic": "JJ",
    "away": "VB",
    "cent": "JJ",
    "cate": "VB",
    "onal": "JJ",
    "ible": "JJ",
    "iate": "VB",
    "atic": "JJ",
    "onic": "JJ",
    "ards": "RB",
    "otic": "JJ",
    "ular": "JJ",
    "rise": "VB",
    "ious": "JJ",
    "tric": "JJ",
    "ully": "RB",
    "erly": "RB",
    "ally": "RB",
    "shed": "JJ",
    "sted": "JJ",
    "less": "JJ",
    "rous": "JJ",
    "lize": "VB",
    "lise": "VB",
    "nize": "VB",
    "rize": "VB",
    "nise": "VB",
    "tise": "VB",
    "tize": "VB",
    "mize": "VB",
    "into": "VB",
    "tify": "VB",
    "rify": "VB",
    "self": "VB",
    "esce": "VB",
    "duce": "VB",
    "cize": "VB",
    "dize": "VB",
    "gize": "VB",
    "gise": "VB",
    "nify": "VB",
    "ieve": "VB",
    "lify": "VB",
    "sify": "VB",
    "pend": "VB",
    "hise": "VB",
    "lude": "VB",
    "tend": "VB",
    "olve": "VB",
    "dify": "VB",
    "sise": "VB",
    "open": "VB",
    "eive": "VB",
    "cede": "VB",
    "cify": "VB",
    "hize": "VB",
    "lyse": "VB",
    "ruct": "VB",
    "lyze": "VB",
    "vize": "VB",
    "hten": "VB",
    "sess": "VB",
    "from": "VB",
    "sume": "VB",
    "inst": "VB",
    "join": "VB",
    "sorb": "VB",
    "gest": "VB",
    "-dye": "VB",
    "vene": "VB",
    "voke": "VB",
    "cuss": "VB",
    "cend": "VB",
    "make": "VB",
    "bute": "VB",
    "grow": "VB",
    "hend": "VB",
    "pute": "VB",
    "roil": "VB",
    "othe": "VB",
    "laze": "VB",
    "mote": "VB",
    "cute": "VB",
    "uise": "VB",
    "jure": "VB",
    "uire": "VB",
    "cook": "VB",
    "hind": "VB",
    "fend": "VB",
    "owse": "VB",
    "ooch": "VB",
    "mend": "VB",
    "vest": "VB",
    "dain": "VB",
    "rble": "VB",
    "tort": "VB",
    "uild": "VB",
    "quer": "VB",
    "ooze": "VB",
    "rude": "VB",
    "ulge": "VB",
    "weld": "VB",
    "uiet": "VB",
    "narl": "VB",
    "look": "VB",
    "efer": "VB",
    "elop": "VB",
    "pply": "VB",
    "lore": "VB",
    "draw": "VB",
    "lump": "VB",
    "lunk": "VB",
    "lame": "VB",
    "lign": "VB",
    "hink": "VB",
    "-fry": "VB",
    "ivel": "VB",
    "wrap": "VB",
    "vail": "VB",
    "till": "VB",
    "hack": "VB",
    "earn": "VB",
    "sult": "VB",
    "dime": "VB",
    "rlay": "VB",
    "mute": "VB",
    "ourn": "VB",
    "uess": "VB",
    "bify": "VB",
    "tink": "VB",
    "raid": "VB",
    "uize": "VB",
    "huck": "VB",
    "ccur": "VB",
    "vide": "VB",
    "anse": "VB",
    "hify": "VB",
    "xist": "VB",
    "rgle": "VB",
    "pare": "VB",
    "bind": "VB",
    "veil": "VB",
    "uote": "VB",
    "pond": "VB",
    "like": "JJ",
    "eels": "VB",
    "hear": "VB",
    "otle": "VB",
    "tect": "VB",
    "pret": "VB",
    "eact": "VB",
    "idle": "VB",
    "rbid": "VB",
    "xate": "VB",
    "surf": "VB",
    "ploy": "VB",
    "erit": "VB",
    "elay": "VB",
    "adow": "VB",
    "ceed": "VB",
    "raze": "VB",
    "vote": "VB",
    "mmit": "VB",
    "fest": "VB",
    "fill": "VB",
    "shen": "VB",
    "resh": "VB",
    "lict": "VB",
    "mify": "VB",
    "eset": "VB",
    "rump": "VB",
    "pugn": "VB",
    "feit": "VB",
    "vict": "VB",
    "elch": "VB",
    "oosh": "VB",
    "rken": "VB",
    "nect": "VB",
    "vade": "VB",
    "pick": "VB",
    "hirr": "VB",
    "ated": "JJ",
    "ered": "JJ",
    "ized": "JJ",
    "ised": "JJ",
    "aped": "JJ",
    "nted": "JJ",
    "nded": "JJ",
    "eous": "JJ",
    "nous": "JJ",
    "ined": "JJ",
    "ured": "JJ",
    "lled": "JJ",
    "lous": "JJ",
    "phic": "JJ",
    "ored": "JJ",
    "ssed": "JJ",
    "aded": "JJ",
    "fied": "JJ",
    "cted": "JJ",
    "ched": "JJ",
    "rted": "JJ",
    "oned": "JJ",
    "ired": "JJ",
    "cked": "JJ",
    "ened": "JJ",
    "ited": "JJ",
    "eyed": "JJ",
    "mous": "JJ",
    "pped": "JJ",
    "opic": "JJ",
    "tous": "JJ",
    "uous": "JJ",
    "osed": "JJ",
    "iled": "JJ",
    "ried": "JJ",
    "tted": "JJ",
    "aced": "JJ",
    "ytic": "JJ",
    "gged": "JJ",
    "nged": "JJ",
    "emic": "JJ",
    "eled": "JJ",
    "ared": "JJ",
    "thed": "JJ",
    "omic": "JJ",
    "aged": "JJ",
    "rmed": "JJ",
    "rned": "JJ",
    "aved": "JJ",
    "ided": "JJ",
    "oted": "JJ",
    "died": "JJ",
    "mmed": "JJ",
    "nned": "JJ",
    "oric": "JJ",
    "hted": "JJ",
    "rmal": "JJ",
    "rred": "JJ",
    "nced": "JJ",
    "owed": "JJ",
    "dled": "JJ",
    "gous": "JJ",
    "amic": "JJ",
    "ased": "JJ",
    "used": "JJ",
    "rmic": "JJ",
    "dged": "JJ",
    "amed": "JJ",
    "iced": "JJ",
    "aled": "JJ",
    "-red": "JJ",
    "eted": "JJ",
    "hful": "JJ",
    "rved": "JJ",
    "aked": "JJ",
    "tled": "JJ",
    "obic": "JJ",
    "uted": "JJ",
    "lted": "JJ",
    "dial": "JJ",
    "omed": "JJ",
    "neal": "JJ",
    "d-up": "JJ",
    "gled": "JJ",
    "hous": "JJ",
    "eded": "JJ",
    "bled": "JJ",
    "kish": "JJ",
    "oved": "JJ",
    "oded": "JJ",
    "ifth": "JJ",
    "afed": "JJ",
    "rnal": "JJ",
    "pled": "JJ",
    "ilic": "JJ",
    "pted": "JJ",
    "ived": "JJ",
    "smal": "JJ",
    "imed": "JJ",
    "five": "JJ",
    "wise": "RB",
    "made": "JJ",
    "oked": "JJ",
    "cous": "JJ",
    "pish": "JJ",
    "rded": "JJ",
    "pous": "JJ",
    "lied": "JJ",
    "kled": "JJ",
    "acal": "JJ",
    "lved": "JJ",
    "rful": "JJ",
    "atal": "JJ",
    "odic": "JJ",
    "bred": "JJ",
    "bbed": "JJ",
    "awed": "JJ",
    "yish": "JJ",
    "rked": "JJ",
    "ylic": "JJ",
    "obed": "JJ",
    "rged": "JJ",
    "chic": "JJ",
    "sial": "JJ",
    "smic": "JJ",
    "tchy": "JJ",
    "exed": "JJ",
    "oped": "JJ",
    "rgic": "JJ",
    "dded": "JJ",
    "geal": "JJ",
    "oxic": "JJ",
    "arly": "RB",
    "ayed": "JJ",
    "-one": "JJ",
    "utic": "JJ",
    "rbed": "JJ",
    "gish": "JJ",
    "worn": "JJ",
    "enal": "JJ",
    "rced": "JJ",
    "kian": "JJ",
    "gned": "JJ",
    "abic": "JJ",
    "lear": "JJ",
    "sick": "JJ",
    "usty": "JJ",
    "llic": "JJ",
    "azed": "JJ",
    "rsed": "JJ",
    "atty": "JJ",
    "idic": "JJ",
    "dous": "JJ",
    "-for": "JJ",
    "mbed": "JJ",
    "ghty": "JJ",
    "stly": "RB",
    "abby": "JJ",
    "vial": "JJ",
    "ocal": "JJ",
    "wned": "JJ",
    "ilar": "JJ",
    "nied": "JJ",
    "iful": "JJ",
    "wide": "JJ",
    "clic": "JJ",
    "appy": "JJ",
    "agic": "JJ",
    "cled": "JJ",
    "hree": "JJ",
    "oyed": "JJ",
    "ypic": "JJ",
    "ixed": "JJ",
    "lful": "JJ",
    "ushy": "JJ",
    "eedy": "JJ",
    "bial": "JJ",
    "rtal": "JJ",
    "mose": "JJ",
    "uric": "JJ",
    "near": "JJ",
    "icky": "JJ",
    "ibed": "JJ",
    "odal": "JJ",
    "umed": "JJ",
    "-day": "JJ",
    "-six": "JJ",
    "gual": "JJ",
    "uled": "JJ",
    "sual": "JJ",
    "nked": "JJ",
    "rled": "JJ",
    "aned": "JJ",
    "-two": "JJ",
    "dful": "JJ",
    "eaky": "JJ",
    "ofed": "JJ",
    "ubby": "JJ",
    "clad": "JJ",
    "aten": "JJ",
    "rdly": "RB",
    "odox": "JJ",
    "cose": "JJ",
    "lded": "JJ",
    "lial": "JJ",
    "fled": "JJ",
    "nown": "JJ",
    "ffed": "JJ",
    "uced": "JJ",
    "uded": "JJ",
    "-fed": "JJ",
    "mped": "JJ",
    "ingy": "JJ",
    "chal": "JJ",
    "vish": "JJ",
    "otal": "JJ",
    "uant": "JJ",
    "oled": "JJ",
    "zled": "JJ",
    "ugal": "JJ",
    "ctal": "JJ",
    "umpy": "JJ",
    "aggy": "JJ",
    "fted": "JJ",
    "ozen": "JJ",
    "ngly": "RB",
    "-old": "JJ",
    "bbly": "JJ",
    "knit": "JJ",
    "hmic": "JJ",
    "ewed": "JJ",
    "ippy": "JJ",
    "ssic": "JJ",
    "toed": "JJ",
    "nsed": "JJ",
    "otty": "JJ",
    "xial": "JJ",
    "hnic": "JJ",
    "ashy": "JJ",
    "hial": "JJ",
    "lown": "JJ",
    "rung": "JJ",
    "omal": "JJ",
    "unar": "JJ",
    "asal": "JJ",
    "wish": "JJ",
    "ylar": "JJ",
    "00th": "JJ",
    "oeic": "JJ",
    "teal": "JJ",
    "ifty": "JJ",
    "ifid": "JJ",
    "oggy": "JJ",
    "-cut": "JJ",
    "ymic": "JJ",
    "lked": "JJ",
    "lthy": "JJ",
    "assy": "JJ",
    "full": "JJ",
    "yant": "JJ",
    "ucky": "JJ",
    "gued": "JJ",
    "mely": "RB",
    "bral": "JJ",
    "sful": "JJ",
    "shod": "JJ",
    "neic": "JJ",
    "sked": "JJ",
    "nchy": "JJ",
    "urth": "JJ",
    "ccal": "JJ",
    "lued": "JJ",
    "mbic": "JJ",
    "itty": "JJ",
    "edth": "JJ",
    "ggly": "JJ",
    "mned": "JJ",
    "pied": "JJ",
    "axed": "JJ",
    "ecal": "JJ",
    "cile": "JJ",
    "tred": "JJ",
    "uffy": "JJ",
    "edic": "JJ",
    "anky": "JJ",
    "inct": "JJ",
    "asic": "JJ",
    "wept": "JJ",
    "-air": "JJ",
    "impy": "JJ",
    "eamy": "JJ",
    "-set": "JJ",
    "ltic": "JJ",
    "ishy": "JJ",
    "bous": "JJ",
    "tied": "JJ",
    "-ply": "JJ",
    "eval": "JJ",
    "cave": "JJ",
    "adic": "JJ",
    "ocky": "JJ",
    "icit": "JJ",
    "liar": "JJ",
    "wful": "JJ",
    "dern": "JJ",
    "xvii": "JJ",
    "hean": "JJ",
    "ossy": "JJ",
    "nvex": "JJ",
    "unky": "JJ",
    "roud": "JJ",
    "hral": "JJ",
    "angy": "JJ",
    "pant": "JJ",
    "eked": "JJ",
    "nnic": "JJ",
    "siac": "JJ",
    "esic": "JJ",
    "boid": "JJ",
    "rual": "JJ",
    "iffy": "JJ",
    "adal": "JJ",
    "dest": "JJ",
    "irty": "JJ",
    "kety": "JJ",
    "inty": "JJ",
    "lgic": "JJ",
    "hird": "JJ",
    "dric": "JJ",
    "gone": "JJ",
    "unct": "JJ",
    "t-up": "JJ",
    "raic": "JJ",
    "isty": "JJ",
    "paid": "JJ",
    "ilty": "JJ",
    "uing": "JJ",
    "zian": "JJ",
    "emal": "JJ",
    "gean": "JJ",
    "ixth": "JJ",
    "gful": "JJ",
    "eeny": "JJ",
    "easy": "JJ",
    "eged": "JJ",
    "-way": "JJ",
    "uddy": "JJ",
    "liac": "JJ",
    "lden": "JJ",
    "bose": "JJ",
    "iose": "JJ",
    "cive": "JJ",
    "tean": "JJ",
    "dral": "JJ",
    "eved": "JJ",
    "igid": "JJ",
    "llel": "JJ",
    "orty": "JJ",
    "ctyl": "JJ",
    "nkly": "JJ",
    "ghth": "JJ",
    "yric": "JJ",
    "-run": "JJ",
    "eian": "JJ",
    "eepy": "JJ",
    "tood": "JJ",
    "ltry": "JJ",
    "ubic": "JJ",
    "wery": "JJ",
    "nken": "JJ",
    "apen": "JJ",
    "mful": "JJ",
    "emed": "JJ",
    "gile": "JJ",
    "mart": "JJ",
    "yzed": "JJ",
    "alid": "JJ",
    "toic": "JJ",
    "-top": "JJ",
    "rtan": "JJ",
    "mant": "JJ",
    "ngry": "JJ",
    "eyan": "JJ",
    "yoid": "JJ",
    "urnt": "JJ",
    "urvy": "JJ",
    "tair": "JJ",
    "hoid": "JJ",
    "egic": "JJ",
    "moid": "JJ",
    "llan": "JJ",
    "tech": "JJ",
    "ulky": "JJ",
    "osey": "JJ",
    "orny": "JJ",
    "ormy": "JJ",
    "dual": "JJ",
    "oury": "JJ",
    "qual": "JJ",
    "teed": "JJ",
    "eezy": "JJ",
    "rdic": "JJ",
    "alky": "JJ",
    "afty": "JJ",
    "acky": "JJ",
    "ymed": "JJ",
    "yful": "JJ",
    "epid": "JJ",
    "unic": "JJ",
    "endo": "JJ",
    "ensy": "JJ",
    "iked": "JJ",
    "ghed": "JJ",
    "tuck": "JJ",
    "odly": "JJ",
    "iric": "JJ",
    "awny": "JJ",
    "udal": "JJ",
    "axic": "JJ",
    "awky": "JJ",
    "rbal": "JJ",
    "owsy": "JJ",
    "-key": "JJ",
    "-end": "JJ",
    "ammy": "JJ",
    "mune": "JJ",
    "ulic": "JJ",
    "izan": "JJ",
    "ndan": "JJ",
    "true": "JJ",
    "eery": "JJ",
    "zzly": "JJ",
    "eige": "JJ",
    "xxiv": "JJ",
    "odan": "JJ",
    "-toe": "JJ",
    "laid": "JJ",
    "utty": "JJ",
    "usky": "JJ",
    "issy": "JJ",
    "deaf": "JJ",
    "maic": "JJ",
    "vous": "JJ",
    "rpal": "JJ",
    "exic": "JJ",
    "soid": "JJ",
    "ucal": "JJ",
    "oopy": "JJ",
    "lmed": "JJ",
    "roic": "JJ",
    "cund": "JJ",
    "arse": "JJ",
    "vely": "RB",
    "uchy": "JJ",
    "ussy": "JJ",
    "d-on": "JJ",
    "izzy": "JJ",
    "pean": "JJ",
    "mane": "JJ",
    "etty": "JJ",
    "ebby": "JJ",
    "phal": "JJ",
    "odgy": "JJ",
    "ober": "JJ",
    "hoic": "JJ",
    "taic": "JJ",
    "oeal": "JJ",
    "cral": "JJ",
    "hewn": "JJ",
    "heal": "JJ",
    "xxii": "JJ",
    "ainy": "JJ",
    "apid": "JJ",
    "lowy": "JJ",
    "nlit": "JJ",
    "held": "JJ",
    "xxvi": "JJ",
    "inky": "JJ",
    "nsic": "JJ",
    "olid": "JJ",
    "eban": "JJ",
    "kful": "JJ",
    "siny": "JJ",
    "usly": "RB",
    "ably": "RB",
    "ntly": "RB",
    "edly": "RB",
    "tely": "RB",
    "ssly": "RB",
    "shly": "RB",
    "rily": "RB",
    "ibly": "RB",
    "idly": "RB",
    "tily": "RB",
    "sely": "RB",
    "rely": "RB",
    "dily": "RB",
    "kily": "RB",
    "hily": "RB",
    "nely": "RB",
    "ctly": "RB",
    "sily": "RB",
    "ways": "RB",
    "rtly": "RB",
    "pily": "RB",
    "gily": "RB",
    "itly": "RB",
    "nily": "RB",
    "zily": "RB",
    "lely": "RB",
    "etly": "RB",
    "uely": "RB",
    "adly": "RB",
    "much": "RB",
    "gely": "RB",
    "imly": "RB",
    "oubt": "RB",
    "vily": "RB",
    "ftly": "RB",
    "ptly": "RB",
    "chly": "RB",
    "owly": "RB",
    "cely": "RB",
    "rnly": "RB",
    "mply": "RB",
    "cily": "RB",
    "ghly": "RB",
    "that": "RB",
    "rmly": "RB",
    "dely": "RB",
    "high": "RB",
    "orst": "RB",
    "atly": "RB",
    "exly": "RB",
    "atim": "RB",
    "diem": "RB",
    "iori": "RB",
    "utly": "RB",
    "oors": "RB",
    "ffly": "RB",
    "udly": "RB",
    "bily": "RB"
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = data;
  }
  return data;
})();
var parts_of_speech = (function() {

    var main = {

        //verbs
        "VB": {
            "name": "verb",
            "example": "eat",
            "parent": "verb",
            "tag": "VB"
        },
        "VBD": {
            "name": "past-tense verb",
            "example": "ate",
            "parent": "verb",
            "tense": "past",
            "tag": "VBD"
        },
        "VBN": {
            "name": "past-participle verb",
            "example": "eaten",
            "parent": "verb",
            "tense": "past",
            "tag": "VBN"
        },
        "VBP": {
            "name": "infinitive verb",
            "example": "eat",
            "parent": "verb",
            "tense": "present",
            "tag": "VBP"
        },
        "VBZ": {
            "name": "present-tense verb",
            "example": "eats, swims",
            "tense": "present",
            "parent": "verb",
            "tag": "VBZ"
        },
        "CP": {
            "name": "copula",
            "example": "is, was, were",
            "parent": "verb",
            "tag": "CP"
        },
        "VBG": {
            "name": "gerund verb",
            "example": "eating,winning",
            "parent": "verb",
            "tag": "VBG"
        },


        //adjectives
        "JJ": {
            "name": "adjective",
            "example": "big, nice",
            "parent": "adjective",
            "tag": "JJ"
        },
        "JJR": {
            "name": "comparative adjective",
            "example": "bigger, cooler",
            "parent": "adjective",
            "tag": "JJR"
        },
        "JJS": {
            "name": "superlative adjective",
            "example": "biggest, fattest",
            "parent": "adjective",
            "tag": "JJS"
        },


        //adverbs
        "RB": {
            "name": "adverb",
            "example": "quickly, softly",
            "parent": "adverb",
            "tag": "RB"
        },
        "RBR": {
            "name": "comparative adverb",
            "example": "faster, cooler",
            "parent": "adverb",
            "tag": "RBR"
        },
        "RBS": {
            "name": "superlative adverb",
            "example": "fastest (driving), coolest (looking)",
            "parent": "adverb",
            "tag": "RBS"
        },


        //nouns
        "NN": {
            "name": "noun",
            "example": "dog, rain",
            "parent": "noun",
            "tag": "NN"
        },
        "NNP": {
            "name": "singular proper noun",
            "example": "Edinburgh, skateboard",
            "parent": "noun",
            "tag": "NNP"
        },
        "NNPS": {
            "name": "plural proper noun",
            "example": "Smiths",
            "parent": "noun",
            "tag": "NNPS"
        },
        "NNS": {
            "name": "plural noun",
            "example": "dogs, foxes",
            "parent": "noun",
            "tag": "NNS"
        },
        "NNO": {
            "name": "possessive noun",
            "example": "spencer's, sam's",
            "parent": "noun",
            "tag": "NNO"
        },
        "NG": {
            "name": "gerund noun",
            "example": "eating,winning - but used grammatically as a noun",
            "parent": "noun",
            "tag": "VBG"
        },


        //glue
        "PP": {
            "name": "possessive pronoun",
            "example": "my,one's",
            "parent": "glue",
            "tag": "PP"
        },
        "FW": {
            "name": "foreign word",
            "example": "mon dieu, voila",
            "parent": "glue",
            "tag": "FW"
        },
        "CD": {
            "name": "cardinal number",
            "example": "one,two",
            "parent": "value",
            "tag": "CD"
        },

        "IN": {
            "name": "preposition",
            "example": "of,in,by",
            "parent": "glue",
            "tag": "IN"
        },
        "MD": {
            "name": "modal verb",
            "example": "can,should",
            "parent": "glue", //dunno
            "tag": "MD"
        },
        "CC": {
            "name": "co-ordating conjunction",
            "example": "and,but,or",
            "parent": "glue",
            "tag": "CC"
        },
        "PRP": {
            "name": "personal pronoun",
            "example": "I,you,she",
            "parent": "noun",
            "tag": "PRP"
        },
        "DT": {
            "name": "determiner",
            "example": "the,some",
            "parent": "glue",
            "tag": "DT"
        },
        "UH": {
            "name": "interjection",
            "example": "oh, oops",
            "parent": "glue",
            "tag": "UH"
        },
        "EX": {
            "name": "existential there",
            "example": "there",
            "parent": "glue",
            "tag": "EX"
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = main;
    }

    return main
})()
var to_number = (function() {

    var numbers = {
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
        'twenty': 20,
        'thirty': 30,
        'forty': 40,
        'fifty': 50,
        'sixty': 60,
        'seventy': 70,
        'eighty': 80,
        'ninety': 90
    };

    var magnitudes = {
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
        'decillion': 1000000000000000000000000000000000,
    };


    var main = function(s) {
        var multiplier = 1
        var total = 0;
        var g = 0;
        //things like 'half-million'
        var mults = [{
            reg: /^(a\s)?half[\s-]/i,
            mult: 0.5
        }, {
            reg: /^(a\s)?quarter[\s-]/i,
            mult: 0.25
        }, {
            reg: /and[\s-]a[\s-]half\b/i,
            mult: 1.5
        }]
        for (var i = 0; i < mults.length; i++) {
            if (s.match(mults[i].reg)) {
                multiplier = mults[i].mult;
                s = s.replace(mults[i].reg, ' ')
            }
        }
        var a = s.toString().split(/[\s-]+/);
        a.forEach(function(w) {
            if (w == "and") {
                return
            }
            if (parseFloat(w)) { //it's already a number, like '4'
                g += parseFloat(w)
            } else if (numbers[w]) { //it's a known value, like 'three'
                g += numbers[w];
            } else if (magnitudes[w]) { //it's a magnitude, like 'hundred'
                total += (magnitudes[w] * (g || 1)) //dont ever multiply it by 0
                g = 0;
            }
        });
        return (total + g) * multiplier
    }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = main;
    }
    return main;
})();

// console.log(to_number("twenty two thousand five hundred") == 22500)
// console.log(to_number("two thousand five hundred and sixty") == 2560)
// console.log(to_number("a hundred and two") == 102)
// console.log(to_number("a hundred") == 100)
// console.log(to_number("seven") == 7)
// console.log(to_number("seven grand") == 7000)
// console.log(to_number("half a million") == 500000)
// console.log(to_number("half-million") == 500000)
// console.log(to_number("quarter-million") == 250000)
// console.log(to_number("a quarter million") == 250000)
// console.log(to_number("a quarter-grand") == 250)
// console.log(to_number("four and a half") == 6)
// console.log(to_number("ten and a half million") == 15000000)
// console.log(to_number("104") == 104)
// console.log(to_number("13 thousand") == 13000)
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
      text = text.replace(/ Feb\.? /g, ' February ');
      text = text.replace(/ Mar\.? /g, ' March ');
      text = text.replace(/ Apr\.? /g, ' April ');
      text = text.replace(/ Jun\.? /g, ' June ');
      text = text.replace(/ Jul\.? /g, ' July ');
      text = text.replace(/ Aug\.? /g, ' August ');
      text = text.replace(/ Sep\.? /g, ' September ');
      text = text.replace(/ Oct\.? /g, ' October ');
      text = text.replace(/ Nov\.? /g, ' November ');
      text = text.replace(/ Dec\.? /g, ' December ');

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


// console.log(date_extractor("it was Feb. 14 1969"))
var Value = function(str) {
	var the = this
	the.word = str;

	if (typeof module !== "undefined" && module.exports) {
		to_number = require("./to_number")
		dates = require("./dates")
	}


	the.number = to_number(the.word)

	return the;
};
if (typeof module !== "undefined" && module.exports) {
	module.exports = Value;
}

// s = new Value("fifty five")
// console.log(s)
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
			"uber": "an", //german u
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
		an_acronyms = {
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
			X: true,
		}

		//'a' regexes
		a_regexs = [
			/^onc?e/i, //'wu' sound of 'o'
			/^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
			/^eul/i
		]

		//begin business time
		////////////////////
		//explicit irregular forms
		if (irregulars[str]) {
			return irregulars[str]
		}
		//spelled-out acronyms
		if (is_acronym(str) && an_acronyms[str.substr(0, 1)]) {
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


// console.log(indefinite_article("wolf") == "a")
// console.log(indefinite_article("eulogy") == "a")
// console.log(indefinite_article("eater") == "an")
// console.log(indefinite_article("african") == "an")
// console.log(indefinite_article("houri") == "a")
// console.log(indefinite_article("awful") == "an")
// console.log(indefinite_article("utter") == "an")
// console.log(indefinite_article('S.S.L.') == "an")
// console.log(indefinite_article('FBI') == "an")
// console.log(indefinite_article('GHQ') == "a")
//some regex borrowed from pksunkara/inflect
//https://github.com/pksunkara/inflect/blob/master/lib/defaults.js

inflect = (function() {
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


    var is_plural = function(str) {
        for (var i = 0; i < irregulars.length; i++) {
            if (irregulars[i][1] == str) {
                return true
            }
            if (irregulars[i][0] == str) {
                return false
            }
        }
        if (str.match(/s$/)) {
            return true
        }
    }

    var inflect = function(str) {
        if (is_plural(str)) {
            return {
                plural: str,
                singular: singularize(str),
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
var Noun = function(str) {
	var the = this
	the.word = str;

	if (typeof module !== "undefined" && module.exports) {
		inflect = require("./conjugate/inflect")
	}


	the.conjugate = (function() {
		return inflect.inflect(the.word)
	})(),

	the.inflection = (function() {
		if (inflect.is_plural(the.word)) {
			return "plural"
		} else {
			return "singular"
		}
	})()


	return the;
}
if (typeof module !== "undefined" && module.exports) {
	module.exports = Noun;
}


// console.log(nouns.conjugate('farmhouse'))
// var n = new Noun('kitchen')
// console.log(n)
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
			"wholly": "whole",
		}
		var transforms = [{
			reg: /bly$/i,
			repl: 'ble',
		}, {
			reg: /gically$/i,
			repl: 'gical',
		}, {
			reg: /([rsdh])ically$/i,
			repl: '$1ical',
		}, {
			reg: /ically$/i,
			repl: 'ic',
		}, {
			reg: /uly$/i,
			repl: 'ue',
		}, {
			reg: /ily$/i,
			repl: 'y',
		}, {
			reg: /(.{3})ly$/i,
			repl: '$1',
		}, ]
		if (irregulars[str]) {
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

// console.log(to_adjective('quickly') == 'quick')
// console.log(to_adjective('marvelously') == 'marvelous')
// console.log(to_adjective('marvelously') == 'marvelous')

// data = require("./test").data
// data = data.filter(function(w) {
// 	return to_adjective(w[0]) != w[1]
// })

// arr = data.map(function(w) {
// 	console.log(w[0] + " -  " + to_adjective(w[0]))
// })
var Adverb = function(str) {
	var the = this
	the.word = str;

	if (typeof module !== "undefined" && module.exports) {
		to_adjective = require("./conjugate/to_adjective")
	}

	var main = {

		conjugate: (function() {
			return {
				adjective: to_adjective(the.word)
			}
		})(),

	}
	return main;
}

if (typeof module !== "undefined" && module.exports) {
	module.exports = Adverb;
}

// a = new Adverb("suddenly")
// console.log(a)
// console.log(adverbs.conjugate('powerfully'))
verb_conjugate = (function() {

  var verb_rules = [

    // //infinitive
    {
      reg: /([a[tg]|i[zn]]|ur|nc|gl|is)e$/i,
      repl: {
        present: "$1es",
        gerund: "$1ing",
        past: "$1ed"
      },
      examples: 'angulate, stipulate, orientate',
      exceptions: ["ate", "overate"],
      power: 804,
      tense: 'infinitive'
    }, {
      reg: /([i|f|rr])y$/i,
      repl: {
        present: "$1ies",
        gerund: "$1ying",
        past: "$1ied"
      },
      examples: 'unify, classify, glorify',
      exceptions: [],
      power: 128,
      tense: 'infinitive'
    }, {
      reg: /([td]er)$/i,
      repl: {
        present: "$1s",
        gerund: "$1ing",
        past: "$1ed"
      },
      examples: 'sputter, fritter, charter',
      exceptions: [],
      power: 123,
      tense: 'infinitive'
    }, {
      reg: /([bd])le$/i,
      repl: {
        present: "$1es",
        gerund: "$1ing",
        past: "$1ed"
      },
      examples: 'shamble, warble, grabble',
      exceptions: [],
      power: 69,
      tense: 'infinitive'
    }, {
      reg: /(ish|tch|ess)$/i,
      repl: {
        present: "$1es",
        gerund: "$1ing",
        past: "$1ed"
      },
      examples: 'relish, wish, brandish',
      exceptions: [],
      power: 62,
      tense: 'infinitive'
    }, {
      reg: /(ion|end|e[nc]t)$/i,
      repl: {
        present: "$1s",
        gerund: "$1ing",
        past: "$1ed"
      },
      examples: 'caution, aircondition, cushion',
      exceptions: ["sent", "bent", "overspent", "misspent", "went", "kent", "outwent", "forwent", "spent", "pent", "lent", "underwent", "rent", "unbent", "shent"],
      power: 55,
      tense: 'infinitive'
    }, {
      reg: /(om)e$/i,
      repl: {
        present: "$1es",
        gerund: "$1ing",
        past: "ame",
      },
      examples: 'become',
      exceptions: [],
      power: 1,
      tense: 'infinitive'
    }, {
      reg: /([aeiou])([ptn])$/i,
      repl: {
        present: "$1$2s",
        gerund: "$1$2$2ing",
        past: "$1$2",
      },
      examples: 'win',
      exceptions: [],
      power: 1,
      tense: 'infinitive'
    },

    {
      reg: /(er)$/i,
      repl: {
        present: "$1s",
        gerund: "$1ing",
        past: "$1ed",
      },
      examples: 'win',
      exceptions: [],
      power: 1,
      tense: 'infinitive'
    },

    //present
    {
      reg: /([tzlshicgrvdnkmu])es$/i,
      repl: {
        infinitive: "$1e",
        gerund: "$1ing",
        past: "$1ed"
      },
      examples: 'convolutes, angulates, stipulates',
      exceptions: [],
      power: 923,
      tense: 'present'
    }, {
      reg: /(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$/i,
      repl: {
        infinitive: "$1",
        gerund: "$1ing",
        past: "$1ed"
      },
      examples: 'wants, squints, garments',
      exceptions: [],
      power: 153,
      tense: 'present'
    }, {
      reg: /(ow)s$/i,
      repl: {
        infinitive: "$1",
        gerund: "$1ing",
        past: "ew"
      },
      examples: 'wants, squints, garments',
      exceptions: [],
      power: 153,
      tense: 'present'
    }, {
      reg: /(op)s$/i,
      repl: {
        infinitive: "$1",
        gerund: "$1ping",
        past: "$1ped"
      },
      examples: 'wants, squints, garments',
      exceptions: [],
      power: 153,
      tense: 'present'
    }, {
      reg: /([eirs])ts$/i,
      repl: {
        infinitive: "$1t",
        gerund: "$1tting",
        past: "$1tted"
      },
      examples: 'outwits, revisits, knits',
      exceptions: [],
      power: 105,
      tense: 'present'
    }, {
      reg: /(ll)s$/i,
      repl: {
        infinitive: "$1",
        gerund: "$1ing",
        past: "$1ed"
      },
      examples: 'culls, tolls, shalls',
      exceptions: [],
      power: 92,
      tense: 'present'
    }, {
      reg: /(el)s$/i,
      repl: {
        infinitive: "$1",
        gerund: "$1ling",
        past: "$1led"
      },
      examples: 'swivels, rebels, travels',
      exceptions: [],
      power: 88,
      tense: 'present'
    },




    //gerund
    {
      reg: /([aeiou][^aeiouwyrlm])ing$/i,
      repl: {
        infinitive: "$1e",
        present: "$1es",
        past: "$1ed"
      },
      examples: 'convoluting, compensating, fouling',
      exceptions: [],
      power: 8475,
      tense: 'gerund'
    }, {
      reg: /([aeiou][^aeiou]*)ing$/i,
      repl: {
        infinitive: "$1",
        present: "$1s",
        past: "$1ed"
      },
      examples: 'walking, fawning, farming, swing',
      exceptions: [],
      power: 8475,
      tense: 'gerund'
    },


    //past
    {
      reg: /(.[pigmcvwbyfkt])ed$/i,
      repl: {
        infinitive: "$1e",
        present: "$1es",
        gerund: "$1ing"
      },
      examples: 'convoluted, outwitted, angulated',
      exceptions: [],
      power: 1854,
      tense: 'past'
    }, {
      reg: /([rl])ew$/i,
      repl: {
        infinitive: "$1ow",
        present: "$1ows",
        gerund: "$1owing"
      },
      example: "overthrew",
      exceptions: ["brew", "crew", "screw", "unscrew"],
      tense: "past"
    }
  ];

  var verb_irregulars = [{
      "present": "arises",
      "gerund": "arising",
      "past": "arose",
      "infinitive": "arise",
      "participle": "arisen"
    }, {
      "infinitive": "babysit",
      "present": "babysits",
      "past": "babysat",
      "gerund": "babysitting",
      "participle": "babysat"
    }, {
      "infinitive": "be",
      "present": "is",
      "gerund": "being",
      "past": "were",
      "participle": "been"
    }, {
      "infinitive": "be",
      "present": "is",
      "gerund": "being",
      "past": "were",
      "participle": "been"
    }, {
      "infinitive": "beat",
      "present": "beats",
      "past": "beat",
      "gerund": "beating",
      "participle": "beaten"
    }, {
      "present": "becomes",
      "gerund": "becoming",
      "past": "became",
      "infinitive": "become",
      "participle": "become"
    }, {
      "present": "bends",
      "gerund": "bending",
      "past": "bent",
      "infinitive": "bend",
      "participle": "bent"
    }, {
      "infinitive": "begin",
      "present": "begins",
      "past": "began",
      "gerund": "begining",
      "participle": "begun"
    }, {
      "infinitive": "bet",
      "present": "bets",
      "past": "bet",
      "gerund": "betting",
      "participle": "bet"
    }, {
      "infinitive": "bind",
      "present": "binds",
      "past": "bound",
      "gerund": "binding",
      "participle": "bound"
    }, {
      "present": "bites",
      "gerund": "biting",
      "past": "bit",
      "infinitive": "bite",
      "participle": "bitten"
    }, {
      "infinitive": "bleed",
      "present": "bleeds",
      "past": "bled",
      "gerund": "bleeding",
      "participle": "bled"
    }, {
      "infinitive": "blow",
      "present": "blows",
      "past": "blew",
      "gerund": "blowing",
      "participle": "blown"
    }, {
      "infinitive": "break",
      "present": "breaks",
      "past": "broke",
      "gerund": "breaking",
      "participle": "broken"
    }, {
      "infinitive": "breed",
      "present": "breeds",
      "past": "bred",
      "gerund": "breeding",
      "participle": "bred"
    }, {
      "infinitive": "bring",
      "present": "brings",
      "past": "brought",
      "gerund": "bringing",
      "participle": "brought"
    }, {
      "infinitive": "broadcast",
      "present": "broadcasts",
      "past": "broadcast",
      "gerund": "broadcasting",
      "participle": "broadcast"
    }, {
      "infinitive": "build",
      "present": "builds",
      "past": "built",
      "gerund": "building",
      "participle": "built"
    }, {
      "infinitive": "buy",
      "present": "buys",
      "past": "bought",
      "gerund": "buying",
      "participle": "bought"
    }, {
      "present": "catches",
      "gerund": "catching",
      "past": "caught",
      "infinitive": "catch",
      "participle": "caught"
    }, {
      "infinitive": "choose",
      "present": "chooses",
      "past": "chose",
      "gerund": "choosing",
      "participle": "chosen"
    }, {
      "present": "comes",
      "gerund": "coming",
      "past": "came",
      "infinitive": "come",
      "participle": "come"
    }, {
      "infinitive": "cost",
      "present": "costs",
      "past": "cost",
      "gerund": "costing",
      "participle": "cost"
    }, {
      "infinitive": "cut",
      "present": "cuts",
      "past": "cut",
      "gerund": "cutting",
      "participle": "cut"
    }, {
      "infinitive": "deal",
      "present": "deals",
      "past": "dealt",
      "gerund": "dealing",
      "participle": "dealt"
    }, {
      "infinitive": "dig",
      "present": "digs",
      "past": "dug",
      "gerund": "digging",
      "participle": "dug"
    }, {
      "infinitive": "do",
      "present": "does",
      "past": "did",
      "gerund": "doing",
      "participle": "done"
    }, {
      "infinitive": "draw",
      "present": "draws",
      "past": "drew",
      "gerund": "drawing",
      "participle": "drawn"
    }, {
      "infinitive": "drink",
      "present": "drinks",
      "past": "drank",
      "gerund": "drinking",
      "participle": "drunk"
    }, {
      "infinitive": "drive",
      "present": "drives",
      "past": "drove",
      "gerund": "driving",
      "participle": "driven"
    }, {
      "infinitive": "eat",
      "present": "eats",
      "past": "ate",
      "gerund": "eating",
      "participle": "eaten"
    }, {
      "infinitive": "fall",
      "present": "falls",
      "past": "fell",
      "gerund": "falling",
      "participle": "fallen"
    }, {
      "infinitive": "feed",
      "present": "feeds",
      "past": "fed",
      "gerund": "feeding",
      "participle": "fed"
    }, {
      "infinitive": "feel",
      "present": "feels",
      "past": "felt",
      "gerund": "feeling",
      "participle": "felt"
    }, {
      "infinitive": "fight",
      "present": "fights",
      "past": "fought",
      "gerund": "fighting",
      "participle": "fought"
    }, {
      "infinitive": "find",
      "present": "finds",
      "past": "found",
      "gerund": "finding",
      "participle": "found"
    }, {
      "infinitive": "fly",
      "present": "flys",
      "past": "flew",
      "gerund": "flying",
      "participle": "flown"
    }, {
      "infinitive": "forbid",
      "present": "forbids",
      "past": "forbade",
      "gerund": "forbiding",
      "participle": "forbidden"
    }, {
      "infinitive": "forget",
      "present": "forgets",
      "past": "forgot",
      "gerund": "forgeting",
      "participle": "forgotten"
    }, {
      "infinitive": "forgive",
      "present": "forgives",
      "past": "forgave",
      "gerund": "forgiving",
      "participle": "forgiven"
    }, {
      "infinitive": "freeze",
      "present": "freezes",
      "past": "froze",
      "gerund": "freezing",
      "participle": "frozen"
    }, {
      "infinitive": "get",
      "present": "gets",
      "past": "got",
      "gerund": "getting",
      "participle": "gotten"
    }, {
      "infinitive": "give",
      "present": "gives",
      "past": "gave",
      "gerund": "giving",
      "participle": "given"
    }, {
      "infinitive": "go",
      "present": "goes",
      "gerund": "going",
      "past": "went",
      "participle": "gone"
    }, {
      "infinitive": "grow",
      "present": "grows",
      "past": "grew",
      "gerund": "growing",
      "participle": "grown"
    }, {
      "infinitive": "hang",
      "present": "hangs",
      "past": "hung",
      "gerund": "hanging",
      "participle": "hung"
    }, {
      "infinitive": "have",
      "present": "haves",
      "past": "had",
      "gerund": "having",
      "participle": "had"
    }, {
      "infinitive": "hear",
      "present": "hears",
      "past": "heard",
      "gerund": "hearing",
      "participle": "heard"
    }, {
      "infinitive": "hide",
      "present": "hides",
      "past": "hid",
      "gerund": "hiding",
      "participle": "hidden"
    }, {
      "infinitive": "hit",
      "present": "hits",
      "past": "hit",
      "gerund": "hitting",
      "participle": "hit"
    }, {
      "infinitive": "hold",
      "present": "holds",
      "past": "held",
      "gerund": "holding",
      "participle": "held"
    }, {
      "infinitive": "hurt",
      "present": "hurts",
      "past": "hurt",
      "gerund": "hurting",
      "participle": "hurt"
    }, {
      "present": "keeps",
      "gerund": "keeping",
      "past": "kept",
      "infinitive": "keep",
      "participle": "kept"
    }, {
      "infinitive": "know",
      "present": "knows",
      "past": "knew",
      "gerund": "knowing",
      "participle": "known"
    }, {
      "infinitive": "lay",
      "present": "lays",
      "past": "laid",
      "gerund": "laying",
      "participle": "laid"
    }, {
      "infinitive": "lead",
      "present": "leads",
      "past": "led",
      "gerund": "leading",
      "participle": "led"
    }, {
      "infinitive": "leave",
      "present": "leaves",
      "past": "left",
      "gerund": "leaving",
      "participle": "left"
    }, {
      "present": "lends",
      "gerund": "lending",
      "past": "lent",
      "infinitive": "lend",
      "participle": "lent"
    }, {
      "infinitive": "let",
      "present": "lets",
      "past": "let",
      "gerund": "letting",
      "participle": "let"
    }, {
      "infinitive": "lie",
      "present": "lies",
      "past": "lay",
      "gerund": "lying",
      "participle": "lied"
    }, {
      "infinitive": "light",
      "present": "lights",
      "past": "lit",
      "gerund": "lighting",
      "participle": "lit"
    }, {
      "infinitive": "lose",
      "present": "loses",
      "past": "lost",
      "gerund": "losing",
      "participle": "lost"
    }, {
      "infinitive": "make",
      "present": "makes",
      "past": "made",
      "gerund": "making",
      "participle": "made"
    }, {
      "infinitive": "mean",
      "present": "means",
      "past": "meant",
      "gerund": "meaning",
      "participle": "meant"
    }, {
      "infinitive": "meet",
      "present": "meets",
      "past": "met",
      "gerund": "meeting",
      "participle": "met"
    }, {
      "infinitive": "pay",
      "present": "pays",
      "past": "paid",
      "gerund": "paying",
      "participle": "paid"
    }, {
      "infinitive": "put",
      "present": "puts",
      "past": "put",
      "gerund": "putting",
      "participle": "put"
    }, {
      "infinitive": "quit",
      "present": "quits",
      "past": "quit",
      "gerund": "quitting",
      "participle": "quit"
    }, {
      "infinitive": "read",
      "present": "reads",
      "past": "read",
      "gerund": "reading",
      "participle": "read"
    }, {
      "infinitive": "ride",
      "present": "rides",
      "past": "rode",
      "gerund": "riding",
      "participle": "ridden"
    }, {
      "infinitive": "ring",
      "present": "rings",
      "past": "rang",
      "gerund": "ringing",
      "participle": "rung"
    }, {
      "present": "rises",
      "gerund": "rising",
      "past": "rose",
      "infinitive": "rise",
      "participle": "risen"
    }, {
      "infinitive": "run",
      "present": "runs",
      "past": "ran",
      "gerund": "runing",
      "participle": "run"
    }, {
      "infinitive": "say",
      "present": "says",
      "past": "said",
      "gerund": "saying",
      "participle": "said"
    }, {
      "infinitive": "see",
      "present": "sees",
      "past": "saw",
      "gerund": "seing",
      "participle": "seen"
    }, {
      "infinitive": "sell",
      "present": "sells",
      "past": "sold",
      "gerund": "selling",
      "participle": "sold"
    }, {
      "present": "sends",
      "gerund": "sending",
      "past": "sent",
      "infinitive": "send",
      "participle": "sent"
    }, {
      "infinitive": "set",
      "present": "sets",
      "past": "set",
      "gerund": "setting",
      "participle": "set"
    }, {
      "infinitive": "shake",
      "present": "shakes",
      "past": "shook",
      "gerund": "shaking",
      "participle": "shaken"
    }, {
      "infinitive": "shine",
      "present": "shines",
      "past": "shone",
      "gerund": "shining",
      "participle": "shone"
    }, {
      "infinitive": "shoot",
      "present": "shoots",
      "past": "shot",
      "gerund": "shooting",
      "participle": "shot"
    }, {
      "infinitive": "show",
      "present": "shows",
      "past": "showed",
      "gerund": "showing",
      "participle": "shown"
    }, {
      "infinitive": "shut",
      "present": "shuts",
      "past": "shut",
      "gerund": "shutting",
      "participle": "shut"
    }, {
      "infinitive": "sing",
      "present": "sings",
      "past": "sang",
      "gerund": "singing",
      "participle": "sung"
    }, {
      "infinitive": "sink",
      "present": "sinks",
      "past": "sank",
      "gerund": "sinking",
      "participle": "sunk"
    }, {
      "infinitive": "sit",
      "present": "sits",
      "past": "sat",
      "gerund": "sitting",
      "participle": "sat"
    }, {
      "present": "sleeps",
      "gerund": "sleepping",
      "past": "slept",
      "infinitive": "sleep",
      "participle": "slept"
    }, {
      "infinitive": "slide",
      "present": "slides",
      "past": "slid",
      "gerund": "sliding",
      "participle": "slid"
    }, {
      "infinitive": "speak",
      "present": "speaks",
      "past": "spoke",
      "gerund": "speaking",
      "participle": "spoken"
    }, {
      "present": "spends",
      "gerund": "spending",
      "past": "spent",
      "infinitive": "spend",
      "participle": "spent"
    }, {
      "infinitive": "spin",
      "present": "spins",
      "past": "spun",
      "gerund": "spinning",
      "participle": "spun"
    }, {
      "infinitive": "spread",
      "present": "spreads",
      "past": "spread",
      "gerund": "spreading",
      "participle": "spread"
    }, {
      "infinitive": "stand",
      "present": "stands",
      "past": "stood",
      "gerund": "standing",
      "participle": "stood"
    }, {
      "infinitive": "steal",
      "present": "steals",
      "past": "stole",
      "gerund": "stealing",
      "participle": "stolen"
    }, {
      "infinitive": "stick",
      "present": "sticks",
      "past": "stuck",
      "gerund": "sticking",
      "participle": "stuck"
    }, {
      "infinitive": "sting",
      "present": "stings",
      "past": "stung",
      "gerund": "stinging",
      "participle": "stung"
    }, {
      "infinitive": "strike",
      "present": "strikes",
      "past": "struck",
      "gerund": "striking",
      "participle": "struck"
    }, {
      "infinitive": "swear",
      "present": "swears",
      "past": "swore",
      "gerund": "swearing",
      "participle": "sworn"
    }, {
      "present": "sweeps",
      "gerund": "sweeping",
      "past": "swept",
      "infinitive": "sweep",
      "participle": "swept"
    }, {
      "infinitive": "swim",
      "present": "swims",
      "past": "swam",
      "gerund": "swiming",
      "participle": "swum"
    }, {
      "infinitive": "swing",
      "present": "swings",
      "past": "swung",
      "gerund": "swinging",
      "participle": "swung"
    }, {
      "infinitive": "take",
      "present": "takes",
      "past": "took",
      "gerund": "taking",
      "participle": "taken"
    }, {
      "infinitive": "teach",
      "present": "teachs",
      "past": "taught",
      "gerund": "teaching",
      "participle": "taught"
    }, {
      "infinitive": "tear",
      "present": "tears",
      "past": "tore",
      "gerund": "tearing",
      "participle": "torn"
    }, {
      "infinitive": "tell",
      "present": "tells",
      "past": "told",
      "gerund": "telling",
      "participle": "told"
    }, {
      "infinitive": "think",
      "present": "thinks",
      "past": "thought",
      "gerund": "thinking",
      "participle": "thought"
    }, {
      "infinitive": "throw",
      "present": "throws",
      "past": "threw",
      "gerund": "throwing",
      "participle": "thrown"
    }, {
      "infinitive": "understand",
      "present": "understands",
      "past": "understood",
      "gerund": "understanding",
      "participle": "understood"
    }, {
      "infinitive": "wake",
      "present": "wakes",
      "past": "woke",
      "gerund": "waking",
      "participle": "woken"
    }, {
      "infinitive": "wear",
      "present": "wears",
      "past": "wore",
      "gerund": "wearing",
      "participle": "worn"
    }, {
      "present": "wins",
      "gerund": "winning",
      "past": "won",
      "infinitive": "win",
      "participle": "won"
    }, {
      "infinitive": "withdraw",
      "present": "withdraws",
      "past": "withdrew",
      "gerund": "withdrawing",
      "participle": "withdrawn"
    }, {
      "present": "writes",
      "gerund": "writing",
      "past": "wrote",
      "infinitive": "write",
      "participle": "written"
    }, {
      "infinitive": 'tie',
      "present": 'ties',
      "past": 'tied',
      "gerund": 'tying'
    }

  ]



  // console.log(verb_irregulars)
  // console.log(verb_rules)
  //fallback to this transformation if it has an unknown prefix
  var fallback = function(w) {
    // console.log('fallback')
    var infinitive = w;
    var present, past, gerund;
    if (w.match(/[^aeiou]$/)) {
      gerund = w + "ing"
      past = w + "ed"
      present = w + "s"
    } else {
      gerund = w.replace(/[aeiou]$/, 'ing')
      past = w.replace(/[aeiou]$/, 'ed')
      present = w.replace(/[aeiou]$/, 'es')
    }
    return {
      infinitive: infinitive,
      present: present,
      past: past,
      gerund: gerund
    }
  }



  var main = function(w) {
    if (!w) {
      return {}
    }

    //check irregulars
    for (var i = 0; i < verb_irregulars.length; i++) {
      var x = verb_irregulars[i];
      if (w == x.present || w == x.gerund || w == x.past || w == x.infinitive) {
        return verb_irregulars[i]
      }
    }

    //check against suffix rules
    var obj, r, _i, _len;
    for (_i = 0, _len = verb_rules.length; _i < _len; _i++) {
      r = verb_rules[_i];
      if (w.match(r.reg)) {
        obj = Object.keys(r.repl).reduce(function(h, k) {
          h[k] = w.replace(r.reg, r.repl[k]);
          return h;
        }, {});
        obj[r.tense] = w;
        return obj;
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
// console.log(verb_conjugate("win"))
// console.log(verb_conjugate("write"))
// console.log(verb_conjugate("stop"))
// console.log(verb_conjugate("carry"))
var Verb = function(str) {
	var the = this
	the.word = str;

	if (typeof module !== "undefined" && module.exports) {
		verb_conjugate = require("./conjugate/conjugate")
	}

	// console.log(verb_conjugate)

	the.conjugate = (function() {
		return verb_conjugate(the.word)
	})(),

	the.tense = (function(str) {
		var forms = verb_conjugate(the.word)
		for (var i in forms) {
			if (forms[i] == the.word) {
				return i
			}
		}
	})()


	return the;
}

if (typeof module !== "undefined" && module.exports) {
	module.exports = Verb;
}

// s = new Verb("walk")
// console.log(s)
//convert cute to cuteness
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
        module.exports = main;
    }
    return main
})()

// console.log(exports.adj_to_noun('mysterious'));
//turn 'quick' into 'quickly'
var to_comparative = (function() {
	var main = function(str) {


		var irregulars = {
			"poor": "poorer",
			"pure": "purer",
			"brown": "browner",
			"orange": "oranger",
			"green": "greener",
			"yellow": "yellower",
			"red": "redder",
			"blue": "bluer",
			"black": "blacker",
			"white": "whiter",
			"wise": "wiser",
			"round": "rounder",
			"great": "greater",
			"quiet": "quieter",
			"quick": "quicker",
		}
		var dont = {
			"overweight": 1,
			"neat": 1
		}
		var transforms = [{
			reg: /y$/i,
			repl: 'ier',
		}, {
			reg: /([aeiou])t$/i,
			repl: '$1tter',
		}, {
			reg: /([aeou])de$/i,
			repl: '$1der',
		}, {
			reg: /nge$/i,
			repl: 'nger',
		}, ]
		var matches = [
			/ght$/,
			// /k$/,
			/nge$/,
			/ough$/,
			/ain$/,
			/uel$/,
			/[au]ll$/,
			/ow$/,
		]
		var not_matches = [
			/ary$/
		]

		if (dont[str]) {
			return null
		}
		if (irregulars[str]) {
			return irregulars[str]
		}

		for (var i = 0; i < not_matches.length; i++) {
			if (str.match(not_matches[i])) {
				return "more " + str
			}
		}

		for (var i = 0; i < transforms.length; i++) {
			if (str.match(transforms[i].reg)) {
				return str.replace(transforms[i].reg, transforms[i].repl)
			}
		}
		for (var i = 0; i < matches.length; i++) {
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
// console.log(to_comparative('hot'))
// console.log(to_comparative('wide'))
// console.log(to_comparative('strange'))
// console.log(to_comparative('narrow'))
// console.log(to_comparative('dull'))
//turn 'quick' into 'quickest'
var to_superlative = (function() {
	var main = function(str) {


		var irregulars = {
			"nice": "nicest",
			"late": "latest",
			"hard": "hardest",
			"inner": "innermost",
			"outer": "outermost",
			"poor": "poorest",
			"new": "newest",
			"wise": "wisest",
			"warm": "warmest",
			"tame": "tamest",
			"sad": "saddest",
			"safe": "safest",
			"rich": "richest",
			"gross": "grossest",
			"fair": "fairest",
			"cool": "coolest",
			"quiet": "quietest",
			"sweet": "sweetest",
			"great": "greatest",
			"neat": "neatest",
			"quick": "quickest",
		}
		var dont = {
			"overweight": 1,
			"ready": 1,
		}
		var transforms = [{
			reg: /y$/i,
			repl: 'iest',
		}, {
			reg: /([aeiou])t$/i,
			repl: '$1ttest',
		}, {
			reg: /([aeou])de$/i,
			repl: '$1dest',
		}, {
			reg: /nge$/i,
			repl: 'ngest',
		}, ]
		var matches = [
			/ght$/,
			/nge$/,
			/ough$/,
			/ain$/,
			/uel$/,
			/[au]ll$/,
			/ow$/,
			/oud$/,
			/...p$/,
		]
		var not_matches = [
			/ary$/
		]

		if (dont[str]) {
			return "most " + str
		}
		if (irregulars[str]) {
			return irregulars[str]
		}

		for (var i = 0; i < not_matches.length; i++) {
			if (str.match(not_matches[i])) {
				return "most " + str
			}
		}

		for (var i = 0; i < transforms.length; i++) {
			if (str.match(transforms[i].reg)) {
				return str.replace(transforms[i].reg, transforms[i].repl)
			}
		}
		for (var i = 0; i < matches.length; i++) {
			if (str.match(matches[i])) {
				return str + "est"
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
//turn 'quick' into 'quickly'
adj_to_adv = (function() {
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
			"fast": "fast",
			"straight": "straight",
			"wrong": "wrong",
			"fast": "fast",
			"hard": "hard",
			"late": "late",
			"early": "early",
			"well": "well",
			"best": "best",
			"latter": "latter",
		}
		var dont = {
			"foreign": 1,
			"black": 1,
			"modern": 1,
			"able": 1,
			"next": 1,
			"small": 1,
			"big": 1,
			"hot": 1,
			"difficult": 1,
			"degenerate": 1,
			"young": 1,
			"still": 1,
			"awake": 1,
			"back": 1,
			"blue": 1,
			"brown": 1,
			"red": 1,
			"orange": 1,
			"complex": 1,
			"cool": 1,
			"dull": 1,
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
			"ill": 1,
			"medium": 1,
			"parallel": 1,
			"outdoor": 1,
			"tall": 1,
			"unknown": 1,
			"undersized": 1,
			"used": 1,
			"well": 1,
			"welcome": 1,
			"yellow": 1,
			"wet": 1,
			"white": 1,
			"fixed": 1,
			"mixed": 1,
			"": 1,
		}
		var transforms = [{
			reg: /al$/i,
			repl: 'ally',
		}, {
			reg: /ly$/i,
			repl: 'ly',
		}, {
			reg: /(.{3})y$/i,
			repl: '$1ily',
		}, {
			reg: /que$/i,
			repl: 'quely',
		}, {
			reg: /ue$/i,
			repl: 'uly',
		}, {
			reg: /ic$/i,
			repl: 'ically',
		}, {
			reg: /ble$/i,
			repl: 'bly',
		}, {
			reg: /l$/i,
			repl: 'ly',
		}, ]

		if (dont[str]) {
			return null
		}
		if (irregulars[str]) {
			return irregulars[str]
		}
		for (var i = 0; i < transforms.length; i++) {
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



// data = require("./test").data
// data = data.filter(function(w) {
// 	return to_adverb(w[1]) != w[0]
// })
// arr = data.map(function(w) {
// 	console.log(w[1] + "  -  " + to_adverb(w[1]))
// })
// console.log(to_adverb('normal'))
var Adjective = function(str) {
	var the = this
	the.word = str;

	if (typeof module !== "undefined" && module.exports) {
		to_comparative = require("./conjugate/to_comparative")
		to_superlative = require("./conjugate/to_superlative")
		adj_to_adv = require("./conjugate/to_adverb")
		adj_to_noun = require("./conjugate/to_noun")
	}

	the.conjugate = (function() {
		return {
			comparative: to_comparative(the.word),
			superlative: to_superlative(the.word),
			adverb: adj_to_adv(the.word),
			noun: adj_to_noun(the.word),
		}
	})()

	return the;
};
if (typeof module !== "undefined" && module.exports) {
	module.exports = Adjective;
}

// s = new Adjective("crazy")
// console.log(s)
if (typeof module !== "undefined" && module.exports) {
	Adjective = require("./adjective/index");
	Noun = require("./noun/index");
	Adverb = require("./adverb/index");
	Verb = require("./verb/index");
	Value = require("./value/index");
}
parents = {
	adjective: Adjective,
	noun: Noun,
	adverb: Adverb,
	verb: Verb,
	value: Value,
	glue: function() {}
}
if (typeof module !== "undefined" && module.exports) {
	module.exports = parents;
}

// console.log(parents)
lexicon = (function() {
	if (typeof module !== "undefined" && module.exports) {
		verb_conjugate = require("../parents/verb/conjugate/conjugate")
		adj_to_adv = require("../parents/adjective/conjugate/to_adverb");
		// var superlative = require("../../adjectives/conjugate/to_superlative");
	}
	var main = {
		//conjunctions
		"yet": "CC",
		"therefore": "CC",
		"or": "CC",
		"while": "CC",
		"nor": "CC",
		"whether": "CC",
		"though": "CC",
		"because": "CC",
		"but": "CC",
		"for": "CC",
		"and": "CC",
		"if": "CC",
		"however": "CC",
		"before": "CC",
		"so": "CC",
		"although": "CC",

		//numbers
		"eighty": "CD",
		"seventeen": "CD",
		"two": "CD",
		"eighteen": "CD",
		"one": "CD",
		"nineteen": "CD",
		"four": "CD",
		"twenty": "CD",
		"six": "CD",
		"thirty": "CD",
		"eight": "CD",
		"fourty": "CD",
		"ten": "CD",
		"fifty": "CD",
		"twelve": "CD",
		"sixty": "CD",
		"fourteen": "CD",
		"seventy": "CD",
		"sixteen": "CD",
		"five": "CD",
		"nine": "CD",
		"ninety": "CD",
		"eleven": "CD",
		"seven": "CD",
		"three": "CD",
		"fifteen": "CD",
		"thirteen": "CD",

		//copula
		"is": "CP",
		"will be": "CP",
		"are": "CP",
		"was": "CP",
		"were": "CP",

		//determiners
		"this": "DT",
		"any": "DT",
		"enough": "DT",
		"each": "DT",
		"whatever": "DT",
		"every": "DT",
		"which": "DT",
		"all": "DT",
		"these": "DT",
		"another": "DT",
		"such": "DT",
		"little": "DT",
		"plenty": "DT",
		"whichever": "DT",
		"neither": "DT",
		"an": "DT",
		"more": "DT",
		"a": "DT",
		"least": "DT",
		"own": "DT",
		"few": "DT",
		"both": "DT",
		"those": "DT",
		"the": "DT",
		"that": "DT",
		"various": "DT",
		"many": "DT",
		"what": "DT",
		"either": "DT",
		"less": "DT",
		"last": "DT",
		"much": "DT",
		"some": "DT",
		"else": "DT",
		"several": "DT",

		//prepositions
		"until": "IN",
		"onto": "IN",
		"near": "IN",
		"of": "IN",
		"into": "IN",
		"except": "IN",
		"across": "IN",
		"by": "IN",
		"between": "IN",
		"at": "IN",
		"down": "IN",
		"as": "IN",
		"from": "IN",
		"around": "IN",
		"with": "IN",
		"among": "IN",
		"upon": "IN",
		"amid": "IN",
		"to": "IN",
		"along": "IN",
		"since": "IN",
		"about": "IN",
		"behind": "IN",
		"above": "IN",
		"on": "IN",
		"within": "IN",
		"in": "IN",
		"under": "IN",
		"during": "IN",
		"per": "IN",
		"without": "IN",
		"beyond": "IN",
		"throughout": "IN",
		"against": "IN",
		"through": "IN",
		"than": "IN",
		"via": "IN",
		"up": "IN",


		//modal verbs
		"can": "MD",
		"may": "MD",
		"could": "MD",
		"might": "MD",
		"will": "MD",
		"ought to": "MD",
		"would": "MD",
		"must": "MD",
		"shall": "MD",
		"should": "MD",


		//posessive pronouns
		"mine": "PP",
		"something": "PP",
		"none": "PP",
		"anything": "PP",
		"anyone": "PP",
		"lot": "PP",
		"theirs": "PP",
		"himself": "PP",
		"ours": "PP",
		"his": "PP",
		"their": "PP",
		"yours": "PP",
		"its": "PP",
		"nothing": "PP",
		"herself": "PP",
		"hers": "PP",
		"themselves": "PP",
		"everything": "PP",
		"myself": "PP",
		"itself": "PP",
		"who": "PP",

		//personal pronouns
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
		"thou": "PRP",

		//some manual adverbs (the rest are generated)
		"now": "RB",
		"again": "RB",
		"already": "RB",
		"soon": "RB",
		"directly": "RB",
		"suddenly": "RB",
		"instead": "RB",
		"yes": "RB",
		"alone": "RB",
		"ago": "RB",
		"indeed": "RB",
		"probably": "RB",
		"usually": "RB",
		"ever": "RB",
		"quite": "RB",
		"perhaps": "RB",
		"certain": "RB",
		"slowly": "RB",
		"apparently": "RB",
		"where": "RB",
		"then": "RB",
		"here": "RB",
		"thus": "RB",
		"immediately": "RB",
		"nearly": "RB",
		"very": "RB",
		"actually": "RB",
		"often": "RB",
		"not": "RB",
		"once": "RB",
		"never": "RB",
		"why": "RB",
		"merely": "RB",
		"when": "RB",
		"away": "RB",
		"always": "RB",
		"certainly": "RB",
		"sometimes": "RB",
		"also": "RB",
		"maybe": "RB",

		//interjections
		"uhh": "UH",
		"uh-oh": "UH",
		"ugh": "UH",
		"sheesh": "UH",
		"eww": "UH",
		"pff": "UH",
		"voila": "UH",
		"oy": "UH",
		"eep": "UH",
		"hurrah": "UH",
		"yuck": "UH",
		"ow": "UH",
		"duh": "UH",
		"oh": "UH",
		"hmm": "UH",
		"yeah": "UH",
		"whoa": "UH",
		"ooh": "UH",
		"whee": "UH",
		"ah": "UH",
		"bah": "UH",
		"gah": "UH",
		"yaa": "UH",
		"phew": "UH",
		"gee": "UH",
		"ahem": "UH",
		"eek": "UH",
		"meh": "UH",
		"yahoo": "UH",
		"oops": "UH",
		"d'oh": "UH",
		"psst": "UH",
		"argh": "UH",
		"grr": "UH",
		"nah": "UH",
		"shhh": "UH",
		"whew": "UH",
		"mmm": "UH",
		"yay": "UH",
		"uh-huh": "UH",
		"boo": "UH",
		"wow": "UH",


		//dates
		"july": "CD",
		"august": "CD",
		"september": "CD",
		"october": "CD",
		"november": "CD",
		"december": "CD",
		"january": "CD",
		"february": "CD",
		"march": "CD",
		"april": "CD",
		"may": "CD",
		"june": "CD",
		"monday": "CD",
		"tuesday": "CD",
		"wednesday": "CD",
		"thursday": "CD",
		"friday": "CD",
		"saturday": "CD",
		"sunday": "CD",


		//contractions that don't need splitting-open, grammatically
		"don't": "VB",
		"isn't": "CP",
		"ain't": "CP",
		"aren't": "CP",
		"won't": "VB",
		"shouldn't": "MD",
		"wouldn't": "MD",
		"couldn't": "MD",
		"mustn't": "MD",
		"shan't": "MD",
		"shant": "MD",
		"lets": "MD", //arguable
		"let's": "MD",
		"what's": "VB", //somewhat ambiguous (what does|what are)
		"where'd": "VBD",
		"when'd": "VBD",
		"how'd": "VBD",
		"what'd": "VBD",
		"who'd": "MD",
		"'o": "IN",
		"'em": "PRP",

		//comparative adverbs
		"fuller": "JJR",
		"easier": "JJR",
		"blacker": "JJR",
		"likelier": "JJR",
		"whiter": "JJR",
		"smaller": "JJR",
		"lower": "JJR",
		"hotter": "JJR",
		"greater": "JJR",
		"angrier": "JJR",
		"brighter": "JJR",
		"browner": "JJR",
		"busier": "JJR",
		"crueler": "JJR",
		"dirtier": "JJR",
		"drier": "JJR",
		"duller": "JJR",
		"earlier": "JJR",
		"emptier": "JJR",
		"fatter": "JJR",
		"flatter": "JJR",
		"funnier": "JJR",
		"greener": "JJR",
		"happier": "JJR",
		"healthier": "JJR",
		"hollower": "JJR",
		"heavier": "JJR",
		"lazier": "JJR",
		"narrower": "JJR",
		"nastier": "JJR",
		"poorer": "JJR",
		"plainer": "JJR",
		"purer": "JJR",
		"quieter": "JJR",
		"righter": "JJR",
		"rougher": "JJR",
		"rounder": "JJR",
		"ruder": "JJR",
		"stickier": "JJR",
		"straighter": "JJR",
		"sweetter": "JJR",
		"sorrier": "JJR",
		"steadier": "JJR",
		"taller": "JJR",
		"tighter": "JJR",
		"uglier": "JJR",
		"wetter": "JJR",
		"wiser": "JJR",
		"yellower": "JJR",

		//superlatives
		"nicest": "JJS",
		"latest": "JJS",
		"fullest": "JJS",
		"hardest": "JJS",
		"easiest": "JJS",
		"likeliest": "JJS",
		"smallest": "JJS",
		"lowest": "JJS",
		"hottest": "JJS",
		"greatest": "JJS",
		"angriest": "JJS",
		"brightest": "JJS",
		"busiest": "JJS",
		"cheapest": "JJS",
		"cruelest": "JJS",
		"coolest": "JJS",
		"deepest": "JJS",
		"dirtiest": "JJS",
		"driest": "JJS",
		"dullest": "JJS",
		"earliest": "JJS",
		"emptiest": "JJS",
		"fattest": "JJS",
		"flattest": "JJS",
		"fairest": "JJS",
		"funniest": "JJS",
		"graiest": "JJS",
		"greiest": "JJS",
		"grossest": "JJS",
		"happiest": "JJS",
		"healthiest": "JJS",
		"hollowest": "JJS",
		"heaviest": "JJS",
		"innermost": "JJS",
		"loudest": "JJS",
		"laziest": "JJS",
		"narrowest": "JJS",
		"nastiest": "JJS",
		"neatest": "JJS",
		"outermost": "JJS",
		"poorest": "JJS",
		"plainest": "JJS",
		"proudest": "JJS",
		"quietest": "JJS",
		"rightest": "JJS",
		"roughest": "JJS",
		"richest": "JJS",
		"rudest": "JJS",
		"saddest": "JJS",
		"safest": "JJS",
		"sharpest": "JJS",
		"stickiest": "JJS",
		"straightest": "JJS",
		"strangest": "JJS",
		"sweetest": "JJS",
		"sorriest": "JJS",
		"steadiest": "JJS",
		"tallest": "JJS",
		"tightest": "JJS",
		"tamest": "JJS",
		"ugliest": "JJS",
		"warmest": "JJS",
		"wettest": "JJS",
		"wisest": "JJS",
		"yellowest": "JJS",
		"newest": "JJS",


		//mine
		"said": "VBD",
		"says": "VBZ",
		"has": "VB",
		"million": "CD",
		"billion": "CD",
		"more": "RBR",
		"had": "VBD",
		"been": "VBD",
		"other": "JJ",
		"no": "DT",
		"there": "EX",
		"after": "IN",
		"many": "JJ",
		"most": "RBS",
		"last": "JJ",
		"little": "JJ",
		"expected": "JJ",
		"long": "JJ",
		"far": "JJ",
		"due": "JJ",
		"higher": "JJR",
		"larger": "JJR",
		"better": "JJR",
		"added": "VB",
		"several": "RB",
		"took": "VB",
		"being": "VBG",
		"began": "VBD",
		"came": "VBD",
		"did": "VBD",
		"go": "VBP",
		"too": "RB",

	}


	//verbs
	verbs = [
		"enter",
		"stop",
		"turn",
		"give",
		"win",
		"control",
		"relate",
		"remember",
		"join",
		"listen",
		"train",
		"break",
		"spring",
		"enjoy",
		"fail",
		"understand",
		"recognize",
		"draw",
		"obtain",
		"learn",
		"fill",
		"announce",
		"prevent",
		"fall",
		"achieve",
		"find",
		"realize",
		"involve",
		"remove",
		"lose",
		"lie",
		"build",
		"thought",
		"aid",
		"lay",
		"visit",
		"test",
		"strike",
		"prepare",
		"wait",
		"ask",
		"carry",
		"suppose",
		"determine",
		"raise",
		"send",
		"love",
		"use",
		"pull",
		"improve",
		"contain",
		"think",
		"offer",
		"speak",
		"rise",
		"talk",
		"pick",
		"care",
		"express",
		"remain",
		"operate",
		"deal",
		"close",
		"add",
		"mention",
		"read",
		"support",
		"grow",
		"decide",
		"walk",
		"vary",
		"demand",
		"describe",
		"sell",
		"agree",
		"happen",
		"allow",
		"suffer",
		"have",
		"study",
		"be",
		"press",
		"watch",
		"seem",
		"occur",
		"contribute",
		"claim",
		"become",
		"make",
		"compare",
		"bear",
		"develop",
		"apply",
		"direct",
		"discuss",
		"consider",
		"know",
		"sit",
		"see",
		"lead",
		"indicate",
		"require",
		"change",
		"fix",
		"come",
		"reach",
		"prove",
		"expect",
		"exist",
		"play",
		"permit",
		"meet",
		"kill",
		"pay",
		"charge",
		"increase",
		"fight",
		"tell",
		"catch",
		"believe",
		"create",
		"continue",
		"live",
		"help",
		"represent",
		"serve",
		"ride",
		"appear",
		"cover",
		"set",
		"maintain",
		"mean",
		"including",
		"start",
		"stay",
		"move",
		"extend",
		"leave",
		"wear",
		"run",
		"design",
		"supply",
		"suggest",
		"want",
		"say",
		"hear",
		"drive",
		"approach",
		"cut",
		"call",
		"include",
		"try",
		"receive",
		"save",
		"discover",
		"marry",
		"throw",
		"show",
		"choose",
		"need",
		"establish",
		"keep",
		"assume",
		"attend",
		"buy",
		"unite",
		"leach",
		"feel",
		"explain",
		"publish",
		"accept",
		"settle",
		"reduce",
		"bring",
		"do",
		"let",
		"shoot",
		"look",
		"take",
		"interact",
		"concern",
		"put",
		"labor",
		"hold",
		"return",
		"select",
		"die",
		"provide",
		"seek",
		"stand",
		"spend",
		"begin",
		"get",
		"march",
		"wish",
		"hang",
		"write",
		"finish",
		"follow",
		"forget",
		"feed",
		"eat",
		"disagree",
		"produce",
		"won",
		"went",
		"walked",
		"attack",
		"attempt",
		"bite",
		"blow",
		"brake",
		"brush",
		"burn",
		"bang",
		"bomb",
		"bet",
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
		"crop",
		"damage",
		"desire",
		"doubt",
		"drain",
		"drink",
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
		"engineer",
		"envy",
		"exercise",
		"export",
		"fold",
		"fork",
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
		"rain",
		"regret",
		"request",
		"reward",
		"roll",
		"rub",
		"remark",
		"remedy",
		"rent",
		"repair",
		"sail",
		"saw",
		"scale",
		"screw",
		"shake",
		"shock",
		"sleep",
		"slip",
		"smash",
		"smell",
		"smoke",
		"sneeze",
		"snow",
		"stick",
		"store",
		"surprise",
		"swim",
		"scratch",
		"search",
		"share",
		"shave",
		"slide",
		"soil",
		"spit",
		"splash",
		"spot",
		"stain",
		"stress",
		"swing",
		"switch",
		"taste",
		"touch",
		"trade",
		"trick",
		"twist",
		"tap",
		"tie",
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
		"wind",
		"wreck",
		"yawn",
	]
	//conjugate all of these verbs. takes ~8ms. triples the lexicon size.
	verbs.forEach(function(v) {
		var c = verb_conjugate(v)
		main[c.infinitive] = "VBP"
		main[c.past] = "VBD"
		main[c.gerund] = "VBG"
		main[c.present] = "VBZ"
		// main[c.participle] = "VBN"
	})



	//adjectives
	adjectives = ["nice",
		"different",
		"similar",
		"final",
		"late",
		"full",
		"normal",
		"economic",
		"hard",
		"federal",
		"western",
		"special",
		"natural",
		"available",
		"foreign",
		"religious",
		"simple",
		"effective",
		"medical",
		"even",
		"dark",
		"second",
		"complete",
		"whole",
		"military",
		"easy",
		"private",
		"particular",
		"basic",
		"local",
		"sure",
		"black",
		"high",
		"third",
		"just",
		"ready",
		"bad",
		"clear",
		"modern",
		"able",
		"short",
		"best",
		"strong",
		"next",
		"good",
		"likely",
		"free",
		"national",
		"common",
		"white",
		"small",
		"beautiful",
		"technical",
		"patient",
		"firm",
		"low",
		"big",
		"single",
		"kind",
		"hot",
		"serious",
		"political",
		"important",
		"difficult",
		"possible",
		"former",
		"latter",
		"moral",
		"according",
		"real",
		"young",
		"cold",
		"wide",
		"southern",
		"toward",
		"international",
		"specific",
		"dead",
		"great",
		"physical",
		"old",
		"true",
		"still",
		"industrial",
		"recent",
		"democratic",
		"large",
		"social",
		"personal",
		"central",
		"necessary",

		//ogden list
		"angry",
		"automatic",
		"awake",
		"active",
		"adjacent",
		"alternative",
		"arbitrary",
		"average",
		"awkward",
		"back",
		"bitter",
		"blue",
		"bright",
		"broken",
		"brown",
		"bankrupt",
		"brave",
		"busy",
		"cheap",
		"clean",
		"complex",
		"conscious",
		"cruel",
		"current",
		"clever",
		"compound",
		"concrete",
		"congruent",
		"constant",
		"continuous",
		"convenient",
		"cool",
		"deep",
		"delicate",
		"dependent",
		"dirty",
		"done",
		"dry",
		"degenerate",
		"dreadful",
		"dull",
		"early",
		"east",
		"equal",
		"expert",
		"empty",
		"exact",
		"false",
		"fat",
		"feeble",
		"female",
		"fertile",
		"first",
		"fixed",
		"flat",
		"foolish",
		"frequent",
		"fifth",
		"fourth",
		"fair",
		"famous",
		"fresh",
		"frozen",
		"funny",
		"general",
		"gold",
		"gone",
		"gray",
		"green",
		"grey",
		"grand",
		"grateful",
		"grating",
		"gross",
		"happy",
		"healthy",
		"hollow",
		"heavy",
		"honest",
		"ill",
		"imperial",
		"innocent",
		"intelligent",
		"inside",
		"inner",
		"jealous",
		"loose",
		"loud",
		"lame",
		"lazy",
		"legal",
		"male",
		"mixed",
		"magnetic",
		"magic",
		"mature",
		"medium",
		"modest",
		"narrow",
		"north",
		"nasty",
		"neat",
		"open",
		"opposite",
		"over",
		"obedient",
		"outdoor",
		"outgoing",
		"overbearing",
		"overweight",
		"outer",
		"parallel",
		"past",
		"poor",
		"present",
		"public",
		"perfect",
		"plain",
		"proud",
		"pure",
		"quick",
		"quiet",
		"regular",
		"responsible",
		"right",
		"rough",
		"round",
		"reversible",
		"rich",
		"rude",
		"reasonable",
		"sad",
		"safe",
		"separate",
		"sharp",
		"smooth",
		"soft",
		"solid",
		"standard",
		"sticky",
		"stiff",
		"straight",
		"strange",
		"sudden",
		"sweet",
		"selfish",
		"sorry",
		"stable",
		"steady",
		"suspicious",
		"sympathetic",
		"shocking",
		"tall",
		"thick",
		"thin",
		"tight",
		"tired",
		"tame",
		"transparent",
		"troubling",
		"ugly",
		"unknown",
		"undersized",
		"used",
		"violent",
		"vanilla",
		"warm",
		"well",
		"wet",
		"wise",
		"wound",
		"wrong",
		"weak",
		"welcome",
		"wild",
		"yellow",
		"major",
		"minor",
		"new",
	]
	//conjugate all of these adjectives to their adverbs.
	adjectives.forEach(function(j) {
		main[j] = "JJ"
		var adv = adj_to_adv(j)
		if (adv && adv != j && !main[adv]) {
			main[adv] = "RB"
		}
	})


	if (typeof module !== "undefined" && module.exports) {
		module.exports = main;
	}

	return main
})()
// console.log(Object.keys(lexicon).length)
var pos = (function() {


	if (typeof module !== "undefined" && module.exports) {
		tokenize = require("./methods/tokenization/tokenize").tokenize;
		parts_of_speech = require("./data/parts_of_speech")
		word_rules = require("./data/word_rules")
		lexicon = require("./data/lexicon")
		wordnet_suffixes = require("./data/unambiguous_suffixes")

		parents = require("./parents/parents")
	}

	var merge_tokens = function(a, b) {
		a.text += " " + b.text
		a.normalised += " " + b.normalised
		a.pos_reason += "|" + b.pos_reason
		a.start = a.start || b.start
		a.capitalised = a.capitalised || b.capitalised
		a.end = a.end || b.end
		return a
	}

	//combine adjacent neighbours
	var combine_tags = function(sentence) {
		var arr = sentence.tokens
		var better = []
		for (var i = 0; i <= arr.length; i++) {
			var next = arr[i + 1]
			if (arr[i] && next && arr[i].pos.tag == next.pos.tag && arr[i].punctuated != true) {
				arr[i] = merge_tokens(arr[i], arr[i + 1])
				arr[i + 1] = null
			}
			better.push(arr[i])
		}
		sentence.tokens = better.filter(function(r) {
			return r
		})
		return sentence
	}


	var lexicon_pass = function(w) {
		if (lexicon[w]) {
			return parts_of_speech[lexicon[w]]
		}
	}
	var rules_pass = function(w) {
		for (var i = 0; i < word_rules.length; i++) {
			if (w.match(word_rules[i].reg)) {
				return parts_of_speech[word_rules[i].pos]
			}
		}
	}


	var fourth_pass = function(token, i, sentence) {
		var last = sentence.tokens[i - 1]
		var next = sentence.tokens[i + 1]
		//if it's before a modal verb, it's a noun -> lkjsdf would
		if (next && token.pos.parent != "noun" && next.pos.tag == "MD") {
			token.pos = parts_of_speech['NN']
			token.pos_reason = "before a modal"
		}
		//if it's after an adverb, it's not a noun -> quickly acked
		//support form 'atleast he is..'
		if (last && token.pos.parent == "noun" && last.pos.tag == "RB" && !last.start) {
			token.pos = parts_of_speech['VB']
			token.pos_reason = "after an adverb"
		}
		//no consecutive, unpunctuated adjectives -> real good
		if (next && token.pos.parent == "adjective" && next.pos.parent == "adjective" && !token.punctuated) {
			token.pos = parts_of_speech['RB']
			token.pos_reason = "consecutive_adjectives"
		}
		//if it's after a determiner, it's not a verb -> the walk
		if (last && token.pos.parent == "verb" && last.pos.tag == "DT") {
			token.pos = parts_of_speech['NN']
			token.pos_reason = "determiner-verb"
		}
		//copulas are followed by a determiner ("are a .."), or an adjective ("are good")
		//(we would have gotten the adverb already)
		if (last && last.pos.tag == "CP" && token.pos.tag != "DT" && token.pos.tag != "RB" && token.pos.parent != "adjective" && token.pos.parent != "value") {
			token.pos = parts_of_speech['JJ']
			token.pos_reason = "copula-adjective"
		}
		//copula, adverb, verb -> copula adverb adjective -> is very lkjsdf
		if (last && next && last.pos.tag == "CP" && token.pos.tag == "RB" && next.pos.parent == "verb") {
			sentence.tokens[i + 1].pos = parts_of_speech['JJ']
			sentence.tokens[i + 1].pos_reason = "copula-adverb-adjective"
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
		}
		for (var i = 0; i < arr.length; i++) {
			if (contractions[arr[i].normalised || null]) {
				var before = arr.slice(0, i)
				var after = arr.slice(i + 1, arr.length)
				var fix = [{
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


	////////////
	//////////
	var main = function(text, options) {
		options = options || {}

		var sentences = tokenize(text);
		sentences.forEach(function(sentence) {

			//smart handling of contractions
			sentence.tokens = handle_contractions(sentence.tokens)

			//first pass, word-level clues
			sentence.tokens = sentence.tokens.map(function(token) {
				//known words list
				var lex = lexicon_pass(token.normalised)
				if (lex) {
					token.pos = lex;
					token.pos_reason = "lexicon"
					return token
				}
				// suffix pos signals from wordnet
				var len = token.normalised.length
				if (len > 4) {
					var suffix = token.normalised.substr(len - 4, len - 1)
					if (wordnet_suffixes[suffix]) {
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

				//it has a capital and isn't first word
				if (!token.start && token.capitalised) {
					token.pos = parts_of_speech['NN']
					token.pos_reason = "capitalised"
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

			//second pass, set verb or noun phrases after their signals
			var need = null
			var reason = ''
			sentence.tokens = sentence.tokens.map(function(token, i) {
				var next = sentence.tokens[i + 1]
				var prev = sentence.tokens[i - 1]
				if (token.pos) {
					//suggest verb after personal pronouns (he|she|they), modal verbs (would|could|should)
					if (token.pos.tag == "PRP" || token.pos.tag == "MD") {
						need = 'VB'
						reason = token.pos.name
					}
					//suggest noun after determiners (a|the), posessive pronouns (her|my|its)
					if (token.pos.tag == "DT" || token.pos.tag == "PP") {
						need = 'NN'
						reason = token.pos.name
					}

				}
				if (need && !token.pos) {
					token.pos = parts_of_speech[need]
					token.pos_reason = "signal from " + reason
				}
				if (need == 'VB' && token.pos.parent == 'verb') {
					need = null
				}
				if (need == 'NN' && token.pos.parent == 'noun') {
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
					//if there no verb in the sentence, there needs to be.
					if (!has['verb']) {
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
			s.tokens = s.tokens.map(function(token) {
				token.analysis = new parents[token.pos.parent](token.normalised)
				return token
			})
			return s
		})



		return sentences
	}


	if (typeof module !== "undefined" && module.exports) {
		exports.pos = main;
		exports.parts_of_speech = parts_of_speech
	}
	return main
})()





	function render(arr) {
		arr.forEach(function(sentence) {
			sentence.tokens.forEach(function(token) {
				console.log(token.normalised + "   " + (token.pos || {}).tag + '   (' + token.pos_reason + ')')
			})
		})
	}

	function analysis(arr) {
		arr.forEach(function(sentence) {
			sentence.tokens.forEach(function(token) {
				console.log(token.normalised + "   " + token.pos.tag + "  " + JSON.stringify(token.analysis))
			})
		})
	}

	// fun = pos("Geroge Clooney walked, quietly into a bank. It was cold.")
	// fun = pos("Geroge Clooney is cool.")
	// fun = pos("i paid five fifty") //combine numbers
	// fun = pos("he was a gorky asdf") //second pass signal
	// fun = pos("Joe quiitly alks the asdf") //"need one verb"
	// fun = pos("Joe would alks the asdf") //"second pass modal"
	// fun = pos("he blalks the asdf") //"second_pass signal from PRP"
	// fun = pos("joe is fun and quickly blalks") //after adverb
	// fun = pos("he went on the walk") //determiner-verb
	// fun = pos("he is very walk") //copula-adverb-adjective
	// fun = pos("he is very lkajsdf") //two error-corrections (copula-adverb-adjective)
	// fun = pos("joe is 9") //number
	// fun = pos("joe is real pretty") //consecutive adjectives to adverb
	// fun = pos("joe is real, pretty") //don't combine over a comma
	// fun = pos("walk should walk") //before a modal

	//contractions
	// fun = pos("atleast i'm better than geroge clooney")//i'm
	// fun = pos("i bet they'd blalk") //contraction
	// fun = pos("i'm the best") //contraction
	// fun = pos("i'd have said he'd go") //double contractions
	// fun = pos("also is trying to combine their latest") //
	// fun = pos("i agree with tom hanks and nancy kerrigan") //
	// fun = pos("joe walks quickly to the park") //

	// render(fun)
	// analysis(fun)
	// console.log(fun[0].tokens)
	// console.log(JSON.stringify(fun[0].tokens.map(function(s) {
	// 	return s
	// }), null, 2));
var spot = (function() {

	if (typeof module !== "undefined" && module.exports) {
		pos = require("./pos").pos;
	}
	var blacklist = {
		"i": 1,
		"me": 1,
	}

	var main = function(text, options) {
		options = options || {}
		var sentences = pos(text, options)
		var spots = []
		sentences.forEach(function(sentence) {
			sentence.tokens.forEach(function(token) {
				if (token.pos.parent == "noun" && !blacklist[token.normalised]) {
					spots.push(token)
				}
			})
		})

		if (options.ignore_gerund) {
			spots = spots.filter(function(t) {
				return t.pos.tag != "VBG"
			})
		}
		return spots
	}

	if (typeof module !== "undefined" && module.exports) {
		module.exports = main;
	}
	return main
})()

// var spots = spot("tony hawk walked to toronto")
// var spots = spot("mike myers and nancy kerrigan")
// console.log(spots[1].analysis)
///
//footer
//
var main = {

	noun: Noun,
	adjective: Adjective,
	verb: Verb,
	adverb: Adverb,
	value: Value,

	sentences: sentence_parser,
	ngram: ngram,
	tokenize: tokenize,
	americanize: americanize,
	britishize: britishize,
	syllables: syllables,
	normalize: normalize.normalize,
	denormalize: normalize.denormalize,
	pos: pos,
	spot: spot,
	// tests: tests,
}

if (typeof module !== "undefined" && module.exports) {
	exports.npm = main;
}
return main
})()