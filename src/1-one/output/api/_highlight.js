import { green, grey } from '../../../API/_color.js'

// each match on its own line: green, inside its grey sentence, aligned at the middle column
const width = 55
const half = 27
const dots = '…'

// drop words from the outer edge until the side fits, leaving room for an ellipsis
const fit = (arr, max, fromStart) => {
  let cut = false
  const size = () => (fromStart ? arr.join('').trimStart() : arr.join('').trimEnd()).length + (cut ? 2 : 0)
  // each pass removes one word, so i tracks arr.length
  for (let i = arr.length; i > 0 && size() > max; i -= 1) {
    if (fromStart) {
      arr.shift()
    } else {
      arr.pop()
    }
    cut = true
  }
  return cut
}

const line = (terms, start, end) => {
  const parts = [[], [], []] // before, match, after
  terms.forEach((t, i) => {
    const str = (t.pre + t.text + t.post).replace(/\s+/g, ' ')
    const arr = parts[(i >= start ? 1 : 0) + (i >= end ? 1 : 0)]
    // blank terms fold into the word before them
    if (str.trim() === '' && arr.length > 0) {
      arr[arr.length - 1] = (arr.at(-1) + str).replace(/\s+/g, ' ')
    } else {
      arr.push(str)
    }
  })
  const [before, match, after] = parts
  const left = (fit(before, half, true) ? dots + ' ' : '') + before.join('').trimStart()
  let mid = match.join('')
  const cutR = fit(after, width - half - mid.length, false)
  const right = after.join('').trimEnd() + (cutR ? ' ' + dots : '')
  if (right === '') {
    mid = mid.trimEnd()
  }
  return ' '.repeat(Math.max(0, half - left.length)) + (left ? grey(left) : '') + green(mid) + (right ? grey(right) : '')
}

const highlight = view => view.fullPointer.map(([n, s, e]) => line(view.document[n], s, e)).join('\n')
export default highlight
