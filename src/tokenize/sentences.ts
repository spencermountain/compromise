//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2015 MIT

import abbr = require("./abbreviations")

let Sentences = function(text: string) {

  let sentences = [];
  //first do a greedy-split..
  let chunks = text.split(/(\S.+?[.\?!])(?=\s+|$|")/g);

  //date abbrevs.
  //these are added seperately because they are not nouns

  //misc non-noun abbreviations
  let abbr2 = abbr.concat(["jan", "feb", "mar", "apr", "jun", "jul", "aug", "sep", "oct", "nov", "dec", "sept"]);
  let abbr3 = abbr2.concat(["ex", "eg", "ie", "circa", "ca", "cca", "vs", "etc", "esp", "ft", "bc", "ad"]);
  //detection of non-sentence chunks
  let abbrev_reg = new RegExp("\\b(" + abbr3.join("|") + ")[.!?] ?$", "i");
  let acronym_reg = new RegExp("[ |\.][A-Z]\.?$", "i")
  let elipses_reg = new RegExp("\\.\\.\\.*$")

  //loop through these chunks, and join the non-sentence chunks back together..
  let chunks_length = chunks.length;
  for (let i = 0; i < chunks_length; i++) {
    if (chunks[i]) {
      //trim whitespace
      chunks[i] = chunks[i].replace(/^\s+|\s+$/g, "");
      //should this chunk be combined with the next one?
      if (chunks[i + 1] && chunks[i].match(abbrev_reg) || chunks[i].match(acronym_reg) || chunks[i].match(elipses_reg)) {
        chunks[i + 1] = ((chunks[i] || '') + " " + (chunks[i + 1] || '')).replace(/ +/g, " ");
      } else if (chunks[i] && chunks[i].length > 0) { //this chunk is a proper sentence..
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

export = Sentences
