const prePunctuation = [
  '#', //#hastag
  '@', //@atmention
  '_',//underscore
  // '\\-',//-4  (escape)
  '+',//+4
  '.',//.4
]
const postPunctuation = [
  '%',//88%
  '_',//underscore
  '°',//degrees, italian ordinal
  // '\'',// \u0027
]

export { prePunctuation, postPunctuation }