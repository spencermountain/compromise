<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-html">
    <img src="https://img.shields.io/npm/v/compromise-html.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-html/builds/compromise-html.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/html/builds/compromise-html.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-html</code>
</div>

### [Demo](https://observablehq.com/@spencermountain/compromise-html)

```js
const nlp = require('compromise')
nlp.extend(require('compromise-html'))

let doc = nlp('The Children are right to laugh at you, Ralph')

// create a html rendering of the document
doc.html({ '#Person+': 'red', '#Money+': 'blue' })
/*
<pre>
  <span>The Children are right to laugh at you, </span><span class="red">Ralph</span>
</pre>
*/
```

### .html({segments}, {options})

this turns the document into easily-to-display html html.

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

### See also:

- [compromise-highlight](https://github.com/spencermountain/compromise-highlight/)
- [compromise-align](https://github.com/spencermountain/compromise-align)

MIT
