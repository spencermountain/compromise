// Whole-word splits that override the vowel-span and boundary rules.
// Keys are lowercase; values are interior cut offsets, excluding the word's end.
const exceptions = {
  acre: [1], // a-cre: the final re carries a syllable
  acres: [1], // a-cres: the plural retains the same split
  people: [3], //'peo ple',
  queue: [], //'queue',
  business: [4], //'busi ness',
  quiet: [3], //'qui et',
  science: [3], //'sci ence',
  poet: [2], //'po et',
  poetry: [2, 4], //'po et ry',
  every: [3], //'eve ry',
  everything: [3, 5], // 'eve ry thing',
  everybody: [3, 5, 7], //'eve ry bo dy',
  ilyich: [2], // 'il yich': consonantal y in this name
}

export default exceptions
