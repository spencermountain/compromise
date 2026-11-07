// print each matching sentence, with the match in green and the rest in grey
const green = str => `\x1b[32m${str}\x1b[0m`
const grey = str => `\x1b[90m${str}\x1b[0m`
const ellipsis = '… '

// ids of every term inside a match
const matchedIds = function (doc, pattern) {
  const ids = new Set()
  doc.match(pattern).docs.forEach(terms => {
    terms.forEach(t => ids.add(t.id))
  })
  return ids
}

// drop unmatched words from whichever side has more of them, until the line fits
const trim = function (words, width) {
  let first = 0
  let last = words.length - 1
  const firstHit = words.findIndex(w => w.hit)
  const lastHit = words.length - 1 - [...words].reverse().findIndex(w => w.hit)
  const length = () => words.slice(first, last + 1).reduce((n, w) => n + w.str.length, 0)
  while (length() > width) {
    const left = firstHit - first
    const right = last - lastHit
    if (left === 0 && right === 0) {
      break
    }
    if (left > right) {
      first += 1
    } else {
      last -= 1
    }
  }
  return { words: words.slice(first, last + 1), before: first > 0, after: last < words.length - 1 }
}

const highlight = function (doc, pattern, opts) {
  const ids = matchedIds(doc, pattern)
  const lines = []
  doc.docs.forEach(terms => {
    const words = terms.map(t => ({ str: t.pre + t.text + t.post, hit: ids.has(t.id) }))
    if (!words.some(w => w.hit)) {
      return
    }
    const res = trim(words, opts.width)
    // trim whitespace at the edges before painting, so it does not land inside a colour code
    res.words[0] = { ...res.words[0], str: res.words[0].str.trimStart() }
    res.words[res.words.length - 1] = { ...res.words.at(-1), str: res.words.at(-1).str.trimEnd() }
    const paint = opts.color ? w => (w.hit ? green(w.str) : grey(w.str)) : w => w.str
    let line = res.words.map(paint).join('')
    if (res.before) {
      line = (opts.color ? grey(ellipsis) : ellipsis) + line
    }
    if (res.after) {
      line = line + (opts.color ? grey(' ' + ellipsis.trim()) : ' ' + ellipsis.trim())
    }
    lines.push(line)
  })
  return lines.join('\n')
}

export default highlight
