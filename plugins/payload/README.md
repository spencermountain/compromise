<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>An ad-hoc datastore for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>

  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-payload">
    <img src="https://img.shields.io/npm/v/compromise-payload.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-payload/builds/compromise-payload.min.js">
    <img src="https://img.shields.io/bundlephobia/min/compromise-payload" />
  </a>

  <div align="center">
    <code>npm install compromise-payload</code>
  </div>
</div>

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

This plugin provides a facilty for storing a retreiving more complex data than tags, for compromise documents and matches.

### Payload

```js
import plg from 'compromise-payload'
nlp.extend(plg)

let doc = nlp('i saw John Lennon in Manchester, and Bob Dylan in Southhampton')

// markup metadata
doc.match('(john lennon|bob dylan)').addPayload({ instrument: 'guitar' })

// add more
doc.people().forEach(m => {
  if (m.has('lennon')) {
    m.addPayload({ height: `5'11` })
  }
  if (m.has('ringo')) {
    m.addPayload({ height: `5'8` })
  }
})

// retrieve specific payloads
doc.match('john lennon').getPayloads()
doc.match('bob dylabn').getPayloads()

// retrieve them all
doc.getPayloads()

// inspect given payloads:
doc.debug('payload')
```

You can also pass a callback into `.addPayload()`:

```js
let doc = nlp('i saw John Lennon, and john smith and bob dylan')
doc.people().addPayload(m => {
  return { lastName: m.terms().last().text() }
})
```

You can remove all, or selected payloads with `.clearPayload()`:

```js
doc.match('bob .').clearPayloads()
doc.getPayloads().length // now 2

doc.clearPayloads()
doc.getPayloads().length // now 0
```

### Limitations

Payloads are saved by sentence number and term position, in one store that every document from the same `nlp` shares. That means:

- **Removing a sentence breaks the payloads that come after it.** They move to the wrong sentence, and the last one can go missing. Add payloads after you remove sentences, or add them again. Changing words inside a sentence is fine.

```js
let doc = nlp('One is red. Two is blue. Three is green.')
doc.match('(red|blue|green)').forEach(m => m.addPayload({ color: m.text() }))
doc.remove('two is blue')
doc.getPayloads().map(p => [p.match.text(), p.val.color])
// [['red', 'red'], ['Three is green', 'blue']]
```

- **A new document can see payloads from an older one** at the same sentence and term positions. Call `.clearPayloads()` on a document when you are done with it.

```js
nlp('the red car').match('car').addPayload({ kind: 'vehicle' })
nlp('a blue bike').getPayloads().length // 1, from the first document
```

See [#1188](https://github.com/spencermountain/compromise/issues/1188).

MIT
