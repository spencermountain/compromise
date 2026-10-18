<div align="center">
  <div><b>compromise-speed</b></div>
  <div>nlp performance plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  <div><code>npm install compromise-speed</code></div>
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
    <a href="https://npmjs.org/package/compromise-speed">
    <img src="https://img.shields.io/npm/v/compromise-speed.svg?style=flat-square" />
  </a>
  <a href="https://bundlephobia.com/result?p=compromise-speed">
    <img src="https://badgen.net/bundlejs/min/compromise-speed" />
  </a>
  </div>
</div>
<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### WorkerPool

parse sentences of a large text in parallel:

```js
import { workerPool } from 'compromise-speed'
nlp.extend(workerPool)

let doc = await nlp.workerPool(myNovel, 'the #Adjective of #Noun')
doc.debug() //results
```

you can pass in a [compromise match](https://observablehq.com/@spencermountain/compromise-match-syntax), or a [net](https://observablehq.com/@spencermountain/compromise-sweep):

```js
let net = nlp.buildNet([{ match: 'every single #Noun' }, { match: 'not (a|one) #Noun' }])
let doc = await nlp.workerPool(myNovel, net)
doc.debug() //results
```

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### StreamFile

parse and process a file from your filesystem, without loading it all into memory:

```js
import { streamFile } from 'compromise-speed'
nlp.extend(streamFile)

nlp
  .streamFile('./path/to/file.txt', s => {
    // map fn on each sentence
    return s.if('the #Adjective of times')
  })
  .then(doc => {
    // just the returned matches
    doc.debug()
  })
```

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Keypress

if you are running compromise on every keystroke, it is not necessary to re-parse all sentences, every time.
This plugin will cache any already-parsed sentences, and combine them in-memory, with any changed ones.

it will also un-cache any temporary sentences, to clear-up memory.

```js
import { keyPress } from 'compromise-speed'
nlp.extend(keyPress)

let doc = nlp.keyPress('parsed once. it was the blurst of')
doc = nlp.keyPress('parsed once. it was the blurst of times')
```

---

#### TypeScript:

The speed methods are added to the `nlp` library. Use `SpeedNlp` for the extended
library's type:

```ts
import nlp from 'compromise'
import speed, { type SpeedNlp } from 'compromise-speed'

nlp.extend(speed)
const fast = nlp as SpeedNlp
const doc = await fast.streamFile('./input.txt', chunk => chunk.match('hello'))
```

Named exports (`streamFile`, `workerPool`, `keyPress`, and `lazyParse`) are
individual plugin objects passed to `nlp.extend()`. `lazyParse` installs
`nlp.lazy(text, match)`. For CommonJS, the complete plugin is
`require('compromise-speed').default`.

#### In the browser:

```html
<textarea>Chocolate microscopes? Double guitars?</textarea>
<script src="https://unpkg.com/compromise"></script>
<script src="https://unpkg.com/compromise-speed"></script>
<script defer>
  nlp.plugin(compromiseSpeed.keyPress)
  document.querySelector('textarea').onkeypress = e => {
    let doc = nlp.keyPress(e.target.value)
  }
</script>
```

PRs welcome

MIT
