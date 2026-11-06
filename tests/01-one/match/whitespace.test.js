import test from 'tape'
import nlp from '../lib.js'
const here = '[one/match/whitespace] '

test(here + 'any whitespace separates terms', t => {
  const doc = nlp.tokenize('the big dog ran')
  const arr = [
    'big dog',
    'big  dog',
    'big\tdog',
    'big\ndog',
    'big\r\ndog',
    'big dog',
    'big dog',
    'big　dog',
    'big \t dog',
    '\tbig\tdog\n',
    'big\n  dog',
  ]
  arr.forEach(str => {
    t.equal(doc.match(str).text(), 'big dog', here + JSON.stringify(str))
  })
  t.end()
})

test(here + 'whitespace parses the same as a space', t => {
  const arr = [
    ['big\tdog', 'big dog'],
    ['big\t.', 'big .'],
    ['big\t#Noun?', 'big #Noun?'],
    ['#Adjective\n#Noun', '#Adjective #Noun'],
    ['^big\tdog$', '^big dog$'],
    ['[big\tdog]', '[big dog]'],
    ['[<x>big\tdog]', '[<x>big dog]'],
    // beside other tokens
    ['big\t(dog|cat)', 'big (dog|cat)'],
    ['(big|cat)\tdog', '(big|cat) dog'],
    ['/big/\tdog', '/big/ dog'],
    ['big\t/dog/', 'big /dog/'],
    // inside a block
    ['(big\tdog)', '(big dog)'],
    ['(big\tdog|cat)', '(big dog|cat)'],
    ['(big\n  dog|cat)', '(big dog|cat)'],
    ['(big  dog|cat)', '(big dog|cat)'],
    ['(big\tdog && cat)', '(big dog && cat)'],
  ]
  arr.forEach(([str, want]) => {
    t.deepEqual(nlp.parseMatch(str), nlp.parseMatch(want), here + JSON.stringify(str))
  })
  t.end()
})

test(here + 'whitespace in a regex token is left alone', t => {
  const arr = [
    ['/a\tb/ c', ['/a\tb/', 'c']],
    ['c /a\tb/', ['c', '/a\tb/']],
  ]
  arr.forEach(([str, want]) => {
    const got = nlp.parseMatch(str).map(o => (o.regex ? String(o.regex) : o.word))
    t.deepEqual(got, want, here + JSON.stringify(str))
  })
  t.end()
})
