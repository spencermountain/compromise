const terms = () => {
  const document = []
  let sentence = []
  let prefix = ''
  const word = (text, tags = []) => {
    sentence.push({ text, pre: prefix, post: '', tags: new Set(tags) })
    prefix = ''
  }
  const affix = (value, inSentence) => {
    let previous = sentence.at(-1)
    if (!previous && !inSentence) {
      previous = document.at(-1)?.at(-1)
    }
    if (previous) {
      previous.post += value
    } else {
      prefix += value
    }
  }
  const flush = (force = false) => {
    // An empty carrier retains whitespace-only or empty sentences.
    if (!sentence.length && (prefix || force)) {
      word('')
    }
    if (sentence.length) {
      document.push(sentence)
      sentence = []
    }
  }
  const start = () => {
    if (sentence.length) {
      flush()
    }
  }
  return { document, word, affix, flush, start }
}
export default terms
