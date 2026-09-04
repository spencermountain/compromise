// a letter, number, or symbol/emoji in any script - otherwise it's only punctuation
const hasLetter = /[\p{L}\p{N}\p{So}]/u
const hasSomething = /\S/

const notEmpty = function (splits) {
  const chunks = []
  for (let i = 0; i < splits.length; i++) {
    const s = splits[i]
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
  return chunks
}
export default notEmpty