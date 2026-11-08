// print one line per match: its sentence, with the match in green and the rest in grey.
// the match always starts at the middle column, so matches line up down the page
const green = str => `\x1b[32m${str}\x1b[0m`
const grey = str => `\x1b[90m${str}\x1b[0m`
const ellipsis = '…'

const textOf = words => words.map(w => w.str).join('')

// drop words from the far end of one side until it fits. only the outer edge is trimmed,
// since the space between the context and the match is printed
const fit = function (words, max, fromStart) {
  let cut = false
  const length = () => {
    const str = fromStart ? textOf(words).trimStart() : textOf(words).trimEnd()
    return str.length + (cut ? ellipsis.length + 1 : 0)
  }
  while (words.length > 0 && length() > max) {
    if (fromStart) {
      words.shift()
    } else {
      words.pop()
    }
    cut = true
  }
  return cut
}

const paint = function (words, color) {
  if (!color) {
    return textOf(words)
  }
  return words.map(w => (w.hit ? green(w.str) : grey(w.str))).join('')
}

const highlight = function (doc, pattern, opts) {
  const half = Math.floor(opts.width / 2)
  const dim = str => (opts.color ? grey(str) : str)
  const lines = []
  // each pointer is [sentence, start, end] into the full document
  doc.match(pattern).fullPointer.forEach(([n, start, end]) => {
    const terms = doc.document[n]
    // collapse line breaks inside the sentence, so each match stays on one line.
    // blank terms, which the tokenizer leaves behind some punctuation, fold into the word before
    const words = []
    terms.forEach((t, i) => {
      const str = (t.pre + t.text + t.post).replace(/\s+/g, ' ')
      if (str.trim() !== '') {
        words.push({ str, i, hit: i >= start && i < end })
      } else if (words.length > 0) {
        words[words.length - 1].str = (words[words.length - 1].str + str).replace(/\s+/g, ' ')
      }
    })
    // left: the words before the match, trimmed from the start, padded to the middle column
    const left = words.filter(w => w.i < start)
    const leftCut = fit(left, half, true)
    if (left.length > 0) {
      left[0] = { ...left[0], str: left[0].str.trimStart() }
    }
    let leftStr = (leftCut ? dim(ellipsis + ' ') : '') + paint(left, opts.color)
    const leftLen = textOf(left).length + (leftCut ? ellipsis.length + 1 : 0)
    leftStr = ' '.repeat(Math.max(0, half - leftLen)) + leftStr
    // right: the match and the words after it, trimmed from the end. the match is never cut
    const right = words.filter(w => w.hit)
    const after = words.filter(w => w.i >= end)
    const rightCut = fit(after, opts.width - half - textOf(right).length, false)
    right.push(...after)
    right[right.length - 1] = { ...right.at(-1), str: right.at(-1).str.trimEnd() }
    const rightStr = paint(right, opts.color) + (rightCut ? dim(' ' + ellipsis) : '')
    lines.push(leftStr + rightStr)
  })
  return lines.join('\n')
}

export default highlight
