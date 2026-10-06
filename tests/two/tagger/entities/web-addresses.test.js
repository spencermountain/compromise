import test from 'tape'
import nlp from '../../_lib.js'
const here = '[two/tagger/entities/web-addresses] '

test(here + 'two/tagger/entities/web-addresses: email and URL recognition', t => {
  for (const text of [
    'alice@example.technology',
    'alice@my-domain.com',
    'first-last@example.com',
    'first.last+news@my-site.co.uk',
  ]) {
    const doc = nlp(`Contact ${text}, please.`)
    t.equal(doc.match('#Email').text('normal'), text, text)
    t.equal(doc.match('#Email').terms().length, 1, 'address stays one term')
  }
  for (const text of [
    'x.io',
    'https://my-site.xyz',
    'https://a-b.example:8080/path?q=yes#part',
    'my-site.com/path',
    'www.a-b.technology',
  ]) {
    t.ok(nlp(text).has('#Url'), text)
  }
  for (const text of [
    'file.completely',
    'notes.internal',
    'http://http://example.com',
    'example.com:abc',
    'name@example',
  ]) {
    t.notOk(nlp(text).has('#Url'), text)
  }
  t.end()
})

test(here + 'two/tagger/entities/web-addresses: addresses retain boundaries and punctuation', t => {
  for (const text of ['alice@example.info', 'First-Last+news@My-Site.COM']) {
    const input = `Email "${text}", please.`
    const doc = nlp(input)
    t.equal(doc.text(), input, 'original text is preserved')
    t.equal(doc.match('#Email').text('normal'), text.toLowerCase(), text)
    t.notOk(doc.match('#Email').has('#Url'), 'email is not classified as a URL')
  }
  for (const text of ['x.io/path', 'x.io?q=yes', 'x.io#section', 'x.io:8080', 'https://my-site.xyz/a-b']) {
    const doc = nlp(`Visit ${text}, please.`)
    t.equal(doc.match('#Url').text('normal'), text, 'complete URL is selected')
    t.equal(doc.match('#Url').terms().length, 1, 'URL stays intact')
  }
  for (const text of ['name@example', 'name@@example.com', 'name@example..com']) {
    t.notOk(nlp(text).has('#Email'), `reject malformed email: ${text}`)
  }
  t.ok(nlp('http:example.com').has('#Url'), 'retain permissive scheme spelling')
  t.ok(nlp('_@_.com').has('#Email'), 'retain permissive underscore domains')
  t.deepEqual(nlp('well-known').terms().out('array'), ['well-', 'known'], 'ordinary hyphens still split')
  t.end()
})
