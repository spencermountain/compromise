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
  <a href="https://www.codacy.com/app/spencerkelly86/nlp_compromise">
    <img src="https://api.codacy.com/project/badge/Coverage/82cc8ebd98b64ed199d7be6021488062" />
  </a>
  <div>modest natural-language processing in javascript</div>
  <sub>
    by
    <a href="https://github.com/spencermountain">Spencer Kelly</a> and
    <a href="https://github.com/spencermountain/compromise/graphs/contributors">
      many contributors
    </a>
  </sub>
</div>
<br/>

<!-- small enough for the browser... -->
<img src="https://user-images.githubusercontent.com/399657/35828705-828fd2ca-0a8e-11e8-9f12-88e840b8b399.png" />

<!-- two gifs -->
<table align="center">
  <tr>
    <td>
      <a href="http://compromise.cool">
        <img width="390" src="https://user-images.githubusercontent.com/399657/35871664-cdab2bca-0b32-11e8-8827-81de658216fa.gif" />
      </a>
    </td>
    <td>
      <a href="http://compromise.cool">
        <img width="390" src="https://user-images.githubusercontent.com/399657/35871669-d05e8d26-0b32-11e8-99c6-0f8887ae40ea.gif" />
      </a>
    </td>  
  </tr>
</table>

save yourself from **regex-whackamole**🤞:
```js
nlp(entireNovel).sentences().if('the #Adjective of times').out()
// "it was the blurst of times??"
```

move things around:
```js
nlp('she sells seashells by the seashore.').sentences().toFutureTense().out()
// 'she will sell seashells...'
```
respond to text input:
```js
if( doc.has('^simon says (shoot|fire) #Determiner lazer') ){
  fireLazer()
} else {
  dontFire()
}
```

<div align="center">
  compromise is not <a href="https://github.com/spencermountain/compromise/wiki/Justification">the cleverest</a>.
  <br/>
  but it is
  <a href="https://beta.observablehq.com/@spencermountain/compromise-filesize">small,
  <a href="https://beta.observablehq.com/@spencermountain/compromise-performance">quick</a>,
  and <a href="https://beta.observablehq.com/@spencermountain/compromise-accuracy">good-enough</a> for a bunch of stuff.
</div>

----

<!-- three-table section -->
<div align="center">
  <table align="center">
    <tr align="center">
      <td align="center">
        <b>
          &lt;script src&gt;
        </b>
        <div>
           &nbsp; &nbsp; &nbsp; &nbsp; <a href="https://github.com/spencermountain/compromise/wiki/QuickStart">one javascript file</a> &nbsp; &nbsp; &nbsp; &nbsp;
        </div>
      </td>
      <td align="center">
        <b>🙏</b>
        <div>
          &nbsp; &nbsp; <kbd>npm install compromise</kbd> &nbsp; &nbsp;
        </div>
      </td>
      <td align="center">
        <div>
          <b>
            <a href="https://beta.observablehq.com/@spencermountain/compromise-accuracy">
              86%
            </a>
          </b>
          <div>
            &nbsp; &nbsp; on the Penn treebank &nbsp; &nbsp;
         </div>
      </td>
      <td align="center">
        <b>IE9+</b>
        <div>
           &nbsp; &nbsp; &nbsp;  caniuse, youbetcha &nbsp; &nbsp; &nbsp;
        </div>
      </td>
    </tr>
  </table>
</div>

<!-- Install section -->
#### ⚡️ on the Client-side
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


<div align="center">
 Get the hang of things:
</div>
<table align="center">
   <tr>
      <td>
         <div align="center">
            <a href="https://beta.observablehq.com/@spencermountain/tutorial-1">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Tutorial #1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            </a>
         </div>
         <div align="center">
            <sub>Input → output</sub>
         </div>
       </td>
      <td>
         <div align="center">
            <a href="https://beta.observablehq.com/@spencermountain/compromise-tutorial-2">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Tutorial #2 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            </a>
         </div>
         <div align="center">
            <sub>Match & transform</sub>
         </div>
       </td>
      <td>
         <div align="center">
            <a href="https://beta.observablehq.com/@spencermountain/compromise-making-a-bot">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Tutorial #3 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            </a>
         </div>
         <div align="center">
            <sub>Making a bot</sub>
         </div>
       </td>
    </tr>
