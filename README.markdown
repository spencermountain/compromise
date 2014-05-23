**nlp_compromise** is a quick and light Natural-Language-Processing library in javascript that is small enough to be used in the browser, and quick enough and run on keypress.

It uniquely trades the 'last 15%' accuracy for speed, slightness, and ease-of-use. No training, no configuring, no prolog. You can roll it into anything, without thinking, and get competitive results.

it's a single javascript file that's smaller than jQuery, with results in the mid-80% range. You win.

[demo](https://rawgit.com/spencermountain/nlp_compromise/master/client_side/index.html)

this library is under active and reckless development, May 2014.

#Justification
If the 80-20 rule normally applies, a '96-4' rule applies working with language - by [Zipfs law](http://www.businessinsider.com/zipfs-law-and-the-most-common-words-in-english-2013-10):
>The [top 10 words](http://www.businessinsider.com/zipfs-law-and-the-most-common-words-in-english-2013-10) account for 25% of our language.

>The top 100 words account for 50% of our language.

>The top 50,000 words account for 95% of our language.

A satisfactory NLP library can be built with breathtaking lightness. On the [Penn treebank](http://www.cis.upenn.edu/~treebank/), for example, the following is possible:

* a 1 thousand word lexicon: **45% accuracy**
* ... and falling back to nouns: **70% accuracy**
* ... and some suffix regexes: **74% accuracy**
* ... and some basic sentence-level postprocessing: **81% accuracy**

The process has been to get the curated data, find the patterns, list the exceptions. No frameworks, no dependencies, no big O. bada-bing, bada-BOOM. Package this stuff into a javascript file, and it's tinier than jquery.

#Usage
## Server-side
```bash
npm install nlp_compromise
```
```javascript
nlp = require("nlp_comprimise")
nlp.syllables("hamburger")
//[ 'ham', 'bur', 'ger' ]
```

## Client-side
```javascript
<script src="https://rawgit.com/spencermountain/nlp_comprimise/master/client_side/nlp.js"></script>
<script>
  nlp.noun("dinosaur").pluralize()
  //dinosaurs
</script>
```



# API

## Sentence segmentation
1.7k
```javascript
nlp.sentences("Hi Dr. Joe et al. the price is 4.59 for the N.A.S.A. Ph.Ds and astronauts.").length
//1
```
##Word tokenization
```javascript
nlp.tokenize("she sells sea-shells").length
//3
```

## Part-of-speech
80% on the [Penn treebank](http://www.cis.upenn.edu/~treebank/)
```javascript
nlp.pos("Tony walked quickly to the store.")
// ["NN","VBD","RB","TO","DT","NN"]

nlp.pos("the obviously good swim")
//["DT", "RB", "JJ", "NN"]
```
### Details
#### Tags
the [industry-standard parts-of-speech](https://github.com/spencermountain/nlp_comprimise/blob/master/lib/pos/data/parts_of_speech.js)
```javascript
  "verb": [
    "VB  - verb, generic (eat)",
    "VBD  - past-tense verb (ate)",
    "VBN  - past-participle verb (eaten)",
    "VBP  - infinitive verb (eat)",
    "VBZ  - present-tense verb (eats, swims)",
    "CP  - copula (is, was, were)",
    "VBG  - gerund verb (eating,winning)"
  ],
  "adjective": [
    "JJ  - adjective, generic (big, nice)",
    "JJR  - comparative adjective (bigger, cooler)",
    "JJS  - superlative adjective (biggest, fattest)"
  ],
  "adverb": [
    "RB  - adverb (quickly, softly)",
    "RBR  - comparative adverb (faster, cooler)",
    "RBS  - superlative adverb (fastest (driving), coolest (looking))"
  ],
  "noun": [
    "NN  - noun, singular (dog, rain)",
    "NNP  - singular proper noun (Edinburgh, skateboard)",
    "NNPS  - plural proper noun (Smiths)",
    "NNS  - plural noun (dogs, foxes)",
    "NNO  - possessive noun (spencer's, sam's)",
    "NG  - gerund noun (eating,winning - but used grammatically as a noun)",
    "PRP  - personal pronoun (I,you,she)"
  ],
  "glue": [
    "PP  - possessive pronoun (my,one's)",
    "FW  - foreign word (mon dieu, voila)",
    "IN  - preposition (of,in,by)",
    "MD  - modal verb (can,should)",
    "CC  - co-ordating conjunction (and,but,or)",
    "DT  - determiner (the,some)",
    "UH  - interjection (oh, oops)",
    "EX  - existential there (there)"
  ],
  "value": [
    "CD  - cardinal value, generic (one, two, june 5th)",
    "DA  - date (june 5th, 1998)",
    "NU  - number (89, half-million)"
  ]
```

####Lexicon
The conjugate methods are quick and accurate enough that we can actually begin with a very small lexicon, and build it out.

For example, it lists the 300 top verbs, then blasts-out all of their 1200+ derived forms.

####Contractions
when it's grammatically necessary, the parser puts a 'silent token' into the phrase. Otherwise it would get misrepresented.
```javascript
nlp.pos("i'm good.")
// [{
// 	text:"i'm",
// 	normalised:"i",
// 	pos:"PRP"
// },
// {
// 	text:"",
// 	normalised:"am",
// 	pos:"CP"
// },
// {
// 	text:"good.",
// 	normalised:"good",
// 	pos:"JJ"
// }]
```
####Tokenization
in post-processing, neighbours with the same part of speech are merged together (It skips this if there is punctuation involved). To turn this off, set options= {dont_combine:true}
```javascript
nlp.pos("tony hawk won")
//tony hawk   NN
//won   VB
nlp.pos("tony hawk won", {dont_combine:true})
//tony   NN
//hawk   NN
//won   VB
```
<!-- ### Named-Entity Recognizing
```javascript
nlp.spot("Tony Hawk said he was very happy")
// ["Tony Hawk"]
```
-->

## Syllable hyphenization
70% on the [moby hyphenization corpus](http://www.gutenberg.org/dirs/etext02/mhyph10.zip)  0.5k
```javascript
nlp.syllables("hamburger")
//[ 'ham', 'bur', 'ger' ]
```

##Conjugation

### Inflection
```javascript
nlp.noun("earthquakes").singularize()
//earthquake
nlp.noun("earthquake").pluralize()
//earthquakes
```

### Adjective conjugation
```javascript
nlp.adjective("quick").conjugate()
//{ comparative: 'quicker',
//  superlative: 'quickest',
//  adverb: 'quickly',
//  noun: 'quickness' }
```
### Verb conjugation
```javascript
nlp.verb("walked").conjugate()
//{ infinitive: 'walk',
//  present: 'walks',
//  past: 'walked',
//  gerund: 'walking' }
```
### Adverb to adjective
```javascript
nlp.adverb("quickly").conjugate()
// { adjective: 'quick' }
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
nlp.ngram("She sells seashells by the seashore. The shells she sells are surely seashells.", {min_count:1, max_size:5})
// [{ word: 'she sells', count: 2, size: 2 }, ...
options.min_count // throws away seldom-repeated grams. defaults to 1
options.max_gram // prevents the result from becoming gigantic. defaults to 5
```

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
```
### Unicode Normalisation
a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
```javascript
nlp.normalise("Björk")
//Bjork

nlp.denormalise("The quick brown fox jumps over the lazy dog", {percentage:50})
// The ɋӈїck brown fox juӎÞs over tӊe laζy dog
```



## Licence
[go-fer-it.](http://www.wtfpl.net/txt/copying/)
