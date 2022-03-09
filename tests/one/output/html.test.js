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
  t.end()
})

test('html-nest', function (t) {
  let doc = nlp(`one match two.`)
  let html = doc.html(
    { i: 'match' },
    { b: 'match two' },
  )
  t.equal(html, `one <b><i>match</i> two</b>.`, here + 'html nest')

  t.end()
})