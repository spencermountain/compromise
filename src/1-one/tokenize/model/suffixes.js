import { toList, toHash } from './_lib.js'
// dashed suffixes that are not independent words
//  'flower-like', 'president-elect'  (not fold)
export default toHash(toList(`
like
ish
less
able
elect
type
designate
`))
