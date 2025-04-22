import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/normalize-more] '

test('possessives', function (t) {
  let doc = nlp(`Corey Hart's pudding and Google's advertising`)
  doc = doc.normalize({ possessives: true, case: false })
  t.equal(doc.out(), 'corey hart pudding and google advertising', here + 'normalize possessives')
  t.end()
})

test('optional params', function (t) {
  const doc = nlp(`John Smith bought automobiles (for us)`).normalize({
    case: true,
    possessives: true,
    parentheses: true,
    verbs: true,
  })
  t.equal(doc.out(), 'john smith buy automobiles for us', here + 'many-on')
  t.end()
})

test('optional param - verbs and plurals together', function (t) {
  const plurals = [['batmobiles', 'batmobile']]
  const verbs = [['I was walking', 'I walk']]

  // good
  plurals.forEach(a => {
    const doc = nlp(a[0])
    const pluralsOn = doc.normalize({
      nouns: true,
    })
    t.equal(pluralsOn.out(), a[1], here + a[0])
  })

  // good
  verbs.forEach(a => {
    const doc = nlp(a[0])
    const verbsOn = doc.normalize({
      verbs: true,
    })
    t.equal(verbsOn.out(), a[1], here + a[0])
  })

  // bad
  plurals.concat(verbs).forEach(a => {
    const doc = nlp(a[0])
    const bothOn = doc.normalize({
      nouns: true,
      verbs: true,
    })
    t.equal(bothOn.out(), a[1], here + a[0])
  })

  t.end()
})

test('honorifics', function (t) {
  const tests = [
    ['rear admiral Smith', 'smith'],
    ['Lieutenant John Smith', 'john smith'],
    // ['Admiral Davis Jr', 'davis jr'],
    // ['Field marshal Herring', 'herring'],
    ['General Lou Gobbells of the US air force', 'lou gobbells of the us air force'],
    ['Rear admiral John', 'john'],
    ['Lieutenant general James Baker', 'james baker'],
    ['Lieutenant colonel Bing Crosby', 'bing crosby'],
    ['Major Tom', 'tom'],
    // ['major effort by President Xi', 'major effort by xi'],
    ['Corporal John Herring', 'john herring'],
    ['sergeant major Harold', 'harold'],
    ['Second lieutenant Semore Hirthman', 'semore hirthman'],
    ['first lady Michelle obama', 'michelle obama'],
    // ['prime minister Stephen Hawking', 'stephen hawking'],
    //no names
    // ['first lieutenant', '1st lieutenant'],
    // ['Sergeant', 'sergeant'],
  ]
  tests.forEach(a => {
    let doc = nlp(a[0])
    doc = doc.normalize({
      honorifics: true,
      case: true,
    })
    t.equal(doc.out('normal'), a[1], here + a[0])
  })
  t.end()
})

test('hyphen-whitespace:', function (t) {
  const doc = nlp(`the so-called “fascist  dictator”`)
  doc.normalize({ whitespace: true, punctuation: false })
  t.equal(doc.text(), `the so called “fascist dictator”`, here + 'keep hyphen')
  t.end()
})

// test('dash-whitespace:', function (t) {
//   let str = `a dash seperates words - like that`
//   let doc = nlp(str)
//   doc.normalize({ whitespace: true, punctuation: false })
//   t.equal(doc.text(), `a dash seperates words like that`, here + 'dont keep the dash')
//   t.end()
// })

test('elipses-whitespace:', function (t) {
  let doc = nlp('about this ...').normalize()
  t.equal(doc.out('text'), 'about this', here + 'normalize seperate elipses')

  doc = nlp('about this ...').toLowerCase()
  t.equal(doc.out('text'), 'about this ...', here + 'lowercase elipses')

  doc = nlp('about this...').normalize()
  t.equal(doc.out('text'), 'about this', here + 'normalize attatched elipses')
  t.end()
})

test('more-normalize:', function (t) {
  let doc = nlp(`i saw first lady michelle obama`)
  doc.normalize({ honorifics: true })
  t.equal(doc.out('text'), 'i saw michelle obama', here + 'normalize honorifics')

  doc = nlp(`google's tax return`)
  doc.normalize({ possessives: true })
  t.equal(doc.out('text'), 'google tax return', here + 'normalize possessives')
  t.end()
})
