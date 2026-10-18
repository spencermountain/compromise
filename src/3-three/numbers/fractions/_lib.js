const isValid = obj => obj && Number.isFinite(obj.numerator) && Number.isFinite(obj.denominator) && obj.denominator !== 0

// Replacement can change term counts; return only the newly inserted terms.
const replaceFraction = (view, str) => {
  const [sentence, start] = view.fullPointer[0]
  // The written sign replaces a leading numeric minus.
  if (str.startsWith('minus ')) {
    const first = view.docs[0][0]
    first.pre = first.pre.replace(/-$/, '')
  }
  const replacement = view.fromText(str).tag('Fraction')
  const end = start + replacement.wordCount()
  view.replaceWith(replacement)
  return view.toView([[sentence, start, end]])
}

export { isValid, replaceFraction }
