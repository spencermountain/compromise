// Prepare spelling for rule matching; cuts are still applied to the original text.
const normalize = input => {
  let txt = input.toLowerCase()
  // Because cut begins from the start, we are safe to remove all noisy suffixes
  txt = txt.replace(/["'.,]$/, '')
  // (Keep apostrophe suffixes intact)
  const isPrefix = /^["'@#$“]+/
  const clean = txt.replace(isPrefix, '')
  const prefix = txt.match(isPrefix)?.[0] || ''
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
