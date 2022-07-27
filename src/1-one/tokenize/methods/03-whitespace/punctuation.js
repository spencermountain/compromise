const allowBefore = [
  '#', //#hastag
  '@', //@atmention
  '_',//underscore
  '\\-',//-4  (escape)
  '+',//+4
  '.',//.4
]
const allowAfter = [
  '%',//88%
  '_',//underscore
  // '\'',// \u0027
]

export { allowBefore, allowAfter }