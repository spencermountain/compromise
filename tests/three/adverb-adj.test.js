import test from 'tape'
import nlp from './_lib.js'
const here = '[three/verb-toPresent] '

test('toPresent:', function (t) {
  let arr = [
    ['environmentally', 'environmental'],
    ['vertically', 'vertical'],
    ['mechanically', 'mechanical'],
    ['accidentally', 'accidental'],
    ['fully', 'full'],
    ['conversely', 'converse'],
    ['simply', 'simp'],
    ['locally', 'local'],
    ['desperately', 'desperate'],
    ['creatively', 'creative'],
    ['principally', 'principal'],
    ['inextricably', 'inextricable'],
    ['unduly', 'undu'],
    ['namely', 'name'],
    ['seemingly', 'seeming'],
    ['legally', 'legal'],
    ['accordingly', 'according'],
    ['tenuously', 'tenuous'],
    ['partly', 'part'],
    ['typically', 'typical'],
    ['globally', 'global'],
    ['unfortunately', 'unfortunate'],
    ['dearly', 'dear'],
    ['fully', 'full'],
    ['dramatically', 'dramatic'],
    ['electronically', 'electronic'],
    ['genetically', 'genetic'],
    ['beautifully', 'beautiful'],
    ['only', null],
    ['early', null],
    ['especially', null],
    ['mostly', null],
    ['daily', null],
    ['only', null],
    ['early', null],

    // ['', ''],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0]).compute('root')
    let json = doc.adverbs().json()[0] || { terms: [{}] }
    t.equal(json.terms[0].root || null, a[1], here + ' ' + a[0])
  })
  t.end()
})
