import parseNoun from './parse.js'
import { needsArticle } from './_article.js'

const joiner = '(and|or|nor)'

// 'cats and dogs' -> ['cats', 'dogs']
const getParts = function (m) {
  const parts = []
  if (m.has(joiner)) {
    m.splitOn(joiner).forEach(p => {
      if (!p.has(`^${joiner}$`)) {
        parts.push(p)
      }
    })
  }
  return parts
}

// change each noun in a list
const eachNoun = function (m, fn, opts = {}) {
  const parts = getParts(m)
  // 'black and white cats' is not a list of nouns
  if (parts.length < 2 || !parts.every(p => p.has('#Noun'))) {
    return fn(m, parseNoun(m), opts)
  }
  // the others follow the first one - 'the dogs and cats', 'a dog and a cat'
  const article = opts.agree !== false && needsArticle(parts[0], parseNoun(parts[0]))
  // a list keeps its plural verb. go last one first, so the others stay where they are
  parts.reverse().forEach((p, i) => {
    const isFirst = i === parts.length - 1
    fn(p, parseNoun(p), { ...opts, verb: false, article: isFirst ? undefined : article })
  })
  return m
}
export default eachNoun
