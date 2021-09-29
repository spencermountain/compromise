import basicSplit from './01-basic.js'
import isSentence from './02-isSentence.js'
//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
//regs-
const hasSomething = /\S/
const startWhitespace = /^\s+/
const hasLetter = /[a-z0-9\u00C0-\u00FF\u00a9\u00ae\u2000-\u3300\ud000-\udfff]/i

const splitSentences = function (text, model) {
  let abbrevs = model.one.abbreviations || new Set()
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
    if (hasSomething.test(s) === false || hasLetter.test(s) === false) {
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
    if (chunks[i + 1] && isSentence(c, abbrevs, hasLetter) === false) {
      chunks[i + 1] = c + (chunks[i + 1] || '')
    } else if (c && c.length > 0) {
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
export default splitSentences
