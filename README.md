<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/21955696/46e882d4-da3e-11e6-94a6-720c34e27df7.jpg" />
</div>
<div align="center">
  <a href="https://www.codacy.com/app/spencerkelly86/nlp_compromise">
    <img src="https://api.codacy.com/project/badge/grade/82cc8ebd98b64ed199d7be6021488062" />
  </a>
  <a href="https://npmjs.org/package/compromise">
    <img src="https://img.shields.io/npm/v/compromise.svg?style=flat-square" />
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-green.svg?style=flat-square" />
  </a>
  <a href="https://www.codacy.com/app/spencerkelly86/nlp_compromise">
    <img src="https://api.codacy.com/project/badge/Coverage/82cc8ebd98b64ed199d7be6021488062" />
  </a>
  <div>natural language processing, actually in the browser</div>
  <sub>
    by
    <a href="https://github.com/spencermountain">Spencer Kelly</a> and
    <a href="https://github.com/nlp-compromise/compromise/graphs/contributors">
      contributors
    </a>
  </sub>
</div>
<br/>

```javascript
var nlp = require('compromise')

nlp('Wee-ooh, I look just like buddy holly.').sentences().toPastTense()
// 'Wee-ooh, I looked just like buddy holly.'

nlp('..then consider me Miles Davis!').people().out('freq')
// [{ text:'Miles Davis', count:1 }]
```

<div align="center">
  <table align="center">
    <tr align="center">
      <td align="center">
        <b>
          <a href="https://unpkg.com/compromise@latest/builds/compromise.min.js">
            210k
          </a>
        </b>
        <div>
           &nbsp; &nbsp; one javascript file &nbsp; &nbsp;
        </div>
      </td>
      <td align="center">
        <div>
          <b>
            <a href="https://github.com/nlp-compromise/compromise/wiki/Accuracy">
              86%
            </a>
          </b>
          <div>
            &nbsp; &nbsp; on the Penn treebank &nbsp; &nbsp;
         </div>
      </td>
      <td align="center">
        <b>🙏</b>
        <div>
          &nbsp; <code>npm install compromise</code> &nbsp;
        </div>
      </td>
      <td align="center">
        <b>IE9+</b>
        <div>
           &nbsp; &nbsp;  caniuse, youbetcha &nbsp;  &nbsp;
        </div>
      </td>
    </tr>
  </table>
</div>

<div align="center">
  <sub>with <a href="https://github.com/nlp-compromise/compromise/wiki/Justification">deliberate, rule-based</a> nlp,</sub>
  <br/>
  <b>compromise</b> makes working with text easy
</div>
<h6 align="center">
  no jargon, &nbsp; | &nbsp; no config, &nbsp; | &nbsp; no training
</h6>
<div align="right">
  <sub><i>🙌 you can do it!</i></sub>
</div>
<table>
  <tr>
    <td>
      <a href="https://nlp-expo.firebaseapp.com/expo/show-all-the-nouns-760733">
         Part-of-Speech tags
      </a>
    </td>
    <td>
      <sub><i>nouns, verbs, adjectives..</i></sub>
    </td>
    <td>
      <a href="https://nlp-expo.firebaseapp.com/expo/change-sentence-tense-203483">
         Verb conjugation
      </a>
    </td>
    <td>
      <sub><i>change tense of a verb or sentence</i></sub>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://nlp-expo.firebaseapp.com/expo/parse-all-the-numbers-278986">
         Number parsing
      </a>
    </td>
    <td>
      <sub><i>'seven hundred and fifty' -> 750</i></sub>
    </td>
    <td>
      <a href="https://nlp-expo.firebaseapp.com/expo/named-entity-recognition-208197">
         Named-entities
      </a>
    </td>
    <td>
      <sub><i>the people, places, orgs..</i></sub>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://nlp-expo.firebaseapp.com/expo/custom-pos-tagging-161281">
         Template-matches
      </a>
    </td>
    <td>
      <sub><i>match natural-language forms</i></sub>
    </td>
    <td>
      <a href="https://github.com/nlp-compromise/compromise/wiki/Usage#normalization">
         Text cleanup
      </a>
    </td>
    <td>
      <sub><i>contractions, hyphenation, punctuation</i></sub>
    </td>
  </tr>
