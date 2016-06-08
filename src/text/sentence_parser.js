//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2015 MIT
'use strict';
let abbreviations = require('../data/abbreviations').abbreviations;
let fns = require('../fns');

const naiive_split = function(text) {
  //first, split by newline
  let splits = text.split(/(\n+)/);
  //split by period, question-mark, and exclamation-mark
  splits = splits.map(function(str) {
    return str.split(/(\S.+?[.!?])(?=\s+|$)/g);
  });
  return fns.flatten(splits);
};

const sentence_parser = function(text) {
  const sentences = [];
  //first do a greedy-split..
  let chunks = [];
  //ensure it 'smells like' a sentence
  if (!text || typeof text !== 'string' || !text.match(/\w/)) {
    return sentences;
  }
  // This was the splitter regex updated to fix quoted punctuation marks.
  // let splits = text.split(/(\S.+?[.\?!])(?=\s+|$|")/g);
  // todo: look for side effects in this regex replacement:
  let splits = naiive_split(text);
  //filter-out the grap ones
  for(let i = 0; i < splits.length; i++) {
    let s = splits[i];
    if (!s || s === '') {
      continue;
    }
    //this is meaningful whitespace
    if (!s.match(/\S/)) {
      //add it to the last one
      if (chunks[chunks.length - 1]) {
        chunks[chunks.length - 1] += s;
        continue;
      } else if (splits[i + 1]) { //add it to the next one
        splits[i + 1] = s + splits[i + 1];
        continue;
      }
    //else, only whitespace, no terms, no sentence
    }
    chunks.push(s);
  }

  //detection of non-sentence chunks
  const abbrev_reg = new RegExp('\\b(' + abbreviations.join('|') + ')[.!?] ?$', 'i');
  const acronym_reg = new RegExp('[ |\.][A-Z]\.? +?$', 'i');
  const elipses_reg = new RegExp('\\.\\.\\.* +?$');
  //loop through these chunks, and join the non-sentence chunks back together..
  for (let i = 0; i < chunks.length; i++) {
    //should this chunk be combined with the next one?
    if (chunks[i + 1] && (chunks[i].match(abbrev_reg) || chunks[i].match(acronym_reg) || chunks[i].match(elipses_reg))) {
      chunks[i + 1] = (chunks[i] + (chunks[i + 1] || '')); //.replace(/ +/g, ' ');
    } else if (chunks[i] && chunks[i].length > 0) { //this chunk is a proper sentence..
      sentences.push(chunks[i]);
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
// console.log(sentence_parser('hi John. He is good'));
