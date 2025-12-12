
const breaks = '(but|however|and|so|thus|therefor)'

const parsePivot = function (chunk) {
  const str = chunk.text('normal')
  const breakPoint = chunk.has(breaks)
  return {
    breakPoint,
    root: str
  }
}
export default parsePivot