### Natural Language Processing in the browser
[![CodacyBadge](https://api.codacy.com/project/badge/grade/82cc8ebd98b64ed199d7be6021488062)](https://www.codacy.com/app/spencerkelly86/nlp_compromise)
[![npm version](https://badge.fury.io/js/nlp_compromise.svg)](https://www.npmjs.com/package/nlp_compromise)
[![downloads](https://img.shields.io/npm/dm/nlp_compromise.svg)](https://www.npmjs.com/package/nlp_compromise)
### Yup,
* smaller than jQuery *(100k)*
* 86% on the [Penn treebank](http://www.cis.upenn.edu/~treebank/)
* keypress speed, constant-time
* caniuse, yup. IE9+
* no dependencies, training, or configuration

It's a [rule-based, use-focused, and satisfactory](https://github.com/spencermountain/nlp_compromise/blob/2.0/docs/docs.md) javascript library for understanding and changing written english
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**[- Check it out - ](http://rawgit.com/spencermountain/nlp_compromise/2.0/demo/index.html)**

<h6>&nbsp;&nbsp;&nbsp;:boom: Welcome to <a href="https://github.com/spencermountain/nlp_compromise/blob/2.0/docs/changelog.md">v2.0!</a>&nbsp;&nbsp; Please <a href="https://github.com/spencermountain/nlp_compromise/issues">file an issue</a> if you find something :boom:</h6>

## Off you go:
> `npm install nlp_compromise`

> `<script src="./builds/nlp_compromise.es5.min.js"> </script>`

```javascript
let nlp = require("nlp_compromise");

nlp.text("She sells seashells").negate()
// She didn't sell seashells

nlp.text('She sells seashells').to_past()
// She sold seashells

nlp.verb("speak").conjugate();
// { past: 'spoke',
//   infinitive: 'speak',
//   gerund: 'speaking',
//   actor: 'speaker',
//   present: 'speaks',
//   future: 'will speak',
//   perfect: 'have spoken',
//   pluperfect: 'had spoken',
//   future_perfect: 'will have spoken'
// }

nlp.term("hamburger").syllables();
// [ 'ham', 'bur', 'ger' ]

nlp.noun("dinosaur").pluralize();
// "dinosaurs"

nlp.person("Tony Hawk").article();
// "he"

nlp.value("five hundred and sixty").number;
// 560

nlp.term("favourite").americanize()
// favorite

nlp.text("Tony Danza did a kickflip").people();
// "Tony Danza"
```

we've also got a modest, though very ambitious [plugin ecosystem](https://github.com/spencermountain/nlp_compromise/blob/2.0/docs/plugins.md):
```javascript
nlp_compromise.mixin(valley_girl);
t = nlp_compromise.text('it is a cool library.');
t.valley_girl();
// "So basically, it is like, a cool library."
```

### [View the Full API Documentation](https://github.com/spencermountain/nlp_compromise/blob/2.0/docs/api.md)



## Development
[![Issue Stats](http://issuestats.com/github/spencermountain/nlp_compromise/badge/pr)](http://issuestats.com/github/spencermountain/nlp_compromise)
[![Issue Stats](http://issuestats.com/github/spencermountain/nlp_compromise/badge/issue)](http://issuestats.com/github/spencermountain/nlp_compromise)

*nlp_compromise aims to be the best way to work with language in js. This is only done with many hands. Contributions in all forms are appreciated and respected.*

[![slack](https://img.shields.io/badge/slack-superscriptjs-brightgreen.svg)](http://superscriptjs.slack.com/messages/nlp_compromise/)
* [Contributing](https://github.com/spencermountain/nlp_compromise/blob/2.0/docs/development.md)

* [Changelog](https://github.com/spencermountain/nlp_compromise/blob/2.0/docs/changelog.md)


[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

