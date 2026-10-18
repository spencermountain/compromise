// Whole-word splits that override the vowel-span and boundary rules.
// Keys are lowercase; values are interior cut offsets, excluding the word's end.
const exceptions = {
  acre: [1], // a-cre: the final re carries a syllable
  acres: [1], // a-cres: the plural retains the same split
  // Borrowed words whose final e is pronounced.
  cafe: [2], // ca-fe
  cafes: [2], // ca-fes
  abalone: [2, 3, 5], // ab-a-lo-ne
  aborigine: [2, 3, 6, 7], // ab-o-rig-i-ne
  aborigines: [2, 3, 6, 7], // ab-o-rig-i-nes
  comanche: [2, 5], // co-man-che
  dolce: [3], // dol-ce
  // Silent consonants make these look like syllabic -le endings.
  aisle: [],
  aisles: [],
  isle: [],
  isles: [],
  wednesday: [6], // wednes-day
  wednesdays: [6], // wednes-days
  // Keep the spoken vowel groups together or apart explicitly.
  buoyant: [4], // buoy-ant
  buoyancy: [4, 6], // buoy-an-cy
  acquiesce: [2, 5], // ac-qui-esce
  acquiesced: [2, 5], // ac-qui-esced
  acquiesces: [2, 5, 7], // ac-qui-es-ces
  acquiescent: [2, 5, 7], // ac-qui-es-cent
  acquiescence: [2, 5, 7], // ac-qui-es-cence
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
