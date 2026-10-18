const lookahead = 3

const splitSentences = (text, nlp) => {
  return nlp.methods().one.tokenize.splitSentences(text, nlp.world())
}

const sentenceBuffer = nlp => {
  let pending = ''
  let nextSplit = 0
  return {
    push(chunk) {
      pending += chunk
      if (pending.length < nextSplit) {
        return ''
      }
      const sentences = splitSentences(pending, nlp)
      // Keep the unfinished sentence plus quote/parenthesis lookahead.
      if (sentences.length <= lookahead) {
        // Avoid rescanning a growing, very long sentence on every small read.
        nextSplit = Math.max(1, pending.length * 2)
        return ''
      }
      const ready = sentences.slice(0, -lookahead).join('')
      pending = sentences.slice(-lookahead).join('')
      nextSplit = 0
      return ready
    },
    finish() {
      const tail = pending
      pending = ''
      nextSplit = 0
      return tail
    },
  }
}

export { splitSentences, sentenceBuffer }
