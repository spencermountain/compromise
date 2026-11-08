import { ones, teens, tens, bigs, ordinal, pow10 } from '../../_words.js'

// { fourth: 4, four: 4, ... }
const table = (words, value) => {
  const h = {}
  words.forEach((w, i) => {
    h[ordinal(w)] = value(i)
  })
  words.forEach((w, i) => {
    h[w] = value(i)
  })
  return h
}

const words = {
  ones: table(ones, i => i),
  teens: table(teens, i => 10 + i),
  tens: table([...tens, 'fourty'], i => (i === 8 ? 4 : i + 2) * 10),
  multiples: {
    ...table(bigs, i => (i === 0 ? 100 : pow10(3 * i))),
    grand: 1000,
    dozen: 12,
  },
}
// every word under one hundred
words.small = { ...words.ones, ...words.teens, ...words.tens }

export default words