</table>

<h3 align="center">
  <a href="http://compromise.cool/docs">API docs</a>
  &nbsp; | &nbsp;
  <a href="http://compromise.cool/demos">Demos</a>
</h3>

#### Client-side!
```html
<script src="https://unpkg.com/compromise@latest/builds/compromise.min.js"></script>
<script>
  var doc = nlp('dinosaur')

  var str = doc.nouns().toPlural().out('text')
  console.log(str)
  // 'dinosaurs'
</script>
```

#### 🌋 Server-side!
```javascript
var nlp = require('compromise')

var doc = nlp('London is calling')
doc.sentences().toNegative()
// 'London is not calling'
```

## Grab some words,
you can use [pre-defined selections](https://github.com/nlp-compromise/compromise/wiki/Usage#subset-methods) (like **.nouns()**) or grab any pattern with [.match()](https://github.com/nlp-compromise/compromise/wiki/Match-syntax)
```js
doc = nlp('Ludwig van Beethoven wrote to Josephine Brunsvik')

doc.people().out('list')
// ['ludwig van beethoven', 'josephine brunsvik']

doc.match('#TitleCase van #LastName').out()
// 'Ludwig van Beethoven'

doc.match('#PastTense to').hyphenate().out()
// 'wrote-to'
```

### Plural/singular:
grab the noun-phrases, make em plural:
```javascript
doc = nlp('a bottle of beer on the wall.')
doc.nouns().first().toPlural()
doc.out('text')
//'The bottles of beer on the wall.'
```

### Number parsing:
parse written-out numbers, and change their form:
```javascript
doc = nlp('ninety five thousand and fifty two')
doc.values().toNumber().out('text')
// '95052'

doc = nlp('the 23rd of December')
doc.values().add(2).toText()
doc.out('text')
// 'the twenty fifth of December'
```

### Normalization:
handle the craziness:
```javascript
doc = nlp("the guest-singer's björk   at seven thirty.").normalize().out('text')
// 'The guest singer is Bjork at 7:30.'
```

### Tense:
_all your base are belong:_
```javascript
let doc = nlp('she sells seashells by the seashore.')
doc.sentences().toFutureTense().out('text')
//'she will sell seashells...'

doc.verbs().conjugate()
// [{ PastTense: 'sold',
//    Infinitive: 'sell',
//    Gerund: 'selling', ...
// }]
```

### Named-entities:
get the people, places, organizations:
```javascript
doc = nlp('that opera about richard nixon visiting china')
doc.topics().data()
// [
//   { text: 'richard nixon' },
//   { text: 'china' }
// ]
```

### Error correction:
make it say what you'd like:
```javascript
var lexicon={
  'boston': 'MusicalGroup'
}
doc = nlp('i heard Boston\'s set in Chicago', lexicon)
doc.match('#MusicalGroup').length
// 1

//alternatively, fix it all 'in-post':
doc.match('heard #Possessive set').terms(1).tag('MusicalGroup')
doc.match('#MusicalGroup').length
// 1
```

### Handy outputs:
get sensible data:
```javascript
doc = nlp('We like Roy! We like Roy!').sentences().out('array')
// ['We like Roy!', 'We like Roy!']

doc = nlp('Tony Hawk').out('html')
/*
<span>
  <span class="nl-Person nl-FirstName">Tony</span>
  <span>&nbsp;</span>
  <span class="nl-Person nl-LastName">Hawk</span>
</span>
*/
```
<h3 align="center">
  and yes, ofcourse, there's <a href="http://compromise.cool/demos">a lot more stuff</a>.
</h3>
<h4 align="center">
  <b>Join in -</b>
  we're fun, using <b>semver</b>, and moving fast.
  <a href="https://github.com/nlp-compromise/compromise/wiki">get involved</a>
</h4>

<table>
  <tr align="center">
    <td>
      <a href="https://www.twitter.com/compromisejs">
        <img src="https://cloud.githubusercontent.com/assets/399657/21956672/a30cf206-da53-11e6-8c6c-0995cf2aef62.jpg"/>
        <div>&nbsp; &nbsp; &nbsp; Twitter &nbsp; &nbsp; &nbsp; </div>
      </a>
    </td>
    <td>
      <a href="http://slack.compromise.cool/">
        <img src="https://cloud.githubusercontent.com/assets/399657/21956671/a30cbc82-da53-11e6-82d6-aaaaebc0bc93.jpg"/>
        <div>&nbsp; &nbsp; &nbsp; Slack group &nbsp; &nbsp; &nbsp; </div>
      </a>
    </td>
    <td>
      <a href="http://nlpcompromise.us12.list-manage2.com/subscribe?u=d5bd9bcc36c4bef0fd5f6e75f&id=8738c1f5ef">
        <img src="https://cloud.githubusercontent.com/assets/399657/21956670/a30be6e0-da53-11e6-9aaf-52a10b8c3195.jpg"/>
        <div>&nbsp; &nbsp; &nbsp; Mailing-list &nbsp; &nbsp; &nbsp; </div>
      </a>
    </td>
    <td>
      <a href="https://github.com/nlp-compromise/nlp_compromise/wiki/Downstream-projects">
        <img src="https://cloud.githubusercontent.com/assets/399657/26513481/a755ac38-4239-11e7-960a-1c26d85ddc1c.png"/>
        <div>&nbsp; &nbsp; &nbsp; Applications &nbsp; &nbsp; &nbsp; </div>
      </a>
    </td>
    <td>
      <a href="https://github.com/nlp-compromise/compromise/wiki/Contributing">
        <img src="https://cloud.githubusercontent.com/assets/399657/21956742/5985a89c-da55-11e6-87bc-4f0f1549d202.jpg"/>
        <div>&nbsp; &nbsp; &nbsp; Pull-requests &nbsp; &nbsp; &nbsp; </div>
      </a>
    </td>
  </tr>
</table>

<div align="left">
  <a href="https://www.youtube.com/watch?v=WuPVS2tCg8s">
    <img src="http://img.youtube.com/vi/WuPVS2tCg8s/mqdefault.jpg"/>
  </a>
  <a href="https://www.youtube.com/watch?v=c_hmwFwvO0U">
    <img src="https://user-images.githubusercontent.com/399657/27890263-88e1fd10-61bf-11e7-93f2-745167f88d58.png"/>
  </a>
</div>

### Don't forget about:
* ✨ &nbsp; **[naturalNode](https://github.com/NaturalNode/natural)** - decidedly fancier, statistical nlp in javascript
* 🍭 &nbsp; **[SuperScript](http://superscriptjs.com/)** - clever conversation engine in js
* 💗 &nbsp; **[NodeBox Linguistics](https://www.nodebox.net/code/index.php/Linguistics)** - conjugation, inflection in javascript
* 🎀 &nbsp; **[reText](https://github.com/wooorm/retext)** - very impressive [text utilities](https://github.com/wooorm/retext/blob/master/doc/plugins.md) in javascript
* 💎 &nbsp; **[jsPos](https://code.google.com/archive/p/jspos/)** - javascript build of the time-tested Brill-tagger
* 🚗 &nbsp; **[spaCy](https://spacy.io/)** - speedy, multilingual tagger in C/python

For the former promise-library, see [jnewman/compromise](https://github.com/jnewman/compromise)
(Thanks [Joshua](https://github.com/jnewman)!)

<div align="right">
(also don't forget 🙇
<a href="http://www.nltk.org/">NLTK</a>,
<a href="https://gate.ac.uk">GATE</a>,
<a href="http://nlp.stanford.edu/software/lex-parser.shtml">Stanford</a>,
and
<a href="http://cogcomp.cs.illinois.edu/page/software/">Illinois toolkit</a>
🙇
)
</div>
