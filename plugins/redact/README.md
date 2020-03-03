<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-redact">
    <img src="https://img.shields.io/npm/v/compromise-redact.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-redact/builds/compromise-redact.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/redact/builds/compromise-redact.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-redact</code>
</div>

a work-in-progress text anonymization plugin.

**This is not a very secure way to anonymize text.** Please don't use this library for any serious, or unsupervised data anonymization.
It is intended as a tool for low-risk text anonymization, or along-side a human proof-reader.

```js
const nlp = require('compromise')
nlp.extend(require('compromise-dates'))
nlp.extend(require('compromise-redact'))

// create a document
let doc = nlp('i gave John Smith 900£ in December.')

// add options for our redaction
let m = doc.redact({
  dates: '▇',
  organizations: '*',
  places: false, // false means don't redact
  // accept a function for custom redactions
  money: val => {
    let num = val.toNumber()
    // +/- 50
    return num + Math.random() * 100 - 50
  },
  // custom
  people: person => {
    if (person.has('Smith')) {
      return 'Mr. T'
    }
    return person
  },
})
m.debug()
```

### Considerations

compromise-redact requires [compromise-dates](https://observablehq.com/@spencermountain/compromise-dates) to be installed, if you need dates to be redacted.
and [compromise-numbers](https://observablehq.com/@spencermountain/compromise-values) if you want `money` and `numbers` redacted.

if you change the name of a person, their gender may leak by subsequent pronouns.

### See also

- [virustotalop/AnonymizingText](https://github.com/virustotalop/AnonymizingText)

MIT
