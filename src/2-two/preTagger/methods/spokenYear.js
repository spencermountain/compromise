const ones = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 }
const tens = {
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fourty: 40,
}

// ['twenty', 'twenty', 'six'] -> 2026
// only supports 'twenty ten' to 'twenty forty'
const spokenYear = function (words) {
  const [first, second, third] = words
  if (first !== 'twenty' || !Object.hasOwn(tens, second)) {
    return null
  }
  if (words.length === 2) {
    return 2000 + tens[second]
  }
  // only these take a last digit - not 'twenty forty one'
  if (words.length === 3 && (second === 'twenty' || second === 'thirty') && Object.hasOwn(ones, third)) {
    return 2000 + tens[second] + ones[third]
  }
  return null
}

export default spokenYear
