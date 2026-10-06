import test from 'tape'
import nlp from '../_lib.js'

test('formal tag aliases', t => {
  const model = nlp.world().model.one
  const { tagSet, tagAliases } = model
  t.teardown(() => {
    model.tagSet = tagSet
    model.tagAliases = tagAliases
  })
  nlp.addTags({ Noun: { aliases: ['Nomen', 'Substantiv'] } })
  const doc = nlp('das haus')
  doc.match('haus').tag('#Nomen')
  t.equal(doc.match('das #Nomen').text(), 'das haus', 'localized match')
  t.equal(doc.match('#Substantiv').text(), doc.match('#Noun').text(), 'multiple names')
  t.equal(doc.match('(#Nomen|#Verb)').text(), doc.match('(#Noun|#Verb)').text(), 'choices')
  t.equal(doc.match('!#Nomen').text(), doc.match('!#Noun').text(), 'negation')
  t.ok(doc.match('haus').json()[0].terms[0].tags.includes('Noun'), 'stores canonical tag')
  t.notOk(doc.match('haus').json()[0].terms[0].tags.includes('Nomen'), 'does not store alias')
  t.ok(nlp('haus').tagSafe('Nomen').has('#Noun'), 'safe tagging')
  t.equal(nlp('house').canBe('#Nomen').text(), nlp('house').canBe('#Noun').text(), 'canBe')
  t.ok(nlp('das haus').tag(['Nomen']).has('#Noun #Noun'), 'array tagging')
  t.ok(nlp('das haus').tag('. Nomen').match('haus').has('#Noun'), 'positional tagging')
  t.equal(doc.match('#nomen').text(), doc.match('#Noun').text(), 'match titlecase shorthand')
  t.ok(nlp('blue').tag('Adj').has('#Adjective'), 'legacy aliases')
  doc.unTag('#Nomen')
  t.notOk(doc.has('#Noun'), 'removal resolves aliases')
  nlp.addTags({ AliasCreature: { isA: 'Noun', aliases: ['AliasTier'] } })
  const animal = nlp('fido').tag('AliasTier')
  t.ok(animal.has('#AliasCreature'), 'custom tag aliases')
  t.ok(animal.has('#Nomen'), 'custom parent preserved')
  nlp.addTags({ AliasOther: {} })
  t.ok(animal.has('#AliasTier'), 'aliases survive later plugins')
  t.ok(nlp('fido').tag('AliasTier').has('#Noun'), 'inheritance survives later plugins')
  t.throws(() => nlp.addTags({ AliasConflict: { aliases: ['AliasTier'] } }), /alias/i, 'reject ambiguous aliases')
  t.ok(animal.has('#AliasTier'), 'failed registration leaves model intact')
  nlp.addTags({ AliasTier: {} })
  t.notOk(animal.has('#AliasTier'), 'real custom tags take precedence')
  t.end()
})
