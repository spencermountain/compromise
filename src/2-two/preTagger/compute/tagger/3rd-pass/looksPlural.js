//similar to plural/singularize rules, but not the same
const isPlural = {
  e: [
    'mice',
    'louse',
    'antennae',
    'formulae',
    'nebulae',
    'vertebrae',
    'vitae',
  ],
  i: [
    'tia',
    'octopi',
    'viri',
    'radii',
    'nuclei',
    'fungi',
    'cacti',
    'stimuli',
  ],
  n: [
    'men',
  ]
}

const notPlural = [
  'bus',
  'mas',//christmas
  'was',
  'las',
  'ias',//alias
  'xas',
  'vas',
  'cis',//probocis
  'lis',
  'nis',//tennis
  'ois',
  'ris',
  'sis',//thesis
  'tis',//mantis, testis
  'xis',
  'aus',
  'bus',
  'cus',
  'eus',//nucleus
  'fus',//doofus
  'gus',//fungus
  'ius',//radius
  'lus',//stimulus
  'nus',
  'ous',
  'pus',//octopus
  'rus',//virus
  'sus',//census
  'tus',//status,cactus
  'xus',
  '\'s',
  'ss',
]

const looksPlural = function (str) {
  // not long enough to be plural
  if (!str || str.length <= 3) {
    return false
  }
  let end = str[str.length - 1]
  // look at 'firemen'
  if (isPlural.hasOwnProperty(end)) {
    return isPlural[end].find(suff => str.endsWith(suff))
  }
  if (end !== 's') {
    return false
  }
  // look for 'virus'
  if (notPlural.find(suff => str.endsWith(suff))) {
    return false
  }
  // ends with an s, seems plural i guess.
  return true
}
export default looksPlural
