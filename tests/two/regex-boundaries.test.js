import test from 'tape'
import nlp from './_lib.js'
import parseBlocks from '../../src/1-one/match/methods/parseMatch/01-parseBlocks.js'
import normalizePunctuation from '../../src/1-one/tokenize/methods/03-whitespace/tokenize.js'
import * as punctuation from '../../src/1-one/tokenize/model/punctuation.js'
import clean from '../../src/1-one/tokenize/compute/normal/01-cleanup.js'

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
          const parts = normalizePunctuation(text, { one: punctuation })
          const reconstructed = parts.pre + parts.str + parts.post
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
      const actual = clean(text)
      if (actual !== expected || clean(actual) !== actual) normalizationFailures.push({ text, expected, actual })
    }
  }
  t.deepEqual(normalizationFailures, [], 'cleanup preserves internal punctuation and is idempotent for generated words')
  t.end()
})

test('generated match blocks preserve captures, suffix flags and surrounding words', t => {
  const failures = []
  let count = 0
  for (const prefix of ['', '!', '[', '^[<name>', '[<a>b>']) {
    for (const body of ['red|blue', '#Noun && red', 'two words|three words']) {
      for (const suffix of ['', '?', '+', ']', ']$']) {
        const block = `${prefix}(${body})${suffix}`
        const text = `before ${block} after`
        const expected = ['before', block, 'after']
        const actual = parseBlocks(text)
        if (JSON.stringify(actual) !== JSON.stringify(expected)) failures.push({ text, actual })
        count++
      }
    }
  }
  t.deepEqual(failures, [], `${count} generated match blocks`)
  for (const text of ['foo(no)bar', '((unclosed', '![<unfinished', '(x)', '(yes)trailing']) {
    t.deepEqual(parseBlocks(text), [text], `preserve rejected block ${text}`)
  }
  t.end()
})
