<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>nlp performance plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div> 

  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-speed">
    <img src="https://img.shields.io/npm/v/compromise-speed.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-speed/builds/compromise-speed.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/plugin-speed/builds/compromise-speed.min.js" />
  </a>

  <div align="center">
    <code>npm install compromise-speed</code>
  </div>
</div>

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### StreamFile
parse and process a file from your filesystem, without loading it all into memory
```js
import {streamFile} from 'compromise-speed'
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
if you are running compromise on every keystroke, it is not necessary to re-parse all sentences, every time.
This plugin will cache any already-parsed sentences, and combine them in-memory, with any changed ones.

it will also un-cache any temporary sentences, to clear-up memory.
```js
import {keyPress} from 'compromise-speed'
nlp.extend(keyPress)

let doc = nlp.keyPress('parsed once. it was the blurst of')
doc = nlp.keyPress('parsed once. it was the blurst of times')
```

or in the browser:
```html
<textarea>Chocolate microscopes? Double guitars?</textarea>
<script src="https://unpkg.com/compromise"></script>
<script src="https://unpkg.com/compromise-speed"></script>
<script defer>
  nlp.plugin(compromiseSpeed.keyPress)
  document.querySelector('textarea').onkeypress = (e) => {
    let doc = nlp.keyPress(e.target.value)
  }
</script>
```

<!-- ### StreamFetch 

 ### WorkerPool -->

MIT