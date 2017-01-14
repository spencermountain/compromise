<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/21955696/46e882d4-da3e-11e6-94a6-720c34e27df7.jpg" />
  <div>natural language processing, actually in the browser</div>
  <a href="https://www.codacy.com/app/spencerkelly86/nlp_compromise">
    <img src="https://api.codacy.com/project/badge/grade/82cc8ebd98b64ed199d7be6021488062" />
  </a>
  <a href="https://npmjs.org/package/compromise">
    <img src="https://img.shields.io/npm/v/compromise.svg?style=flat-square" />
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square" />
  </a>
</div>
<div align="center">
  <sub>
    by
    <a href="https://github.com/spencermountain">Spencer Kelly</a> and
    <a href="https://github.com/nlp-compromise/compromise/graphs/contributors">
      contributors
    </a>
  </sub>
</div>
<div align="center">
  <sub>(formerly nlp_compromise)</sub>
</div>
<div align="center">
  <code>npm install compromise</code>
</div>
<br/>
<div align="center">
  inspect and play with english text.
  <div>
    focus on being <a href="https://github.com/nlp-compromise/compromise/wiki/Justification">handy, and not overly-fancy.</a>
  </div>
</div>
<br/>
<div align="center">
  :boom:Welcome to <b>v7</b>:boom:
  <div>
    <a href="https://github.com/nlp-compromise/compromise/wiki/v7-upgrade-instructions">a lot</a>
    has changed!
  </div>
</div>
```javascript
let r = nlp('I look just like buddy holly.')
  r.sentences().toPastTense()
  r.out('text')
// "I looked just like buddy holly."
```

<div align="center">
  <table align="center">
    <tr align="center">
      <td align="center">
        <b>
          <a href="https://unpkg.com/compromise@latest/builds/compromise.min.js">
            200k
          </a>
        </b>
        <div>
           &nbsp; just a javascript file &nbsp;
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
            &nbsp; on the Penn treebank &nbsp;
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
<h3 align="center">
  <a href="http://nlpcompromise.com">demos</a>
  <span>&nbsp; | &nbsp;</span>
  <a href="https://github.com/nlp-compromise/compromise/wiki/Getting-Started">quickStart</a>
  <span>&nbsp; | &nbsp;</span>
  <a href="https://github.com/nlp-compromise/compromise/wiki/API">docs</a>
  <span>&nbsp; | &nbsp;</span>
  <a href="https://github.com/nlp-compromise/compromise/wiki/Accuracy">accuracy</a>
</h3>
<div align="center">
  <b>no training, configuration, or prolog</b>
</div>
<br/>
<div align="left">
  the idea is, you can
  <b>
    <a href="https://github.com/nlp-compromise/compromise/wiki/Match-syntax">
      reach-in
    </a>
  </b> to a part of the text, and change it:
</div>
```javascript
r = nlp('john is really nice. sara sings loudly.')

r.match('#Person').toUpperCase()
//JOHN is really nice. SARA sings loudly.

//or pluck-out some parts,
r.remove('#Adverb')
// "JOHN is nice. SARA sings."

//replacements,
r.replace('is nice', 'is bad')
// "JOHN is bad. SARA sings."

//fancy!
r.sentences().toNegative()
// "JOHN is not bad. SARA doesn't sing."
```
<div align="left">
  you can also grab those parts, and analyze-the-heck out of them:
</div>
```javascript
r = nlp(chomskyFanFic)
r.places().sort('freq').unique().data()
/*[
  {text: 'MIT lecture hall'},
  {text: '23 Desperado dr.'},
  {text: 'desert island'},
]*/

r.questions().not('^but how .+').data()
/* [] */
```
 <table align="center">
  <tr>
    <td>Part-of-Speech Tagging</td>
    <td>Named-Entity Resolution</td>
    <td>Verb Conjugation</td>
    <td>Inflection/Pluralization</td>
  </tr>
</table>
<div align="center">
  &nbsp; &nbsp; 🤗 &nbsp; &nbsp; 🤗 &nbsp; &nbsp; 🤗 &nbsp; &nbsp; 🤗 &nbsp; &nbsp; 🤗 &nbsp; &nbsp; 🤗 &nbsp; &nbsp; 🤗 &nbsp; &nbsp; 🤗 &nbsp; &nbsp; 🤗 &nbsp; &nbsp; 🤗
</div>
###Client-side
```html
<script src="https://unpkg.com/compromise@latest/builds/compromise.min.js"></script>
<script>
  var r = nlp('dinosaur').nouns().toPlural()
  console.log(r.out('text'))
  //dinosaurs
</script>
```

