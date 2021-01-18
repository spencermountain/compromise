<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-penn-tags">
    <img src="https://img.shields.io/npm/v/compromise-penn-tags.svg?style=flat-square" />
  </a>
  v
  <!-- file size -->
  <a href="https://unpkg.com/compromise-penn-tags/builds/compromise-penn-tags.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/penn-tags/builds/compromise-penn-tags.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-penn-tags</code>
</div>

```js
let doc = nlp("pour through a book").pennTags()

```

This plugin is meant to supply a mapping between the standard [Penn Tagset](https://www.ling.upenn.edu/courses/Fall_2003/ling001/penn_treebank_pos.html) and the [custom tagset](https://observablehq.com/@spencermountain/compromise-tags) in compromise.

This lets users evaluate the compromise POS-tagger by comparing it to other libraries or testing data.

Please note that tokenization choices vary considerably between pos-tagger libraries, making this comparison more difficult.

Compromise makes some [unique decisions](https://observablehq.com/@spencermountain/compromise-tokenization) tokenizing [punctuation](https://observablehq.com/@spencermountain/compromise-whitespace) and [contractions](https://observablehq.com/@spencermountain/compromise-contractions).

Unlike most pos-taggers, compromise terms have many tags, including descendent, or assumed tags.

Compromise is also less-confident than most libraries about declaring whether a Noun is a Singular or Plural - if the penn-tag is `NNPS` compromise may return `NNP` instead.

work-in-progress

MIT
