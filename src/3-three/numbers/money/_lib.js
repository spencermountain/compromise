// Replace only the number, retaining the full money phrase after term counts change.
const mapNumbers = (money, fn) => money.map(value => {
  const number = value.numbers()
  // Compound amounts need their own currency-aware parser.
  if (number.length !== 1) {
    return value
  }
  const [sentence, start, end] = value.fullPointer[0]
  const before = value.document[sentence].length
  fn(number)
  const delta = value.document[sentence].length - before
  return value.update([[sentence, start, end + delta]])
})

export default mapNumbers
