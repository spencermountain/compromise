// Internal conversion model. Keep it separate from the public .parse() result.
const readAuxiliary = function (parsed, form) {
  const passive = /^passive-/.test(form)
  const perfectForm = /^(present|past|future)-perfect/.test(form)
  if (!passive && !perfectForm) {
    return null
  }
  const words = parsed.auxiliary.terms().map(term => term.text('normal'), [])
  if (words.length === 0) {
    return null
  }
  return {
    words,
    finite: words[0],
    passive,
    perfect: words.some(word => /^(has|have|had)$/.test(word)),
    progressive: passive ? words.includes('being') : /progressive$/.test(form),
    form,
  }
}

export default readAuxiliary
