// Validate maintained source data before compression can silently discard it.
export const addWords = (lexicon, words, tag, source) => {
  for (const word of words) {
    if (typeof word !== 'string' || !word || /[.,0-9;!:|¦-]/.test(word) || word.trim().toLowerCase() !== word) {
      throw new Error(`Invalid lexicon word ${JSON.stringify(word)} in ${source}`)
    }
    if (Object.hasOwn(lexicon, word)) {
      throw new Error(`Duplicate lexicon word ${JSON.stringify(word)} in ${source}`)
    }
    lexicon[word] = tag
  }
}

export const validatePairs = (models) => {
  for (const [name, pairs] of Object.entries(models)) {
    const seen = new Set()
    for (const pair of pairs) {
      if (!Array.isArray(pair) || pair.length !== 2 || pair.some(word =>
        typeof word !== 'string' || !word || /[~|:,{}0-9]/.test(word) || word.trim().toLowerCase() !== word
      )) {
        throw new Error(`Invalid ${name} pair ${JSON.stringify(pair)}`)
      }
      if (seen.has(pair[0])) {
        throw new Error(`Duplicate ${name} input ${JSON.stringify(pair[0])}`)
      }
      seen.add(pair[0])
    }
  }
}
