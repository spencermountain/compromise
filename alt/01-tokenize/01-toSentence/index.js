//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.

//regs-
const hasSomething = /\S/
const startWhitespace = /^\s+/

const basicSplit = require('./01-basic')
const isSentence = require('./02-test')

const splitSentences = function (text, world) {
  let abbrevs = world._cache.abbreviations

  text = text || ''
  text = String(text)
  let sentences = []
  // First do a greedy-split..
  let chunks = []
  // Ensure it 'smells like' a sentence
  if (!text || typeof text !== 'string' || hasSomething.test(text) === false) {
    return sentences
  }
  // cleanup unicode-spaces
  text = text.replace('\xa0', ' ')
  // Start somewhere:
  let splits = basicSplit(text)
  // Filter-out the crap ones
  for (let i = 0; i < splits.length; i++) {
    let s = splits[i]
    if (s === undefined || s === '') {
      continue
    }
    //this is meaningful whitespace
    if (hasSomething.test(s) === false) {
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
    if (chunks[i + 1] && isSentence(c, abbrevs) === false) {
      chunks[i + 1] = c + (chunks[i + 1] || '')
    } else if (c && c.length > 0) {
      //&& hasLetter.test(c)
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
