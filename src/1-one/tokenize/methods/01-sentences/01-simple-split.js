// Scan punctuation runs once. Searching for an unanchored run followed by
// whitespace repeatedly rescans long runs that have no following whitespace.
const stops = new Set('.!?\u203D\u2E18\u203C\u2047\u2048\u2049\u0964\u0965\u061F\u06D4\u0589\u1362\u1367\u104B\u17D4\u3002')
const cjkStops = new Set('。！？｡')
const openers = new Set('「『（【〔《〈“')
const closers = new Set('」』）】〕》〉”')
const whitespace = /\s/
const splitsOnly = /^[.!?‽⸘‼\u2047-\u2049।॥؟۔։።፧။។。]+\s$/
const splitsOnlyCjk = /^(?:[.!?‽⸘‼\u2047-\u2049।॥؟۔։።፧။។。！？｡]+\s|[。！？｡]+[」』）】〕》〉”]*)$/
const newLine = /((?:\r?\n|\r)+)/

const basicSplit = function (text) {
  const all = []
  const isCjk = /[。！？｡]/.test(text)
  const activeStops = isCjk ? new Set([...stops, ...cjkStops]) : stops
  for (const line of text.split(newLine)) {
    let start = 0
    const arr = []
    const emit = (from, end) => {
      arr.push(line.slice(start, from), line.slice(from, end))
      start = end
    }
    let i = 0
    while (i < line.length) {
      if (!activeStops.has(line[i])) {
        i++
        continue
      }
      const runStart = i
      while (i < line.length && activeStops.has(line[i])) i++
      if (i < line.length && whitespace.test(line[i])) {
        emit(runStart, i + 1)
        i++
        continue
      }
      if (!isCjk) continue
      // A CJK stop ends a sentence without whitespace. Following closing quotes
      // only end it when followed by whitespace, another opener, or end of text.
      let j = runStart
      while (j < i) {
        if (!cjkStops.has(line[j])) {
          j++
          continue
        }
        const from = j
        while (j < i && cjkStops.has(line[j])) j++
        let end = j
        while (end < line.length && closers.has(line[end])) end++
        if (end === j || end === line.length || whitespace.test(line[end]) || openers.has(line[end])) {
          emit(from, end)
          if (end > i) i = end
        }
      }
    }
    arr.push(line.slice(start))
    // Preserve the existing merge behavior, including punctuation-only pieces.
    for (let k = 0; k < arr.length; k++) {
      const next = arr[k + 1]
      if (next && (isCjk ? splitsOnlyCjk : splitsOnly).test(next)) {
        arr[k] += next
        arr[k + 1] = ''
      }
      if (arr[k]) all.push(arr[k])
    }
  }
  return all
}
export default basicSplit
