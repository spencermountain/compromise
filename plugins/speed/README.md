<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>nlp performance plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div> 

  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-plugin-speed">
    <img src="https://img.shields.io/npm/v/compromise-plugin-speed.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-plugin-speed/builds/compromise-plugin-speed.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/plugin-speed/builds/compromise-plugin-speed.min.js" />
  </a>

  <div align="center">
    <code>npm install compromise-plugin-speed</code>
  </div>
</div>

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### StreamFile
parse and process a file from your filesystem, without loading it all into memory
```js
import {streamFile} from 'compromise-plugin-speed'
nlp.extend(streamFile)

nlp.streamFile('./path/to/file.txt', (s)=>{
  // map fn on each sentence
  return s.if('the #Adjective of times')
}).then(doc=>{
  // just the returned matches
  doc.debug()
})

```


### Keypress
cache any already-parsed sentences, and combine them in-memory
```js
import {keyPress} from 'compromise-plugin-speed'
nlp.extend(keyPress)

let doc = nlp.keyPress('parsed once. it was the blurst of')
doc = nlp.keyPress('parsed once. it was the blurst of times')
```

<!-- ### StreamFetch 

 ### WorkerPool -->

MIT