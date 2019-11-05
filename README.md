<div align="center">
  <div>compromise</div>
  <img src="https://user-images.githubusercontent.com/399657/68222691-6597f180-ffb9-11e9-8a32-a7f38aa8bded.png"/>
  <div>modest natural language processing</div>

  <sub>
    by
    <a href="https://github.com/spencermountain">Spencer Kelly</a> and
    <a href="https://github.com/spencermountain/compromise/graphs/contributors">
      many contributors
    </a>
  </sub>

  <div>
    <a href="https://npmjs.org/package/compromise">
    <img src="https://img.shields.io/npm/v/compromise.svg?style=flat-square" />
  </a>
  <a href="https://www.codacy.com/app/spencerkelly86/nlp_compromise">
    <img src="https://api.codacy.com/project/badge/Coverage/82cc8ebd98b64ed199d7be6021488062" />
  </a>
  <a href="https://unpkg.com/compromise">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/builds/compromise.min.js" />
  </a>
  </div>
</div>

<!-- spacer -->
<img src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### .match():
```js
let doc = nlp(entireNovel)
doc.if('the #Adjective of times').text()
// "it was the blurst of times??"
```
```js
if(doc.has('^simon says #Verb+')){
  doThis(doc.match('#Verb+ .*').text())
}else{
  doThis('')
}
```
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221837-0d142480-ffb8-11e9-9d30-90669f1b897c.png"/>
</div>

### .verbs():
```js
let doc = nlp().verbs().toPastTense()
doc.text()
// ''
```
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221824-09809d80-ffb8-11e9-9ef0-6ed3574b0ce8.png"/>
</div>

### .nouns():
```js
let doc = nlp().nouns().toPlural()
doc.text()
// ''
```
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221731-e8b84800-ffb7-11e9-8453-6395e0e903fa.png"/>
</div>


### .numbers():
```js
nlp.extend(require('compromise-numbers'))

let doc = nlp().numbers().add(2)
doc.text()
// ''
```
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221814-05ed1680-ffb8-11e9-8b6b-c7528d163871.png"/>
</div>

### .topics():
```js
nlp.extend(require('compromise-entities'))

nlp(buddyHolly).people().if('#MiddleName').json()
// [{text:'Marry Tyler Moore'}]

nlp(freshPrince).places().first().text()
// 'West Phillidelphia'
```
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221814-05ed1680-ffb8-11e9-8b6b-c7528d163871.png"/>
</div>
