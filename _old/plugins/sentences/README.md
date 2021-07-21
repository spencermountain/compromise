<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-sentences">
    <img src="https://img.shields.io/npm/v/compromise-sentences.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-sentences/builds/compromise-sentences.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/sentences/builds/compromise-sentences.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-sentences</code>
</div>

```js
const nlp = require('compromise')
nlp.extend(require('compromise-sentences'))

let doc = nlp('Are you shouting boo, or boo-urns? Booo! I was saying boo-urns.')
doc.sentences().length
// 3
```

### [Demo](https://observablehq.com/@spencermountain/compromise-sentences)

### API

- **[.sentences()](#)** - return a sentence class with additional methods
  - **[.sentences().json()](#)** - overloaded output with sentence metadata
  - **[.sentences().subjects()](#)** - return the main noun of each sentence
  - **[.sentences().toPastTense()](#)** - `he walks` -> `he walked`
  - **[.sentences().toPresentTense()](#)** - `he walked` -> `he walks`
  - **[.sentences().toFutureTense()](#)** -- `he walks` -> `he will walk`
  - **[.sentences().toNegative()](#)** - - `he walks` -> `he didn't walk`
  - **[.sentences().toPositive()](#)** - `he doesn't walk` -> `he walks`
  - **[.sentences().isPassive()](#)** - return only sentences with a passive-voice
  - **[.sentences().isQuestion()](#)** - return questions with a `?`
  - **[.sentences().isExclamation()](#)** - return sentences with a `!`
  - **[.sentences().isStatement()](#)** - return sentences without `?` or `!`
  - **[.sentences().prepend()](#)** - smarter prepend that repairs whitespace + titlecasing
  - **[.sentences().append()](#)** - smarter append that repairs sentence punctuation
  - **[.sentences().toExclamation()](#)** - end sentence with a `!`
  - **[.sentences().toQuestion()](#)** - end sentence with a `?`
  - **[.sentences().toStatement()](#)** - end sentence with a `.`
    <!-- - **[.sentences().toContinuous()](#)** - -->

MIT
