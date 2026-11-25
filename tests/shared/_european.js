// run in a child process - a tokenize-only build, like the i18n libraries start from
import nlp from '../../src/one.js'
import { europeanNumbers, tagSet } from '../../src/shared/index.js'

const str = 'paghi 1.234,56 e 3,5% o 5,30€ a -5 gradi, la 2ª volta, il 12.05.2020'
const out = { before: nlp(str).has('#Value') }
nlp.plugin({ tags: { ...tagSet } })
// a language's own tagger runs first, and its own marks win
nlp.plugin({
  compute: { dates: view => view.match('/^[0-9]+\\.[0-9]+\\.[0-9]+$/').tag('Date') },
  hooks: ['dates'],
})
nlp.plugin(europeanNumbers)
nlp.plugin({ model: { two: { europeanNumbers: { ordinal: '[ºª°]' } } } })

const doc = nlp(str)
out.values = doc.match('#Value').out('array')
out.percent = doc.match('#Percent').out('array')
out.money = doc.match('#Money').out('array')
out.ordinal = doc.match('#Ordinal').out('array')
out.kept = doc.match('#Date').out('array')
const { read, write } = doc.methods.two.europeanNumbers
const locale = doc.model.two.europeanNumbers
out.nums = doc.match('#Value').docs.map(terms => read(terms[0].text, terms[0].pre, locale).num)
// french groups with a space
nlp.plugin({ model: { two: { europeanNumbers: { group: ' ' } } } })
out.french = write(1234.5, { hasComma: true }, nlp.model().two.europeanNumbers)
console.log(JSON.stringify(out))
