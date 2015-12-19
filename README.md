### Natural Language Processing in the browser
[![npm version](https://badge.fury.io/js/nlp_compromise.svg)](https://www.npmjs.com/package/nlp_compromise)
[![downloads](https://img.shields.io/npm/dm/nlp_compromise.svg)](https://www.npmjs.com/package/nlp_compromise)
[![CodacyBadge](https://api.codacy.com/project/badge/grade/82cc8ebd98b64ed199d7be6021488062)](https://www.codacy.com/app/spencerkelly86/nlp_compromise)
### Yup,
* smaller than jQuery *(100k)*
* 86% on the [Penn treebank](http://www.cis.upenn.edu/~treebank/)
* keypress speed, constant-time
* no dependencies, training, or configuration
* caniuse, yup. IE9+

It's a [rule-based, use-focused, and satisfactory](https://github.com/spencermountain/nlp_compromise/blob/2.0/docs/docs.md) javascript library for understanding and changing written english
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**[Check it out](http://rawgit.com/spencermountain/nlp_compromise/2.0/demos/conjugation/index.html)**

<h6>&nbsp;&nbsp;&nbsp;:boom: Welcome to <a href="https://github.com/spencermountain/nlp_compromise/blob/2.0/docs/changelog.md">v2.0!</a> Please <a href="https://github.com/spencermountain/nlp_compromise/issues">file an issue</a> if you find something :boom:</h6>

## Off you go:
> `npm install nlp_compromise`

> `<script src="./builds/nlp_compromise.es5.min.js"> </script>`

```javascript
const nlp = require("nlp_compromise");

nlp.Text('She sells seashells').to_past()
// She sold seashells

nlp.Text("She sells seashells").negate()
// She didn't sell seashells

nlp.Text("hamburger").syllables();
// [ 'ham', 'bur', 'ger' ]

nlp.Verb("spoke").to_present();
// "speak"

nlp.Noun("dinosaur").pluralize();
// "dinosaurs"

nlp.Person("Tony Hawk").article();
// "he"

nlp.Value("five hundred and sixty").number;
// 560

nlp.Text("Tony Danza did a backflip").people();
// "Tony Danza"
```

### [View the Full API Documentation](https://github.com/spencermountain/nlp_compromise/blob/2.0/docs/api.md)

##Development
[![slack](https://img.shields.io/badge/slack-superscriptjs-brightgreen.svg)](http://superscriptjs.slack.com/messages/nlp_compromise/)
[Contribution](https://github.com/spencermountain/nlp_compromise/blob/2.0/docs/development.md)

* [Changelog](https://github.com/spencermountain/nlp_compromise/blob/2.0/docs/changelog.md)
[![Issue Stats](http://issuestats.com/github/spencermountain/nlp_compromise/badge/pr)](http://issuestats.com/github/spencermountain/nlp_compromise)
[![Issue Stats](http://issuestats.com/github/spencermountain/nlp_compromise/badge/issue)](http://issuestats.com/github/spencermountain/nlp_compromise)


[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

