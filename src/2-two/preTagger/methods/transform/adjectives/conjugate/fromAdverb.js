import doRules from './lib.js'
import { toSet } from '../../../../../_lib.js'

// analytically -> analytical (not analytic)
const ical = new Set('analyt chem class clin crit ecolog electr empir frant grammat ident ideolog log mag mathemat mechan med method mus phys polit pract rad satir statist techn technolog theoret typ vert whims'.split(' ').map(x => x + 'ically'))

const suffixes = [
  null,
  {},
  { 'ly': '' },
  {
    'ily': 'y',
    'bly': 'ble',
    'ply': 'ple',
  },
  {
    'ally': 'al',
    'rply': 'rp',
  },
  {
    'ually': 'ual',
    'ially': 'ial',
    'cally': 'cal',
    'eally': 'eal',
    'rally': 'ral',
    'nally': 'nal',
    'mally': 'mal',
    'eeply': 'eep',
    'eaply': 'eap',
  },
  {
    ically: 'ic',
  }
]

const noAdj = toSet('early only hourly daily weekly monthly yearly mostly duly unduly especially undoubtedly conversely namely exceedingly presumably accordingly overly best latter little long low')

// exceptions to rules
const exceptions = {
  wholly: 'whole',
  fully: 'full',
  truly: 'true',
  gently: 'gentle',
  singly: 'single',
  customarily: 'customary',
  idly: 'idle',
  publically: 'public',
  quickly: 'quick',
  superbly: 'superb',
  cynically: 'cynical',
  well: 'good',// -?
}


const toAdjective = function (str) {
  if (!str.endsWith('ly')) {
    return null
  }
  // 'electronic' vs 'electronical'
  if (ical.has(str)) {
    return str.replace(/ically/, 'ical')
  }
  if (noAdj.has(str)) {
    return null
  }
  if (Object.hasOwn(exceptions, str)) {
    return exceptions[str]
  }
  return doRules(str, suffixes) || str
}
export default toAdjective

// console.log(toAdjective('emphatically'))
// console.log(toAdjective('usually'))
// console.log(toAdjective('mechanically'))
// console.log(toAdjective('vertically'))