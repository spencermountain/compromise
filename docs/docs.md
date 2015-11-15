
## Add new words to the Lexicon
```javascript
nlp.Text("hakuna matada").tags() //["Noun"]
nlp.Lexicon["hakuna matada"]="Expression"
nlp.Text("hakuna matada").tags() //["Expression"]
```

## Plugins
```javascript
let nlp = require('nlp_compromise')
nlp.models.Term.capitalise=function(){
  return this.text.toUpperCase()
}
```


####Lexicon
Because the library can conjugate all sorts of forms, it only needs to store one grammatical form.
The lexicon was built using the [American National Corpus](http://www.americannationalcorpus.org/), then intersected with the regex rule-list. For example, it lists only 300 verbs, then blasts-out their 1200+ derived forms.

####Contractions
It puts a 'silent token' into the phrase for contractions. Otherwise a meaningful part-of-speech could be neglected.
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
Neighbouring words with the same part of speech are merged together, unless there is punctuation, different capitalisation, or some special cases.
```javascript
nlp.pos("tony hawk won").tags()
//tony hawk   NN
//won   VB
```
####Phrasal Verbs
'beef up' is one verb, and not some direction of beefing.