</table>



<div align="center">
 Detailed docs:
</div>
<table align="center">
   <tr>
      <td>
         <div align="center">
            <a href="https://beta.observablehq.com/@spencermountain/compromise-api">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; API &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            </a>
         </div>
       </td>
      <td>
         <div align="center">
            <a href="https://beta.observablehq.com/@spencermountain/compromise-tags">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Full Tagset &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            </a>
         </div>
       </td>
      <td>
         <div align="center">
            <a href="https://beta.observablehq.com/@spencermountain/compromise-plugins">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Plugins &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            </a>
         </div>
       </td>
      <td>
         <div align="center">
            <a href="https://beta.observablehq.com/@spencermountain/compromise-output">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Outputs &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            </a>
         </div>
       </td>
      <td>
         <div align="center">
            <a href="https://beta.observablehq.com/@spencermountain/compromise-match-syntax">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Match Syntax &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            </a>
         </div>
       </td>
    </tr>
</table>

## Examples:

<table>
   <tr>
      <td>
         <div align="center">
            <a href="https://beta.observablehq.com/@spencermountain/nlp-compromise">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Part-of-Speech tagging &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            </a>
         </div>
         <div align="center">
            <sub>nouns! verbs! adjectives!</sub>
         </div>
      </td>
      <td>
         <div align="center">
            <a href="https://beta.observablehq.com/@spencermountain/topics-named-entity-recognition">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Named-entities &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            </a>
         </div>
         <div align="center">
            <sub>people, places, organizations</sub>
         </div>
      </td>
      <td>
         <div align="center">
            <a href="https://beta.observablehq.com/@spencermountain/compromise-values">
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Number parsing &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            </a>
         </div>
         <div align="center">
            <sub>seven hundred and fifty == 750</sub>
         </div>
      </td>
   </tr>
   <tr>
      <td>
         <div align="center">
            <a href="https://beta.observablehq.com/@spencermountain/tutorial-1">
            &nbsp; &nbsp; &nbsp; &nbsp; Grammar-match &nbsp; &nbsp; &nbsp; &nbsp;
            </a>
         </div>
         <div align="center">
            <sub>like a regex for a sentence</sub>
         </div>
      </td>
      <td>
         <div align="center">
            <a href="https://beta.observablehq.com/@spencermountain/verbs">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Verb conjugation &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            </a>
         </div>
         <div align="center">
            <sub>all your base are belong</sub>
         </div>
      </td>
      <td>
         <div align="center">
            <a href="https://beta.observablehq.com/@spencermountain/compromise-normalization">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Normalization &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            </a>
         </div>
         <div align="center">
            <sub>case, whitespace, contractions..</sub>
         </div>
      </td>
   </tr>
</table>

* <a href="https://beta.observablehq.com/@spencermountain/nouns"><b>Plural/singular:</b></a> - grab the noun-phrases, make em plural:
```js
doc = nlp('a bottle of beer on the wall.')
doc.nouns(0).toPlural()
doc.out('text')
//'The bottles of beer on the wall.'
```

* <a href="https://beta.observablehq.com/@spencermountain/compromise-values"><b>Number parsing:</b></a> - parse written-out numbers, and change their form:
```js
doc = nlp('ninety five thousand and fifty two')
doc.values().toNumber().out()
// '95052'

doc = nlp('the 23rd of December')
doc.values().add(2).toText()
doc.out('text')
// 'the twenty fifth of December'
```

