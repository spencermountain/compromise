// list of all match patterns, Nov 2020
let patterns = []
patterns = patterns.reduce((h, str) => {
  h[str] = 0
  return h
}, {})

module.exports = patterns
