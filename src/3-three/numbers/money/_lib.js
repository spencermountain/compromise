import arithmetic from './arithmetic.js'

// Replace only the number, retaining the full money phrase after term counts change.
const mapNumbers = (money, fn, operation) => money.map(value => {
  const number = value.numbers()
  // Formatting conversions still operate on a single numeric component.
  if (!operation && number.length !== 1) {
    return value
  }
  const [sentence, start, end] = value.fullPointer[0]
  const before = value.document[sentence].length
  if (operation) {
    arithmetic(value, operation)
  } else {
    fn(number)
  }
  const delta = value.document[sentence].length - before
  return value.update([[sentence, start, end + delta]])
})

export default mapNumbers
