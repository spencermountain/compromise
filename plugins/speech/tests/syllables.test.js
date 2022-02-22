import test from 'tape'
import nlp from './_lib.js'

const words = [
  'sud den ly',
  'con sti pa tion',
  'di a bo lic',
  'fa ted',
  'ge ne tic',
  'hy giene',
  'o ma ha',
  'i mi ta ted',
  'tree',
  'ci vi lised',
  'went',
  'to ge ther',
  'tog gle',
  'move ment',
  'mo ment',
  'do nate',
  'vi king',
  'wat tage',
  'con gre gate',
  'some thing',
  'sales man',
  're sour ces',
  'eve ry thing',
  'eve ry bo dy',
  'hole',
  'ho ly',
  'sec ret',
  'cause',
  'fate',
  'fates',
  'eu lo gy',
  'e on',
  'rea sons',
  'and',
  'hoc key',
  'wild',
  'fun',
  'fun ny',
  'hor ses',
  'cal ga ry',
  'tor na do',
  'pen',
  'stu dy',
  'ja mai ca',
  'tri ni dad',
  'ca na da',
  'i ran',
  'i raq',
  'sau di a ra bi a',
  'clin ton',
  'hub ris',
  'tur key',
  'cor si ca',
  'dev iled',
  // 'horse',
  // 'chance',
  // 'peo ple'
]

test('test length', function (t) {
  words.forEach(sep => {
    let str = sep.replace(/ /g, '')
    let doc = nlp(str)
    let have = doc.syllables()[0]
    let want = sep.split(/ /g)
    t.equal(have.length, want.length, str)
  })
  t.end()
})
