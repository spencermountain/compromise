#No training, no prolog.
a Natural-Language-Processing library *in javascript*, small-enough for the browser, and quick-enough to run on keypress :two_men_holding_hands:

it does [tons of clever things](https://rawgit.com/spencermountain/nlp_compromise/master/client_side/basic_demo/index.html). it's smaller than jquery, and scores 86% on the [Penn treebank](http://www.cis.upenn.edu/~treebank/).
```javascript
nlp.pos('she sells seashells by the seashore')[0].to_past()
//she sold seashells by the seashore
```

###[Demo](https://rawgit.com/spencermountain/nlp_compromise/master/client_side/long_demo/index.html)

##Justification
If the 80-20 rule works for most things, the ''94-6 rule'' applies when working with language - by [Zipfs law](http://www.businessinsider.com/zipfs-law-and-the-most-common-words-in-english-2013-10):
>The **[top 10 words](http://www.businessinsider.com/zipfs-law-and-the-most-common-words-in-english-2013-10)** account for 25% of used language.

>The **top 100 words** account for 50% of used language.

>The **top 50,000 words** account for 95% of used language.

On the [Penn treebank](http://www.cis.upenn.edu/~treebank/), for example, this is possible:

* using a 1 thousand word lexicon: **45% accuracy**
* ... then falling back to nouns: **70% accuracy**
* ... then some suffix regexes: **74% accuracy**
* ... then some sentence-level postprocessing: **81% accuracy**

The process is to get some curated data, find the patterns, list the exceptions. Bada bing, bada boom.
In this way a satisfactory NLP library can be built with breathtaking lightness.

Namely, it can be run right on the user's computer instead of a server.

## Client-side
```javascript
<script src="https://rawgit.com/spencermountain/nlp_compromise/master/client_side/nlp.min.js"> </script>
<script>
  nlp.noun("dinosaur").pluralize()
  //dinosaurs
</script>
```

## Server-side
```javascript
$ npm install nlp_compromise

nlp = require("nlp_compromise")
nlp.syllables("hamburger")
//[ 'ham', 'bur', 'ger' ]
```

## API
noun methods:
```javascript
nlp.noun("earthquakes").singularize()
//earthquake

nlp.noun("earthquake").pluralize()
//earthquakes

nlp.noun('veggie burger').is_plural
//false

nlp.noun('hour').article()
//an
```
verbs methods:
```javascript
nlp.verb("walked").conjugate()
//{ infinitive: 'walk',
//  present: 'walks',
//  past: 'walked',
//  gerund: 'walking'}
nlp.verb('swimming').to_past()
//swam
```
adjective methods:
```javascript
nlp.adjective("quick").conjugate()
//  { comparative: 'quicker',
//    superlative: 'quickest',
//    adverb: 'quickly',
//    noun: 'quickness'}
```
adverb methods
```javascript
nlp.adverb("quickly").conjugate()
//  { adjective: 'quick'}
```

## Part-of-speech tagging
86% on the [Penn treebank](http://www.cis.upenn.edu/~treebank/)
```javascript
nlp.pos("Tony walked quickly to the store.")
// ["NN","VBD","RB","TO","DT","NN"]

nlp.pos("the obviously good swim")
//["DT", "RB", "JJ", "NN"]
```

## Named-Entity recognition
```javascript
nlp.spot("Tony walked quickly to the store.")
// ["Tony Hawk", "store"]
nlp.spot("joe carter loves toronto")
// ["joe carter", "toronto"]
```

## Sentence segmentation
1.7k
```javascript
nlp.sentences("Hi Dr. Miller the price is 4.59 for the U.C.L.A. Ph.Ds.").length
//1

nlp.tokenize("she sells sea-shells").length
//3
```

## Syllable hyphenization
70% on the [moby hyphenization corpus](http://www.gutenberg.org/dirs/etext02/mhyph10.zip)  0.5k
```javascript
nlp.syllables("hamburger")
//[ 'ham', 'bur', 'ger' ]
```

## US-UK Localization
```javascript
nlp.americanize("favourite")
//favorite
nlp.britishize("synthesized")
//synthesised
```
## N-gram
```javascript
str= "She sells seashells by the seashore. The shells she sells are surely seashells."
nlp.ngram(str, {min_count:1, max_size:5})
// [{ word: 'she sells', count: 2, size: 2 },
// ...
options.min_count // throws away seldom-repeated grams. defaults to 1
options.max_gram // prevents the result from becoming gigantic. defaults to 5
```
<!--
### Date parsing
```javascript
nlp.dates("I married April for the 2nd time on June 5th 1998 ")
// { text: 'June 5th 1998',
//   from: { year: '1998', month: '06', day: '05' },
//   to: {} }
```
### Number parsing
```javascript
nlp.to_number("two thousand five hundred and sixty")
//2560
nlp.to_number("ten and a half million")
//15000000
``` -->
### Unicode Normalisation
a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
```javascript
nlp.normalise("Björk")
//Bjork
```
and for fun,
```javascript
nlp.denormalise("The quick brown fox jumps over the lazy dog", {percentage:50})
// The ɋӈїck brown fox juӎÞs over tӊe laζy dog
```

### Details
#### Tags
```javascript
  "verb":
    "VB" : "verb, generic (eat)"
    "VBD" : "past-tense verb (ate)"
    "VBN" : "past-participle verb (eaten)"
    "VBP" : "infinitive verb (eat)"
    "VBZ" : "present-tense verb (eats, swims)"
    "CP" : "copula (is, was, were)"
    "VBG" : "gerund verb (eating,winning)"
  "adjective":
    "JJ" : "adjective, generic (big, nice)"
    "JJR" : "comparative adjective (bigger, cooler)"
    "JJS" : "superlative adjective (biggest, fattest)"
  "adverb":
    "RB" : "adverb (quickly, softly)"
    "RBR" : "comparative adverb (faster, cooler)"
    "RBS" : "superlative adverb (fastest (driving), coolest (looking))"
  "noun":
    "NN" : "noun, singular (dog, rain)"
    "NNP" : "singular proper noun (Edinburgh, skateboard)"
    "NNPS" : "plural proper noun (Smiths)"
    "NNS" : "plural noun (dogs, foxes)"
    "NNO" : "possessive noun (spencer's, sam's)"
    "NG" : "gerund noun (eating,winning" : "but used grammatically as a noun)"
    "PRP" : "personal pronoun (I,you,she)"
  "glue":
    "PP" : "possessive pronoun (my,one's)"
    "FW" : "foreign word (mon dieu, voila)"
    "IN" : "preposition (of,in,by)"
    "MD" : "modal verb (can,should)"
    "CC" : "co-ordating conjunction (and,but,or)"
    "DT" : "determiner (the,some)"
    "UH" : "interjection (oh, oops)"
    "EX" : "existential there (there)"
  "value":
    "CD" : "cardinal value, generic (one, two, june 5th)"
    "DA" : "date (june 5th, 1998)"
    "NU" : "number (89, half-million)"
```

####Lexicon
Because the library can conjugate all sorts of forms, it only needs to store one grammatical form.
The lexicon was built using the [American National Corpus](http://www.americannationalcorpus.org/), then intersected with the regex rule-list. For example, it lists only 300 verbs, then blasts-out their 1200+ derived forms.

####Contractions
Unlike other nlp toolkits, this library puts a 'silent token' into the phrase for contractions. Otherwise something would be neglected.
```javascript
nlp.pos("i'm good.")
   [{
   	text:"i'm",
   	normalised:"i",
   	pos:"PRP"
   },
   {
   	text:"",
   	normalised:"am",
   	pos:"CP"
   },
   {
   	text:"good.",
   	normalised:"good",
   	pos:"JJ"
   }]
```
####Tokenization
neighbouring words with the same part of speech are merged together, unless there is punctuation, different capitalisation, or special cases.
```javascript
nlp.pos("tony hawk won")
//tony hawk   NN
//won   VB
```
To turn this off:
```javascript
nlp.pos("tony hawk won", {dont_combine:true})
//tony   NN
//hawk   NN
//won   VB
```



## Licence
[go-fer-it.](http://www.wtfpl.net/txt/copying/)
