/*! nlp_comprimise
 by @spencermountain
 2014-03-20 */
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
  ///
  //footer
  //
  var main = {
    sentences: sentences,
    ngram: ngram,
    // americanize: americanize,
    // britishize: britishize,
    // singularize: singularize,
    // pluralize: pluralize,
    // syllables: syllables,
    // adj_to_noun: adj_to_noun,
    // dates: dates,
    // tag: tag,
    // spot: spot,
    // tests: tests,
  }

  if (typeof module !== "undefined" && module.exports) {
    exports.npm = main;
  }
  return main
})()