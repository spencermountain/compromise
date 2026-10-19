import test from 'tape'
import nlp from '../../../src/three.js'
import html from './_plugin.js'

nlp.plugin(html)

test('html - serialization leaves core highlighting available', t => {
  const ordinary = nlp('She walks home.')
  t.equal(ordinary.html({ strong: '#Verb' }), 'She <strong>walks</strong> home.', 'ordinary documents retain core highlighting')
  const doc = nlp.fromHtml('She <em>walks</em> home.')
  t.equal(doc.html({ strong: '#Verb' }), 'She <strong>walks</strong> home.', 'bound documents retain core highlighting')
  t.equal(doc.toHtml(), 'She <em>walks</em> home.', 'serializer preserves source markup separately')
  t.end()
})
