<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-output">
    <img src="https://img.shields.io/npm/v/compromise-output.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-output/builds/compromise-output.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise-output/master/builds/compromise-output.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-output</code>
</div>

### [Demo](https://observablehq.com/@spencermountain/compromise-output)

```js
const nlp = require('compromise')
nlp.extend(require('compromise-output'))

let doc = nlp('The Children are right to laugh at you, Ralph')

// generate an md5 hash for the document
doc.hash()
// 'KD83KH3L2B39_UI3N1X'

// create a html rendering of the document
doc.html({ '#Person+': 'red', '#Money+': 'blue' })
/*
<pre>
  <span>The Children are right to laugh at you, </span><span class="red">Ralph</span>
</pre>
*/
```

### .hash()

this hash function incorporates the term pos-tags, and whitespace, so that tagging or normalizing the document will change the hash.

Md5 is not considered a very-secure hash, so heads-up if you're doing some top-secret work.

It can though, be used successfully to compare two documents, without looping through tags:

```js
let docA = nlp('hello there')
let docB = nlp('hello there')
console.log(docA.hash() === docB.hash())
// true

docB.match('hello').tag('Greeting')
console.log(docA.hash() === docB.hash())
// false
```

if you're looking for insensitivity to punctuation, or case, you can normalize or transform your document before making the hash.

```js
let doc = nlp(`He isn't... working  `)
doc.normalize({
  case: true,
  punctuation: true,
  contractions: true,
})

nlp('he is not working').hash() === doc.hash()
// true
```

### .html({segments}, {options})

this turns the document into easily-to-display html output.

Special html characters within the document get escaped, in a simple way. Be extra careful when rendering untrusted input, against XSS and other forms of sneaky-html. This library is not considered a battle-tested guard against these security vulnerabilities.

```js
let doc = nlp('i <3 you')
doc.html()
// <div>i &lt;3 you</div>
```

you can pass-in a mapping of tags to html classes, so that document metadata can be styled by css.

```js
let doc = nlp('made by Spencer Kelly')
doc.html({
  '#Person+': 'red',
})
// <pre><span>made by </span><span class="red">Spencer Kelly</span></pre>
```

The library uses `.segment()` method, which is [documented here](https://observablehq.com/@spencermountain/compromise-split).

by default, whitespace and punctuation are _outside_ the html tag. This is sometimes awkward, and not-ideal.

the method returns html-strings by default, but the library uses [Jason Miller's htm library](https://github.com/developit/htm) so you can return React Components, or anything:

```js
doc.html(
  {},
  {
    bind: React.createElement,
  }
)
```

MIT