* <a href="https://beta.observablehq.com/@spencermountain/compromise-normalization"><b>Normalization:</b></a> - handle looseness & variety of random text:
```js
doc = nlp("the guest-singer's björk   at seven thirty.").normalize().out('text')
// 'The guest singer is Bjork at 7:30.'
```

* <a href="https://beta.observablehq.com/@spencermountain/verbs"><b>Tense:</b></a> - switch to/from conjugations of any verb
```js
let doc = nlp('she sells seashells by the seashore.')
doc.sentences().toFutureTense().out('text')
//'she will sell seashells...'

doc.verbs().conjugate()
// [{ PastTense: 'sold',
//    Infinitive: 'sell',
//    Gerund: 'selling', ...
// }]
```

* <a href="https://github.com/spencermountain/compromise/wiki/Contractions"><b> Contractions:</b></a> - grab, expand and contract:
```js
doc = nlp("we're not gonna take it, no we ain't gonna take it.")
doc.has('going') // true
doc.match('are not').length // == 2
doc.contractions().expand().out()
//'we are not going to take it, no we are not going to take it'
```

* <a href="https://beta.observablehq.com/@spencermountain/topics-named-entity-recognition"><b> Named-entities:</b></a> - get the people, places, organizations:
```js
doc = nlp('the opera about richard nixon visiting china')
doc.topics().data()
// [
//   { text: 'richard nixon' },
//   { text: 'china' }
// ]
```

* <a href="https://github.com/spencermountain/compromise/wiki/Lexicon"><b>Custom lexicon:</b></a> - make it do what you'd like:
```js
var lexicon={
  'boston': 'MusicalGroup'
}
doc = nlp('i heard Boston\'s set in Chicago', lexicon)

//alternatively, fix it 'in-post':
doc.match('heard #Possessive set').terms(1).tag('MusicalGroup')
```

