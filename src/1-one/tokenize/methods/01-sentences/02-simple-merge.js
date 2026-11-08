// a letter, number, or symbol/emoji in any script - otherwise it's only punctuation
const hasLetter = /[\p{L}\p{N}\p{So}]/u
const hasSomething = /\S/

const notEmpty = function (splits) {
  const chunks = []
  let lead = '' // whitespace+punctuation, before the first chunk
  for (let i = 0; i < splits.length; i++) {
    const s = splits[i]
    if (s === undefined || s === '') {
      continue
    }
    //this is meaningful whitespace
    if (!hasSomething.test(s) || !hasLetter.test(s)) {
      //add it to the last one
      if (chunks[chunks.length - 1]) {
        chunks[chunks.length - 1] += s
        continue
      } else if (splits[i + 1]) {
        //add it to the next one
        lead += s
        continue
      }
    }
    //else, only whitespace, no terms, no sentence
    chunks.push(lead + s)
    lead = ''
  }
  return chunks
}
export default notEmpty