###Conjugation:
```javascript
let r = nlp('she sells seashells by the seashore.')
r.sentences().toFutureTense().out('text')
//'she will sell seashells...'

r.verbs().conjugate()
// [{ PastTense: 'sold',
//    Infinitive: 'sell',
//    Gerund: 'selling', ...
// }]
```

###Plural/singular:
```javascript
r = nlp('a bottle of beer on the wall.')
r.nouns().first().toPlural()
r.out('text')
//'The bottles of beer on the wall.'
```

###Negation:
```javascript
r = nlp('london is calling')
r.sentences().toNegative()
// 'london is not calling'
```

###Number interpretation:
```javascript
r = nlp('fifth of december')

r.values().toCardinal().out('text')
// 'five of december'

r.values().toNumber().out('text')
// '5 of december'
```

###Clever normalization:
```javascript
r = nlp("the guest-singer's björk at seven thirty.").normalize().out('text')
// 'The guest singer is Bjork at 7:30.'
```

###Named-entity recognition:
```javascript
r = nlp('the opera about richard nixon visiting china')
r.topics().data()
// [
//   { text: 'richard nixon', tags: ['Person'] },
//   { text: 'china', tags: ['Place', 'Country'] }
// ]
```

###Fancy outputs:
```javascript
r = nlp('Tony Hawk won').out('html')
/*
<span>
  <span class="Person Noun MalePerson">Tony Hawk</span>
  <span>&nbsp;</span>
  <span class="Verb PastTense">won</span>
</span>
*/
```
<h3 align="center">
  and yes, ofcourse, there's <a href="https://github.com/nlp-compromise/compromise/wiki/API">a lot more stuff</a>.
</h3>

<b>Join in!</b>
<div align="left">
  we're fun, we're using <b>semver</b>, and moving fast.
  <i>
    <a href="https://github.com/nlp-compromise/compromise/wiki/Contributing">
     :hammer_and_wrench: get involved :dancer:
    </a>
  </i>
</div>

<table>
  <tr align="center">
    <td>
      <a href="https://www.twitter.com/compromisejs">
        <img src="https://cloud.githubusercontent.com/assets/399657/21956672/a30cf206-da53-11e6-8c6c-0995cf2aef62.jpg"/>
        <div>&nbsp; &nbsp; &nbsp; Twitter &nbsp; &nbsp; &nbsp; </div>
      </a>
    </td>
    <td>
      <a href="http://superscript-slackin.herokuapp.com/">
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
      <a href="https://github.com/nlp-compromise/compromise/wiki/Contributing">
        <img src="https://cloud.githubusercontent.com/assets/399657/21956742/5985a89c-da55-11e6-87bc-4f0f1549d202.jpg"/>
        <div>&nbsp; &nbsp; &nbsp; Pull-requests &nbsp; &nbsp; &nbsp; </div>
      </a>
    </td>
  </tr>
</table>

<br/>

<div align="center">
  <a href="https://www.youtube.com/watch?v=tk_JGu2AbJY">
    <img src="http://img.youtube.com/vi/tk_JGu2AbJY/mqdefault.jpg"/>
  </a>
  <span> &nbsp; </span>
  <a href="https://www.youtube.com/watch?v=WuPVS2tCg8s">
    <img src="http://img.youtube.com/vi/WuPVS2tCg8s/mqdefault.jpg"/>
  </a>
</div>

###Don't forget about:
* **[naturalNode](https://github.com/NaturalNode/natural)** - decidedly fancier, statistical nlp in javascript, too
* **[SuperScript](http://superscriptjs.com/)** - clever conversation engine in js
* **[NodeBox Linguistics](https://www.nodebox.net/code/index.php/Linguistics)** - conjugation, inflection in javascript
* **[reText](https://github.com/wooorm/retext)** - very impressive [text utilities](https://github.com/wooorm/retext/blob/master/doc/plugins.md) in javascript
* **[jsPos](https://code.google.com/archive/p/jspos/)** - js-build of the time-tested Brill-tagger
* **[spaCy](https://spacy.io/)** - speedy, multilingual tagger in C/python

For the former promise-library, see [jnewman/compromise](https://github.com/jnewman/compromise)
(Thanks [Joshua](https://github.com/jnewman)!)

<div align="right">
(also don't forget
<a href="http://www.nltk.org/">NLTK</a>,
<a href="https://gate.ac.uk">GATE</a>,
<a href="http://nlp.stanford.edu/software/lex-parser.shtml">Stanford</a>,
and
<a href="http://cogcomp.cs.illinois.edu/page/software/">Illinois toolkit</a>
)
❤️️
</div>
