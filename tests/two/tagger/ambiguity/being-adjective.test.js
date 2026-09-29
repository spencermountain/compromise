import test from 'tape'
import nlp from '../../_lib.js'

test('being keeps adjective complements', t => {
  const phrases = ['she is being cool', 'she was being very cool', 'being cool']
  phrases.forEach(text => {
    const word = nlp(text).match('cool')
    t.ok(word.has('#Adjective'), text)
    t.notOk(word.has('(#Noun|#Verb)'), `${text}: not a noun or verb`)
  })
  t.ok(nlp('she is being watched').match('watched').has('(#PastTense|#Participle)'), 'passive participles remain verbs')
  t.ok(nlp('she is writing thank-you letters').has('(thank && #Noun)'), 'action gerunds still take noun objects')
  t.end()
})
