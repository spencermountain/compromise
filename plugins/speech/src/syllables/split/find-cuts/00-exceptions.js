// Whole-word splits that override the vowel-span and boundary rules.
// Keys are lowercase; values are interior cut offsets, excluding the word's end.
const exceptions = {
  acre: [1], // a-cre: the final re carries a syllable
  // Borrowed words whose final e is pronounced.
  cafe: [2], // ca-fe
  abalone: [2, 3, 5], // ab-a-lo-ne
  aborigine: [2, 3, 6, 7], // ab-o-rig-i-ne
  comanche: [2, 5], // co-man-che
  dolce: [3], // dol-ce
  // Borrowed vowel combinations do not follow the usual English pair rules.
  acacia: [1, 3], // a-ca-cia
  fuchsia: [4], // fuch-sia
  concierge: [3, 5], // con-ci-erge
  concierges: [3, 5], // con-ci-erges
  comedienne: [2, 4, 6], // co-me-di-enne
  // The final re in massacre carries a syllable, including its inflected forms.
  massacre: [3, 5], // mas-sa-cre
  massacred: [3, 5], // mas-sa-cred
  massacring: [3, 5], // mas-sa-cring
  // Silent consonants make these look like syllabic -le endings.
  aisle: [],
  isle: [],
  wednesday: [6], // wednes-day
  // Keep the spoken vowel groups together or apart explicitly.
  buoyant: [4], // buoy-ant
  buoyancy: [4, 6], // buoy-an-cy
  acquiesce: [2, 5], // ac-qui-esce
  acquiesced: [2, 5], // ac-qui-esced
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
  juan: [], // 'juan':
  wyatt: [2], // 'wy att'
}

const checkExceptions = str => {
  if (Object.hasOwn(exceptions, str)) {
    return exceptions[str]
  }
  // Reuse singular cuts for a plain -s ending; exact entries above take priority.
  const singular = str.replace(/s$/, '')
  if (Object.hasOwn(exceptions, singular)) {
    // A sibilant before silent e adds a syllable: sci-ence becomes sci-en-ces.
    if (/[csxz]e$/.test(singular)) {
      return exceptions[singular].concat(singular.length - 2)
    }
    return exceptions[singular]
  }
  return null
}

export default checkExceptions
