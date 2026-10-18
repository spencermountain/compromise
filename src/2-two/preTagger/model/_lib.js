// Expand adjacent same-tag keys once, preserving insertion and override order.
const tagWords = (words, tag) => {
  const result = {}
  words.split(' ').forEach(word => {
    result[word] = tag
  })
  return result
}

export default tagWords
