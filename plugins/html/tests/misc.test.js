const test = require('tape')
const nlp = require('./_lib')

test('html output', function (t) {
  let doc = nlp('i <3 you')
  t.equal(doc.html(), '<pre><span>i &lt;3 you</span></pre>', 'html escaped')

  doc = nlp('The Children are right to laugh at you, Ralph')
  let str = doc.html({ '#Person+': 'red', '#Money+': 'blue' })
  let want = `<pre><span>The Children are right to laugh at you, </span><span class="red">Ralph</span></pre>`
  t.equal(str, want, 'ralf-example')

  doc = nlp('I gave him $99.50 for the new tyres.')
  str = doc.html({ '#Money+': 'blue' })
  want = `<pre><span>I gave him </span><span class="blue">$99.50 </span><span>for the new tyres.</span></pre>`
  t.equal(str, want, 'money-example')

  t.end()
})
