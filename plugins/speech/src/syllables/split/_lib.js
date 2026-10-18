const trailingPunct = /(?<!\p{Punctuation})\p{Punctuation}+$/u
const leadingPunct = /^[\p{Punctuation}$]+/u

// Prepare spelling for rule matching; cuts are still applied to the original text.
const normalize = input => {
  let txt = input.toLowerCase()
  // Ignore trailing punctuation runs for analysis; internal apostrophes stay intact.
  txt = txt.replace(trailingPunct, '')
  // Keep the prefix length so cuts still align with the original spelling.
  const prefix = txt.match(leadingPunct)?.[0] || ''
  const clean = txt.slice(prefix.length)
  return { clean, prefix }
}

const pushCutsBack = (cuts, prefix = '') => {
  return cuts.map(cut => cut + prefix.length)
}

// split a string into chunks based on the given cuts
const applyCuts = (text, cuts) => {
  let start = 0
  const parts = cuts.map(end => {
    const part = text.slice(start, end)
    start = end
    return part
  })
  // Cuts are interior boundaries; the final chunk always runs to the text's end.
  parts.push(text.slice(start))
  return parts
}

export { applyCuts, normalize, pushCutsBack }
