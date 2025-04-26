import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/html] '

test('html-match', function (t) {
  let doc = nlp(`match one two. one match two. one two match.`)
  let html = doc.html({ i: 'match' })
  t.equal(html, `<i>match</i> one two. one <i>match</i> two. one two <i>match</i>.`, here + 'html tag')

  doc = nlp(`match one two. one match two.`)
  html = doc.html({ '.foo': 'match' })
  t.equal(html, `<span class="foo">match</span> one two. one <span class="foo">match</span> two.`, here + 'html class')

  doc = nlp(`one match match two.`)
  html = doc.html({ '#foo': 'match+' })
  t.equal(html, `one <span id="foo">match match</span> two.`, here + 'html id')

  doc = nlp(`one match two.`)
  html = doc.html({ '.red': 'match+', '.blue': doc.match('two') })
  t.equal(html, `one <span class="red">match</span> <span class="blue">two</span>.`, here + 'html two classes')

  doc = nlp(`if i can recall, my grey dog loves pizza crusts (they are really good).`)
  html = doc.html({ '.red': 'my grey dog', '.blue': doc.match('loves') })
  t.equal(
    html,
    `if i can recall, <span class="red">my grey dog</span> <span class="blue">loves</span> pizza crusts (they are really good).`,
    here + 'html pre test'
  )

  t.end()
})

test('html-nest', function (t) {
  const doc = nlp(`one match two.`)
  let html = doc.html({
    i: 'match',
    b: 'one match two',
  })
  t.equal(html, `<b>one <i>match</i> two</b>.`, here + 'easy nest')

  html = doc.html({
    b: 'match two',
    i: 'match',
  })
  t.equal(html, `one <b><i>match</i> two</b>.`, here + 'hard nest')

  // html = doc.html({
  //   i: 'match',
  //   b: 'match two',
  // })
  // t.equal(html, `one <b><i>match</i> two</b>.`, here + 'harder nest')

  t.end()
})

test('html-implicit', function (t) {
  const doc = nlp(`he's cool`)
  const out = doc.html({ '.foo': '#Verb' })
  t.equal(out, `he's cool`, here + 'implict')
  t.end()
})
