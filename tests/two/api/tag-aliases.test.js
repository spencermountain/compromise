import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/api/tag-aliases] '

test(here + 'plugins add aliases to existing and new tags', t => {
  const model = nlp.world().model.one
  const { tagSet, tagAliases } = model
  t.teardown(() => {
    model.tagSet = tagSet
    model.tagAliases = tagAliases
  })

  const originalAliases = [...tagSet.Noun.aliases]
  const originalSpec = nlp.tokenize('Haus').tag('Noun').out('spec')
  nlp.plugin({
    tags: {
      Noun: { aliases: [...originalAliases, 'Nomen', 'Substantiv'] },
      PluginAnimal: { isA: 'Noun', aliases: [null, 'PluginTier'] },
    },
  })

  const doc = nlp.tokenize('das Haus')
  doc.match('Haus').tag('#Nomen')
  t.equal(doc.match('das #Nomen').text(), 'das Haus', 'localized alias matches')
  t.equal(doc.match('#Substantiv').text(), 'Haus', 'second alias matches')
  t.ok(doc.has('#Noun'), 'alias tags as the canonical name')
  t.ok(doc.has('#NN'), 'existing alias still works')
  const tags = doc.match('Haus').json()[0].terms[0].tags
  t.ok(tags.includes('Noun'), 'stores canonical tag')
  t.notOk(tags.includes('Nomen'), 'does not store alias')
  t.equal(doc.match('Haus').out('spec'), originalSpec, 'preserves spec output preference')

  const animal = nlp.tokenize('Hund').tag('PluginTier')
  t.ok(animal.has('#PluginAnimal'), 'new plugin tag accepts its alias')
  t.ok(animal.has('#Nomen'), 'new tag inherits the existing canonical parent')
  animal.unTag('Substantiv')
  t.notOk(animal.has('#PluginAnimal'), 'removing aliased parent removes child tag')

  const conflicting = nlp.tokenize('walk').tag('Verb')
  conflicting.tagSafe('Nomen')
  t.ok(conflicting.has('#Verb'), 'existing exclusion is preserved')
  t.notOk(conflicting.has('#Noun'), 'safe tagging respects exclusion through alias')
  t.deepEqual(tagSet.Noun.aliases, originalAliases, 'plugin does not mutate prior tag definition')
  t.end()
})
