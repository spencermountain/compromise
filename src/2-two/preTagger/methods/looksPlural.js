import { toSet } from '../../_lib.js'
//similar to plural/singularize rules, but not the same
const isPlural = {
  e: 'mice louse antennae formulae nebulae vertebrae vitae'.split(' '),
  i: 'tia octopi viri radii nuclei fungi cacti stimuli'.split(' '),
  n: ['men'],
  t: ['feet'],
}
// plural words as exceptions to suffix-rules
const exceptions = toSet('israelis menus logos')

// christmas, alias, probocis, tennis, thesis, mantis, nucleus, doofus, fungus, radius, stimulus, octopus, virus, census, status, chaos, barbados
const notPlural = `bus mas was ias xas vas cis lis nis ois ris sis tis xis aus cus eus fus gus ius lus nus das ous pus rus sus tus xus aos igos ados ogos 's ss`.split(' ')

const looksPlural = function (str) {
  // not long enough to be plural
  if (!str || str.length <= 3) {
    return false
  }
  // 'menus' etc
  if (exceptions.has(str)) {
    return true
  }
  const end = str[str.length - 1]
  // look at 'firemen'
  if (Object.hasOwn(isPlural, end)) {
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
