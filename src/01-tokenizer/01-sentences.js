//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2017 MIT

//proper nouns with exclamation marks
// const blacklist = {
//   yahoo: true,
//   joomla: true,
//   jeopardy: true,
// }

//regs-
const initSplit = /(\S.+?[.!?\u203D\u2E18\u203C\u2047-\u2049])(?=\s+|$)/g
const hasSomething = /\S/

const isAcronym = /[ .][A-Z]\.? *$/i
const hasEllipse = /(?:\u2026|\.{2,}) *$/
const newLine = /((?:\r?\n|\r)+)/ // Match different new-line formats
const hasLetter = /[a-z0-9\u00C0-\u00FF\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/i

const startWhitespace = /^\s+/

// Start with a regex:
const naiive_split = function (text) {
  let all = []
  //first, split by newline
  let lines = text.split(newLine)
  for (let i = 0; i < lines.length; i++) {
    //split by period, question-mark, and exclamation-mark
    let arr = lines[i].split(initSplit)
    for (let o = 0; o < arr.length; o++) {
      all.push(arr[o])
    }
  }
  return all
}

/** does this look like a sentence? */
const isSentence = function (str, abbrevs) {
  // check for 'F.B.I.'
  if (isAcronym.test(str) === true) {
    return false
  }
  //check for '...'
  if (hasEllipse.test(str) === true) {
    return false
  }
  // must have a letter
  if (hasLetter.test(str) === false) {
    return false
  }

  let txt = str.replace(/[.!?\u203D\u2E18\u203C\u2047-\u2049] *$/, '')
  let words = txt.split(' ')
  let lastWord = words[words.length - 1].toLowerCase()
  // check for 'Mr.'
  if (abbrevs.hasOwnProperty(lastWord)) {
    return false
  }
  // //check for jeopardy!
  // if (blacklist.hasOwnProperty(lastWord)) {
  //   return false
  // }
  return true
}

const splitSentences = function (text, world) {
  let abbrevs = world.cache.abbreviations

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
  let splits = naiive_split(text)
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
