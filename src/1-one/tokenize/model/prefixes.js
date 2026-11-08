import { toList, toHash } from './_lib.js'
// dashed prefixes that are not independent words
//  'mid-century', 'pre-history', 'out-lived', 'ex-wife'
// (not counter, mid, non, over, post, semi, super, ultra, under, whole)
export default toHash(toList(`
anti
bi
co
contra
de
extra
infra
inter
intra
macro
micro
mis
mono
multi
peri
pre
pro
proto
pseudo
re
sub
supra
trans
tri
un
out
ex
`))