* <a href="https://beta.observablehq.com/@spencermountain/compromise-output"><b> Handy outputs:</b></a> - get sensible data:
```js
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

<!-- plugins section -->
* <a href="https://beta.observablehq.com/@spencermountain/compromise-plugins"><b> Plugins:</b></a> - allow adding vocabulary, fixing errors, and setting context quickly:
```js
var plugin = {
  tags:{
    Character:{
      isA: 'Noun'
    }
  },
  words:{
    itchy: 'Character',
    scratchy: 'Character'
  }
}
nlp.plugin(plugin)
nlp(`Couldn't Itchy share his pie with Scratchy?`).debug()
/*
   couldn't   - #Modal, #Verb
   itchy      - #Character, #Noun
   share      - #Infinitive, #Verb
   ...
*/
```

<h3 align="center">
  of course, there's <a href="https://beta.observablehq.com/@spencermountain/nlp-compromise">a lot more stuff</a>.
</h3>
<h4 align="center">
  <b>Join in -</b>
  we're fun, using <b>semver</b>, and moving fast:
</h4>

<table>
  <tr align="center">
    <td>
      <a href="https://twitter.com/nlp_compromise">
        <img src="https://cloud.githubusercontent.com/assets/399657/21956672/a30cf206-da53-11e6-8c6c-0995cf2aef62.jpg"/>
        <div>&nbsp; &nbsp; &nbsp; &nbsp; Twitter &nbsp; &nbsp; &nbsp;  &nbsp;</div>
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
      <a href="https://github.com/nlp-compromise/nlp_compromise/wiki/Projects">
        <img src="https://cloud.githubusercontent.com/assets/399657/26513481/a755ac38-4239-11e7-960a-1c26d85ddc1c.png"/>
        <div>&nbsp; &nbsp; &nbsp; &nbsp; Projects &nbsp; &nbsp; &nbsp; &nbsp; </div>
      </a>
    </td>
    <td>
      <a href="https://github.com/spencermountain/compromise/wiki/Contributing">
        <img src="https://cloud.githubusercontent.com/assets/399657/21956742/5985a89c-da55-11e6-87bc-4f0f1549d202.jpg"/>
        <div>&nbsp; &nbsp; &nbsp; Pull-requests &nbsp; &nbsp; &nbsp; </div>
      </a>
    </td>
  </tr>
</table>

<div align="left">
  <a href="https://www.youtube.com/watch?v=WuPVS2tCg8s">
    <img width="300" src="http://img.youtube.com/vi/WuPVS2tCg8s/mqdefault.jpg"/>
  </a>
  <a href="https://www.youtube.com/watch?v=c_hmwFwvO0U">
    <img width="300" src="https://user-images.githubusercontent.com/399657/27890263-88e1fd10-61bf-11e7-93f2-745167f88d58.png"/>
  </a>
</div>

<p></p>
<ul align="left">
  <p>
    <details>
      <summary>☂️ Isn't javascript too...</summary>
      <p></p>
      <ul>
        yeah!
        <br/>
        it wasn't built to compete with the stanford tagger, and may not fit every project.
        <br/>
        string stuff is synchronous too, and parallelizing is weird.
        <br/>
        See <a href="https://beta.observablehq.com/@spencermountain/compromise-performance">here</a> for information about speed & performance, and
        <a href="https://github.com/spencermountain/compromise/wiki/Justification">here></a> for project motivations
      </ul>
      <p></p>
    </details>
  </p>  
  <p>
    <details>
      <summary>💃 Can it run on my arduino-watch?</summary>
      <p></p>
      <ul>
        Only if it's water-proof!
        <br/>
        Read <a href="https://github.com/spencermountain/compromise/wiki/QuickStart">quickStart</a> for all sorts of funny environments.
      </ul>
      <p></p>
    </details>
  </p>
  <p>
    <details>
      <summary>🌎 Other Languages?</summary>
      <p></p>
      <ul>
        okay! <br/>
        we've got work-in-progress forks for <a href="https://github.com/nlp-compromise/de-compromise">German</a> and <a href="https://github.com/nlp-compromise/fr-compromise">French</a>, in the same philosophy.
        <br/>
        Get involved!
      </ul>
      <p></p>
    </details>
  </p>
  <p>
    <details>
      <summary>✨ Partial builds?</summary>
      <p></p>
      <ul>
        compromise is one function so can't really be tree-shaken.
        <br/> .. and the tagging methods are competitive, so it's not recommended to pull things out.
        <br/>
        It's best to load the library fully, given it's smaller than <a href="https://68.media.tumblr.com/tumblr_m674jlpyPT1ry8fquo1_250.gif">this gif</a>.
        <br/>
        A plug-in scheme is in the works.
      </ul>
      <p></p>
    </details>
  </p>
</ul>

<hr/>

### Also:
* &nbsp; **[naturalNode](https://github.com/NaturalNode/natural)** - fancier statistical nlp in javascript
* &nbsp; **[superScript](http://superscriptjs.com/)** - clever conversation engine in js
* &nbsp; **[nodeBox Linguistics](https://www.nodebox.net/code/index.php/Linguistics)** - conjugation, inflection in javascript
* &nbsp; **[reText](https://github.com/wooorm/retext)** - very impressive [text utilities](https://github.com/wooorm/retext/blob/master/doc/plugins.md) in javascript
* &nbsp; **[jsPos](https://code.google.com/archive/p/jspos/)** - javascript build of the time-tested Brill-tagger
* &nbsp; **[spaCy](https://spacy.io/)** - speedy, multilingual tagger in C/python

For the former promise-library, see [jnewman/compromise](https://github.com/jnewman/compromise)
(Thanks [Joshua](https://github.com/jnewman)!)

<div align="right">
(and don't forget 🙇
<a href="http://www.nltk.org/">NLTK</a>,
<a href="https://gate.ac.uk">GATE</a>,
<a href="http://nlp.stanford.edu/software/lex-parser.shtml">Stanford</a>,
and
<a href="http://cogcomp.cs.illinois.edu/page/software/">Illinois</a> libs
)
</div>
