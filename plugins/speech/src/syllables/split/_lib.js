// syllable cuts apply on non-normalized text, but we apply rules on normalized text
const normalize = function (input) {
  // Rules use lowercase spelling
  let txt = input.toLowerCase()
  // for cutting purposes, suffixes are ignored
  txt = txt.replace(/["'.,]$/, '')
  txt = txt.replace(/'s$/, '')
  return txt
}

// split a string into chunks based on the given cuts
const applyCuts = (text, cuts) => {
  if (cuts.length === 0) {
    // (A word with no cuts remains a single chunk)
    return [text]
  }
  let start = 0
  const parts = cuts.map(end => {
    const part = text.slice(start, end)
    start = end
    return part
  })
  return parts
}

export { applyCuts, normalize }
