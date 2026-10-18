<div align="center">
  <div><b>compromise-payload</b></div>
  <div>An ad-hoc datastore for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  <div><code>npm install compromise-payload</code></div>
  <div align="center">
    <sub>
      by
      <a href="https://github.com/spencermountain">Spencer Kelly</a>
    </sub>
  </div>
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221824-09809d80-ffb8-11e9-9ef0-6ed3574b0ce8.png"/>
</div>
<!--2nd row-->
<div align="center">
  <div>
    <a href="https://npmjs.org/package/compromise-payload">
    <img src="https://img.shields.io/npm/v/compromise-payload.svg?style=flat-square" />
  </a>
  <a href="https://bundlephobia.com/result?p=compromise-payload">
    <img src="https://badgen.net/bundlejs/min/compromise-payload" />
  </a>
  </div>
</div>
<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

This plugin provides a facilty for storing a retreiving more complex data than tags, for compromise documents and matches.

### Usage

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

### Modifications

It's difficult to index payloads to specific parts of a document, because compromise documents [can change](https://observablehq.com/@spencermountain/compromise-mutation). For this reason, we take care to find payloads with stale references, after a document is modified:

```js
// three sentences
let doc = nlp('One is red. Two is blue. Three is green.')
// add payload to each color
doc.match('(red|blue|green)').forEach(m => m.addPayload({ color: m.text() }))

doc.getPayloads().forEach(p => {
  console.log(p.match.text(), p.val.color)
})
// red red
// blue blue
// green green

// remove the sentence
doc.remove('two is blue')

doc.getPayloads().forEach(p => {
  console.log(p.match.text(), p.val.color)
})
// red red
// green green
```

Is it still a heuristic, so you're advised to keep document modifications light while using this plugin.

MIT
