import vowelSpan from './01-vowel-span/index.js'
import boundaryPicker from './02-boundary-picker/index.js'
import exceptions from './exceptions.js'

const splitWord = word => {
  const lower = word.toLowerCase()
  let cuts
  if (Object.hasOwn(exceptions, lower)) {
    let offset = 0
    cuts = exceptions[lower]
      .split(' ')
      .slice(0, -1)
      .map(part => {
        offset += part.length
        return offset
      })
  } else {
    cuts = boundaryPicker(lower, vowelSpan(lower))
  }
  let start = 0
  const parts = cuts.map(end => {
    const part = word.slice(start, end)
    start = end
    return part
  })
  parts.push(word.slice(start))
  return parts
}
export default splitWord
