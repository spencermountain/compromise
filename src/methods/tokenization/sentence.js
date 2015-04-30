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
