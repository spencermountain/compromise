<div align="center">
  <div><b>compromise-subtitle</b></div>
  <div>paragraph support for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  <div><code>npm install compromise-subtitle</code></div>
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
    <a href="https://npmjs.org/package/compromise-subtitle">
    <img src="https://img.shields.io/npm/v/compromise-subtitle.svg?style=flat-square" />
  </a>
  <a href="https://bundlephobia.com/result?p=compromise-subtitle">
    <img src="https://badgen.net/bundlejs/min/compromise-subtitle" />
  </a>
  </div>
</div>
<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

Parse and inspect `.vtt` subtitle files using [vttpeg](https://github.com/spencermountain/vttpeg) and interpret the plain text using compromise.

It's possible to cleanly match, and safely transform the text in a subtitle file, then produce a valid modified output file.

### Usage:

```js
import nlp from '../../src/three.js'
import mdPlugin from './src/plugin.js'
nlp.plugin(mdPlugin)

const text = `WEBVTT

02:09.240 --> 02:11.150
You'll never believe this, sir.

02:11.279 --> 02:13.076
We have to visit a brewery.
`

const doc = nlp.fromSubtitle(text)
doc.match('visit a #Noun').debug()
// │ 'visit'    - Verb, PresentTense, Infinitive
// │ 'a'        - Determiner
// │ 'brewery'  - Noun, Singular

// modify the document
doc.contractions().expand()
doc.match('brewery').replaceWith('pub')

// output valid .vtt subtitle
const out = doc.toSubtitle()
console.log(out)
// WEBVTT
//
// 02:09.240 --> 02:11.150
// You will never believe this, sir.
//
// 02:11.279 --> 02:13.076
// We have to visit a pub.
```

Work in progress!

PRs welcome!

MIT
