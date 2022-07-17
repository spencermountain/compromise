const allowAfter = new Set([
  '%',//88%
  '_',//underscore
  // '\'',// \u0027
])

const allowBefore = [
  '#', //#hastag
  '@', //@atmention
  '_',//underscore
  '-',//-4
  '+',//+4
  '.',//.4
]
export { allowBefore, allowAfter }