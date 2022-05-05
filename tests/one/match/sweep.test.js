import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/sweep] '

test('sweep-basic:', function (t) {

  let matches = [
    { match: '2nd quarter of? 2022', tag: 'TimePeriod' },
    { match: '(from|by|before) now', tag: 'FooBar' },
  ]
  let net = nlp.buildNet(matches)

  let doc = nlp(`so good by now. woo hoo before now. in the 2nd quarter 2022`)
  let { view, found } = doc.sweep(net)

  t.equal(view.length, 3, here + 'view has three')
  t.equal(found.length, 3, here + 'found three')

  let m = view.match('#TimePeriod')
  t.equal(m.text(), '2nd quarter 2022', here + 'tag sweep')

  t.equal(found[0].view.text(), 'by now', here + 'found view')

  t.end()
})


test('match-net-basic:', function (t) {
  let matches = [
    { match: 'john c .', tag: 'Actor' },
    { match: 'john foo', tag: 'FooBar' },
    { match: 'john . reilly', tag: 'SecondTag' },
  ]
  let net = nlp.buildNet(matches)

  let doc = nlp(`he was john c reilly`)
  let m = doc.match(net)
  t.equal(m.text(), 'john c reilly', here + 'basic match')
  t.equal(doc.has('(#Actor|#FooBar|#SecondTag)'), false, here + 'match doesnt tag')
  t.equal(m.length, 1, here + 'only one')

  t.end()
})