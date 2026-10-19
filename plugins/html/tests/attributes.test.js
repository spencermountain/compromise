import test from 'tape'
import nlp from '../../../src/three.js'
import html from './_plugin.js'

nlp.plugin(html)

const attributes = [
  { option: 'titleAttribute', attribute: 'title', property: 'title' },
  { option: 'ariaLabel', attribute: 'aria-label', property: 'ariaLabel' },
  { option: 'placeholder', attribute: 'placeholder', property: 'placeholder' },
]

test('html - descriptive attributes are independently opt-in', t => {
  const input = '<input title="Title words" aria-label="Label words" placeholder="Prompt words">'
  t.equal(nlp.fromHtml(input).text(), '', 'all three attributes are excluded by default')
  attributes.forEach(({ option }, i) => {
    const expected = ['Title words', 'Label words', 'Prompt words'][i]
    t.equal(nlp.fromHtml(input, { [option]: true }).text(), expected, `${option} includes only its attribute`)
  })
  t.end()
})

test('html - descriptive attributes write back to their own sources', t => {
  attributes.forEach(({ option, attribute, property }) => {
    const element = { type: 'element', tagName: 'input', properties: { [property]: 'Search articles' }, children: [] }
    const doc = nlp.fromHast({ type: 'root', children: [element] }, { [option]: true })
    doc.match('articles').replaceWith('stories')
    doc.updateHast()
    t.equal(element.properties[property], 'Search stories', `${option} updates the original property`)
    t.equal(doc.toHtml(), `<input ${attribute}="Search stories">`, 'serializes the correct HTML attribute')
    doc.match('stories').replaceWith('recent news')
    doc.updateHast()
    t.equal(element.properties[property], 'Search recent news', 'repeated replacement can grow')
  })
  t.end()
})

test('html - multiple attributes on one element retain separate ownership', t => {
  const input = '<img alt="Sleepy cat" title="Quiet scene" aria-label="Picture description">'
  const doc = nlp.fromHtml(input, { altText: true, titleAttribute: true, ariaLabel: true })
  t.ok(doc.has('Sleepy cat'), 'reads alt text')
  t.ok(doc.has('Quiet scene'), 'reads title')
  t.ok(doc.has('Picture description'), 'reads accessible label')
  t.notOk(doc.has('cat Quiet'), 'attributes are separate prose blocks')
  doc.match('Sleepy').replaceWith('Happy')
  doc.match('Quiet').replaceWith('Sunny')
  doc.match('Picture').replaceWith('Image')
  doc.updateHast()
  t.equal(doc.toHtml(), '<img alt="Happy cat" title="Sunny scene" aria-label="Image description">', 'each edit reaches its own attribute')
  t.end()
})

test('html - attributes respect exclusions and external edits', t => {
  const options = { titleAttribute: true, ariaLabel: true, placeholder: true }
  t.equal(nlp.fromHtml('<input hidden title="Secret" aria-label="Private" placeholder="Hidden">', options).text(), '', 'hidden elements remain excluded')
  t.equal(nlp.fromHtml('<input title="Secret">', { ...options, input: false }).text(), '', 'disabled tags remain excluded')
  attributes.forEach(({ property, option }) => {
    const element = { type: 'element', tagName: 'input', properties: { [property]: 'Original words' }, children: [] }
    const doc = nlp.fromHast(element, { [option]: true })
    element.properties[property] = 'External edit'
    t.throws(() => doc.updateHast(), /changed/, `${option} detects external changes`)
  })
  t.end()
})
