<div align="center">
  <div><b>compromise-unist</b></div>
  <div>output a Abstract Syntax Tree from <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  <div><code>npm install compromise-unist</code></div>
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
    <a href="https://npmjs.org/package/compromise-unist">
    <img src="https://img.shields.io/npm/v/compromise-unist.svg?style=flat-square" />
  </a>
  <a href="https://bundlephobia.com/result?p=compromise-unist">
    <img src="https://badgen.net/bundlejs/min/compromise-unist" />
  </a>
  </div>
</div>
<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

This plugin allows reading and writing Abstract Syntax Trees in [Unist](https://github.com/syntax-tree/unist)-style [NLCST Format](https://github.com/syntax-tree/nlcst)

```js
import nlp from 'compromise'
import plugin from 'compromise-unist'
nlp.plugin(plugin)

const doc = nlp(`Bernardo: Who's there?`)
const tree = doc.toAst()
/*


*/
```

PRs welcome

MIT
