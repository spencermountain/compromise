//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2017 MIT
'use strict';
<<<<<<< HEAD
const abbreviations = Object.keys(require('../world/more-data/abbreviations'));
// \u203D - Interrobang
// \u2E18 - Inverted Interrobang
// \u203C - Double Exclamation Mark
// \u2047 - Double Question Mark
// \u2048 - Question Exclamation Mark
// \u2049 - Exclamation Question Mark
// \u2026 - Ellipses Character

//regs-
const abbrev_reg = new RegExp('\\b(' + abbreviations.join('|') + ')[.!?\u203D\u2E18\u203C\u2047-\u2049] *$', 'i');
const acronym_reg = /[ .][A-Z]\.? *$/i;
const ellipses_reg = /(?:\u2026|\.{2,}) *$/;

// Match different formats of new lines. (Mac: \r, Linux: \n, Windows: \r\n)
const new_line = /((?:\r?\n|\r)+)/;
const naiive_sentence_split = /(\S.+?[.!?\u203D\u2E18\u203C\u2047-\u2049])(?=\s+|$)/g;

const letter_regex = /[a-z]/i;
const not_ws_regex = /\S/;
=======
const abbreviations = Object.keys(require('./abbreviations'));
// \u203D - INTERROBANG
// \u2E18 - INVERTED INTERROBANG
// \u203C - DOUBLE EXCLAMATION MARK
// \u2047 - DOUBLE QUESTION MARK
// \u2048 - QUESTION EXCLAMATION MARK
// \u2049 - EXCLAMATION QUESTION MARK

//regs-
const abbrev_reg = new RegExp('(?:' + abbreviations.join('|') + ')[.!?]$', 'i');
const acronym_reg = /[a-z](?:\.[a-z])*\.?$/i;
const elipses_reg = /(?:\u2026|\.{2,})$/;

const line_reg = /(?:\r?\n|\r)+/;
const naiive_sentence_reg = /[^.!?\u203D\u2E18\u203C\u2047-\u2049]+(?:[.!?\u203D\u2E18\u203C\u2047-\u2049]+|$)/g;
>>>>>>> 0f4031c52f3a908bb97ac125266040c261aa0178

// Start with a regex:
const naiive_split = function(text) {
  let all = [];
<<<<<<< HEAD
  //first, split by newline
  let lines = text.split(new_line);
  for (let i = 0; i < lines.length; i++) {
    //split by period, question-mark, and exclamation-mark
    let arr = lines[i].split(naiive_sentence_split);
=======
  // Split by the majority of new line variations.
  let lines = text.split(line_reg);
  for (let i = 0; i < lines.length; i++) {
    // Split by period, question-mark, and exclamation-mark
    let arr = lines[i].match(naiive_sentence_reg);
>>>>>>> 0f4031c52f3a908bb97ac125266040c261aa0178
    for (let o = 0; o < arr.length; o++) {
      all.push(arr[o]);
    }
  }
  return all;
};

const sentence_parser = function(text) {
  text = text || '';
  text = String(text);
  let sentences = [];
  // First do a greedy-split..
  let chunks = [];
  // Ensure it 'smells like' a sentence
  if (!text || typeof text !== 'string' || not_ws_regex.test(text) === false) {
    return sentences;
  }
  // Start somewhere:
  let splits = naiive_split(text);
  // Filter-out the grap ones
  for (let i = 0; i < splits.length; i++) {
    let s = splits[i];
    if (s === undefined || s === '') {
      continue;
    }
    //this is meaningful whitespace
    if (not_ws_regex.test(s) === false) {
      //add it to the last one
      if (chunks[chunks.length - 1]) {
        chunks[chunks.length - 1] += s;
        continue;
      } else if (splits[i + 1]) {
        //add it to the next one
        splits[i + 1] = s + splits[i + 1];
        continue;
      }
    }
    //else, only whitespace, no terms, no sentence
    chunks.push(s);
  }

  //detection of non-sentence chunks:
  //loop through these chunks, and join the non-sentence chunks back together..
  for (let i = 0; i < chunks.length; i++) {
    let c = chunks[i];
    //should this chunk be combined with the next one?
    if (
      chunks[i + 1] &&
<<<<<<< HEAD
      letter_regex.test(c) &&
      (
        abbrev_reg.test(c) ||
        acronym_reg.test(c) ||
        ellipses_reg.test(c)
      )
    ) {
      chunks[i + 1] = c + (chunks[i + 1] || '');
    } else if (c && c.length > 0 && letter_regex.test(c)) {
=======
      /[a-z]/i.test(c) &&
      (
        abbrev_reg.test(c) ||
        acronym_reg.test(c) ||
        elipses_reg.test(c)
      )
    ) {
      chunks[i + 1] = c + (chunks[i + 1] || '');
    } else if (c && c.length > 0 && /[a-z]/i.test(c)) {
>>>>>>> 0f4031c52f3a908bb97ac125266040c261aa0178
      //this chunk is a proper sentence..
      sentences.push(c);
      chunks[i] = '';
    }
  }
  //if we never got a sentence, return the given text
  if (sentences.length === 0) {
    return [text];
  }
  return sentences;
};

module.exports = sentence_parser;
// console.log(sentence_parser('john f. kennedy'));
