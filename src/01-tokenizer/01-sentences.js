//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2017 MIT
// const abbreviations = Object.keys(require('../../data/lexicon/abbreviations'))

//proper nouns with exclamation marks
const exclamation = {
  yahoo: true,
  joomla: true,
  jeopardy: true,
}
//regs-
const acronym_reg = /[ .][A-Z]\.? *$/i
const ellipses_reg = /(?:\u2026|\.{2,}) *$/

// Match different formats of new lines. (Mac: \r, Linux: \n, Windows: \r\n)
const new_line = /((?:\r?\n|\r)+)/
const naiive_sentence_split = /(\S.+?[.!?\u203D\u2E18\u203C\u2047-\u2049])(?=\s+|$)/g

const letter_regex = /[a-z\u00C0-\u00FF]/i
const not_ws_regex = /\S/
const startWhitespace = /^\s+/

// Start with a regex:
const naiive_split = function(text) {
  let all = []
  //first, split by newline
  let lines = text.split(new_line)
  for (let i = 0; i < lines.length; i++) {
    //split by period, question-mark, and exclamation-mark
    let arr = lines[i].split(naiive_sentence_split)
    for (let o = 0; o < arr.length; o++) {
      all.push(arr[o])
    }
  }
  return all
}

const splitSentences = function(text, world) {
  let abbrevs = world.cache.abbreviations
  abbrevs = Object.keys(abbrevs).join('|')
  const abbrev_reg = new RegExp('\\b(' + abbrevs + ')[.!?\u203D\u2E18\u203C\u2047-\u2049] *$', 'i')

  text = text || ''
  text = String(text)
  let sentences = []
  // First do a greedy-split..
  let chunks = []
  // Ensure it 'smells like' a sentence
  if (!text || typeof text !== 'string' || not_ws_regex.test(text) === false) {
    return sentences
  }
  // Start somewhere:
  let splits = naiive_split(text)
  // Filter-out the crap ones
  for (let i = 0; i < splits.length; i++) {
    let s = splits[i]
    if (s === undefined || s === '') {
      continue
    }
    //this is meaningful whitespace
    if (not_ws_regex.test(s) === false) {
      //add it to the last one
      if (chunks[chunks.length - 1]) {
        chunks[chunks.length - 1] += s
        continue
      } else if (splits[i + 1]) {
        //add it to the next one
        splits[i + 1] = s + splits[i + 1]
        continue
      }
    }
    //else, only whitespace, no terms, no sentence
    chunks.push(s)
  }

  //detection of non-sentence chunks:
  //loop through these chunks, and join the non-sentence chunks back together..
  for (let i = 0; i < chunks.length; i++) {
    let c = chunks[i]
    //should this chunk be combined with the next one?
    if (chunks[i + 1] && letter_regex.test(c) && (abbrev_reg.test(c) || acronym_reg.test(c) || ellipses_reg.test(c))) {
      chunks[i + 1] = c + (chunks[i + 1] || '')
    } else if (c && c.length > 0 && letter_regex.test(c)) {
      //this chunk is a proper sentence..
      sentences.push(c)
      chunks[i] = ''
    }
  }
  //if we never got a sentence, return the given text
  if (sentences.length === 0) {
    return [text]
  }

  //move whitespace to the ends of sentences, when possible
  //['hello',' world'] -> ['hello ','world']
  for (let i = 1; i < sentences.length; i += 1) {
    let ws = sentences[i].match(startWhitespace)
    if (ws !== null) {
      sentences[i - 1] += ws[0]
      sentences[i] = sentences[i].replace(startWhitespace, '')
    }
  }
  return sentences
}

module.exports = splitSentences
// console.log(sentence_parser('john f. kennedy'));
