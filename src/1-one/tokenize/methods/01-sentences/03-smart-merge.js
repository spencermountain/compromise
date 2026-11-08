const MAX_TAIL = 64 // longer than any abbreviation
const hasLetter = /\p{L}/u

const hasNewline = function (c) {
  return Boolean(/\n$/.test(c))
}

//loop through these chunks, and join the non-sentence chunks back together..
// (only check the end of the joined text - re-reading it for every chunk is quadratic)
const smartMerge = function (chunks, world) {
  const isSentence = world.methods.one.tokenize.isSentence
  const abbrevs = world.model.one.abbreviations || new Set()

  const sentences = []
  let sentence = ''
  let tail = ''
  let foundLetter = false
  for (let i = 0; i < chunks.length; i++) {
    const c = chunks[i]
    sentence += c
    tail = (tail + c).slice(-MAX_TAIL)
    foundLetter ||= hasLetter.test(c)
    //should this chunk be combined with the next one?
    if (chunks[i + 1] && !isSentence(tail, abbrevs, foundLetter) && !hasNewline(c)) {
      continue
    }
    //this chunk is a proper sentence..
    if (sentence.length > 0) {
      sentences.push(sentence)
    }
    sentence = ''
    tail = ''
    foundLetter = false
  }
  return sentences
}
export default smartMerge