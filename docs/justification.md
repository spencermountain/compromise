nlp_compromise is not the most accurate, or most clever nlp toolkit.

##Justification
If the 80-20 rule applies for most things, the ''94-6 rule'' applies when working with language - by [Zipfs law](http://www.businessinsider.com/zipfs-law-and-the-most-common-words-in-english-2013-10):
>The **[top 10 words](http://www.businessinsider.com/zipfs-law-and-the-most-common-words-in-english-2013-10)** account for 25% of used language.

>The **top 100 words** account for 50% of used language.

>The **top 50,000 words** account for 95% of used language.

On the [Penn treebank](http://www.cis.upenn.edu/~treebank/), for example, this is possible:

* just a 1 thousand word lexicon: **45% accuracy**
* ... then falling back to nouns: **70% accuracy**
* ... then some suffix regexes: **74% accuracy**
* ... then some sentence-level postprocessing: **81% accuracy**

The process is to get some curated data, find the patterns, and list the exceptions. Bada bing, bada boom.
In this way a satisfactory NLP library can be built with breathtaking lightness.

Namely, it can be run right on the user's computer instead of a server.

####Lexicon
Because the library can conjugate all sorts of forms, it only needs to store one grammatical form.
The lexicon was built using the [American National Corpus](http://www.americannationalcorpus.org/), then intersected with the regex rule-list. For example, it lists only 300 verbs, then blasts-out their 1200+ derived forms.

####Contractions
It puts a 'silent token' into the phrase for contractions. Otherwise a meaningful part-of-speech could be neglected.
```javascript
nlp.pos("i'm good.")
 [{
   text:"i'm",
   implicit:"i",
   pos:{"PRP":true}
 },
 {
   text:"",
   implicit:"am",
   pos:{"CP":true}
 },
 {
   text:"good.",
   implicit:"",
   pos:{"JJ":true}
 }]
```
####Tokenization
Neighbouring words with the same part of speech are merged together, unless there is punctuation, different capitalisation, or some special cases.
```javascript
nlp.pos("tony hawk won").tags()
//tony hawk   NN
//won   VB
```
<!-- To turn this off:
```javascript
nlp.pos("tony hawk won", {dont_combine:true}).tags()
//tony   NN
//hawk   NN
//won   VB
```-->


##Normalisation
nlp_compromise has three levels of text normalisation:
### Text
ensures sane whitespace:
* `nlp.person('Dr. John H. Smith').text()` -> 'Dr. John H. Smith'
* `nlp.text('He ate the eggs.').normal()` -> 'He ate the eggs.'
### Normal
removes punctuation, capitalisation, hyphens. Still valid & readable:
* `nlp.person('Dr. John H. Smith').normal` -> 'dr john h smith'
* `nlp.text('He ate the eggs.').normal()` -> 'he ate the eggs'
### Root
Like lemmatisation, it inflects/conjugates/truncates and gorks the sentence into being more robot-understandable:
* `nlp.person('Dr. John H. Smith').root()` -> 'john smith'
* `nlp.text('He ate the eggs.').root()` -> 'he eat the egg'

####Phrasal Verbs
'beef up' is one verb, and not two terms. (ie. It's not a direction of beefing.) But many false-positives are avoided - *sleep in* is combined, but *sleep out* is not. *Brighten up* is combined, but *brighten down* is not.


##Timing
Nlp_compromise parses most sentences in half a millisecond. This sounds fast, but is still a relevant amount of time. A novel may take 20 seconds at that speed.
[Here's a plot](https://docs.google.com/spreadsheets/d/1O-U2NqIXH-3XgxZthlpVwndxN4ZkXcm59NUr6vqpQXc/edit#gid=0) of how it handles different sized texts on a macbook. The important note is that it's linear, or O(n) with respect to input.
