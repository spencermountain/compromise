import { toList, toHash } from '../../tokenize/model/_lib.js'
// number suffixes that are not units
// s=1990s, e=18e french/spanish ordinal, er=french 1er, ère/ème=french 2ème
export default toHash(toList(`
st
nd
rd
th
am
pm
max
°
s
e
er
ère
ème
`))
