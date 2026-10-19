import test from 'tape'
import nlp from '../../../src/three.js'
import html from './_plugin.js'
import markdown from '../../markdown/src/plugin.js'

test('html and markdown - either registration order', t => {
  ;[[html, markdown], [markdown, html]].forEach(plugins => {
    nlp.plugin(plugins)
    const htmlDoc = nlp.fromHtml('<p>She walks.</p>')
    const mdDoc = nlp.fromMarkdown('She **walks**.')
    htmlDoc.verbs().toPastTense()
    mdDoc.verbs().toPastTense()
    htmlDoc.updateHast()
    mdDoc.updateTree()
    t.equal(htmlDoc.html(), '<p>She walked.</p>', 'HTML write-back works')
    t.equal(mdDoc.markdown().trim(), 'She **walked**.', 'Markdown write-back works')
    const hast = { type: 'root', children: [{ type: 'element', tagName: 'p', properties: {}, children: [{ type: 'text', value: 'Hello.' }] }] }
    const mdast = { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Hello.' }] }] }
    t.equal(nlp.fromHast(hast).html(), '<p>Hello.</p>', 'reads HAST')
    t.equal(nlp.fromMdast(mdast).markdown().trim(), 'Hello.', 'reads mdast')
    const plain = { type: 'root', children: [{ type: 'text', value: 'Hello.' }] }
    t.equal(nlp.fromHast(plain).html(), 'Hello.', 'reads text-only HAST without format detection')
  })
  t.end()
})
