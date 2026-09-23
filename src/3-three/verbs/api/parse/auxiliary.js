// Internal conversion model. Keep it separate from the public .parse() result.
const readAuxiliary = function (parsed, form) {
  const words = parsed.auxiliary.terms().map(term => term.text('normal'), [])
  const text = words.join(' ')
  // Read nested layers from auxiliaries only: lexical 'have' is not perfect.
  const modal = /^(can|could|may|might|must|shall|should|would)( (be|have|been|being))*$/.test(text) ||
    /^ought to( (be|have|been|being))*$/.test(text)
  const prospective = /^(is|are|am|was|were) going to (be|have)( (been|being))*$/.test(text)
  if (modal || prospective) {
    let prefixLength = words[0] === 'ought' ? 2 : 1
    if (prospective) prefixLength = 3
    const tail = words.slice(prefixLength)
    return {
      words,
      finite: words[0],
      modal,
      prospective,
      prefixLength,
      perfect: tail.includes('have'),
      progressive: parsed.root.has('#Gerund') || tail.includes('being'),
      passive: tail.length > 0 && !parsed.root.has('#Gerund') && tail.some(w => /^(be|been|being)$/.test(w)),
      form,
    }
  }
  const passive = /^passive-/.test(form)
  const perfectForm = /^(present|past|future)-perfect/.test(form)
  if (!passive && !perfectForm) {
    return null
  }
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
