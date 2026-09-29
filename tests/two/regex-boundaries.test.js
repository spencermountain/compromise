import test from 'tape'
import nlp from './_lib.js'

const wrappers = [['', ''], ['"', '"'], ["'", "'"], ['“', '”'], ['‘', '’'], ['(', ')']]

test('generated email and URL boundaries preserve text and selections', t => {
  const emails = []
  for (const local of ['alice', 'first-last', 'first.last+news']) {
    for (const domain of ['example.com', 'my-site.info', 'sub.my-site.technology']) {
      emails.push(`${local}@${domain}`)
    }
  }
  const urls = []
  for (const base of ['x.io', 'my-site.com', 'https://my-site.xyz', 'www.my-site.technology']) {
    for (const tail of ['', '/a-b', '?q=yes', '#section', ':8080/path?q=yes#part']) urls.push(base + tail)
  }
  const failures = []
  let count = 0
  for (const [tag, values] of [['Email', emails], ['Url', urls]]) {
    for (const value of values) {
      for (const [open, close] of wrappers) {
        for (const separator of [' ', '\n', '\r\n']) {
          for (const ending of [',', '.']) {
            const text = `See ${open}${value}${close}${ending}${separator}Thanks.`
            const doc = nlp(text)
            const found = doc.match(`#${tag}`)
            count++
            if (doc.text() !== text || found.terms().length !== 1 || found.text('normal') !== value) {
              failures.push({ text, output: doc.text(), selected: found.text('normal') })
            }
          }
        }
      }
    }
  }
  t.deepEqual(failures, [], `${count} generated address contexts preserve text and isolate the complete address`)
  t.end()
})

test('generated punctuation contexts preserve Unicode and are stable when normalized', t => {
  const failures = []
  let count = 0
  for (const word of ['alpha', 'café', '𐐀word', '東京', 'word😀word']) {
    for (const [open, close] of wrappers) {
      for (const prefix of ['', '!!!', '  ', '😀']) {
        for (const suffix of ['', '?!', '…', '\n', '  ']) {
          const text = prefix + open + word + close + suffix
          const reconstructed = nlp(text).text()
          if (reconstructed !== text) failures.push({ text, reconstructed })
          count++
        }
      }
    }
  }
  t.deepEqual(failures, [], `${count} punctuation contexts round-trip code points`)
  const normalizationFailures = []
  for (const infix of ['.', '...', ',', '!', '?', '-', '😀']) {
    for (const ending of ['', '.', '!!!', '…', ')']) {
      const text = `("AlPhA${infix}BeTa${ending}`
      const expected = `alpha${infix}beta`
      const doc = nlp(text)
      const normals = doc.json().flatMap(sentence => sentence.terms.map(term => term.normal))
      doc.normalize()
      const normalized = doc.text()
      doc.normalize()
      if (normals.length !== 1 || normals[0] !== expected || doc.text() !== normalized) {
        normalizationFailures.push({ text, expected, normals, normalized, repeated: doc.text() })
      }
    }
  }
  t.deepEqual(normalizationFailures, [], 'term normals preserve internal punctuation and document normalization is idempotent')
  t.end()
})

test('match groups preserve captures, repetition and surrounding words', t => {
  const cases = [
    ['before red after', 'before [<choice>(red|blue)] after', 'red'],
    ['before blue after', 'before [<choice>(red|blue)] after', 'blue'],
    ['before red blue after', 'before [<choice>(red|blue)+] after', 'red blue'],
    ['before after', 'before [<choice>(red|blue)?] after', ''],
    ['before two words after', 'before [<choice>(two words|three words)] after', 'two words'],
    ['before three words after', 'before [<choice>(two words|three words)] after', 'three words'],
    ['before cat after', 'before [<choice>(#Noun && cat)] after', 'cat'],
    ['before green after', 'before [<choice>(!red && !blue)] after', 'green'],
  ]
  for (const [text, pattern, captured] of cases) {
    const doc = nlp(text)
    for (const anchored of [pattern, '^' + pattern + '$']) {
      const match = doc.match(anchored)
      t.equal(match.text(), text, anchored + ' matches the whole phrase')
      t.equal(match.groups('choice').text(), captured, 'only the chosen words are captured')
    }
  }
  for (const text of ['before green after', 'before red elsewhere', 'elsewhere red after']) {
    t.notOk(nlp(text).has('before (red|blue) after'), 'reject mismatched alternatives or surrounding words')
  }
  t.notOk(nlp('before red after').has('before !(red|blue) after'), 'negation excludes the alternatives')
  t.notOk(nlp('extra before red after').has('^before (red|blue) after$'), 'start anchor excludes preceding words')
  t.notOk(nlp('before red after extra').has('^before (red|blue) after$'), 'end anchor excludes following words')
  for (const pattern of ['[<unfinished', '[<>foo]', '[<name foo]']) {
    t.throws(() => nlp.parseMatch(pattern), /Invalid named capture/, 'malformed named capture: ' + pattern)
  }
  t.end()
})
